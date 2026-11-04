import { createHash, createHmac, timingSafeEqual } from 'node:crypto';
import { services, industries } from '../content.mjs';

const windowMs = 15 * 60 * 1000;
const attempts = new Map();
const serviceNames = new Map(services.map((service) => [service.slug, service.name]));
serviceNames.set('several', 'Several services');
serviceNames.set('', 'Not sure yet');
const industryNames = new Map(industries.map((industry) => [industry.slug, industry.name]));
for (const [slug, name] of [['', 'Not specified'], ['other', 'Other'], ['professional-services', 'Professional & Business Services'], ['hospitality', 'Hospitality & Travel'], ['field-services', 'Field Services'], ['membership', 'Member Organisations']]) industryNames.set(slug, name);

function reply(response, status, data, headers = {}) {
  response.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff', ...headers });
  response.end(JSON.stringify(data));
}

function allowedOrigins(env) {
  const origins = new Set();
  for (const address of [env.SITE_URL, env.VERCEL_URL && `https://${env.VERCEL_URL}`, env.VERCEL_PROJECT_PRODUCTION_URL && `https://${env.VERCEL_PROJECT_PRODUCTION_URL}`]) {
    if (address) origins.add(new URL(address).origin);
  }
  return origins;
}

function tokenFor(origin, expires, key) {
  return `${expires}.${createHmac('sha256', key).update(`${origin}:${expires}`).digest('hex')}`;
}

function validToken(token, origin, key, now) {
  if (typeof token !== 'string' || !/^\d{13}\.[a-f0-9]{64}$/.test(token)) return false;
  const expires = Number(token.split('.')[0]);
  if (expires <= now || expires > now + windowMs) return false;
  const expected = tokenFor(origin, expires, key);
  return timingSafeEqual(Buffer.from(token), Buffer.from(expected));
}

async function readBody(request) {
  if (request.body !== undefined) {
    const body = typeof request.body === 'string' ? request.body : JSON.stringify(request.body);
    if (Buffer.byteLength(body) > 16000) throw new RangeError('Body too large');
    return JSON.parse(body);
  }
  const chunks = [];
  let length = 0;
  for await (const chunk of request) {
    length += Buffer.byteLength(chunk);
    if (length > 16000) throw new RangeError('Body too large');
    chunks.push(Buffer.from(chunk));
  }
  return JSON.parse(Buffer.concat(chunks).toString('utf8'));
}

export function createContactHandler({ env = process.env, fetchImpl = fetch, now = Date.now, rateStore = attempts } = {}) {
  return async function contact(request, response) {
    const enabled = Boolean(env.RESEND_API_KEY && env.RESEND_FROM_EMAIL && env.CONTACT_NOTIFICATION_EMAIL);
    const origin = request.headers.origin;
    const host = request.headers.host || '';
    const isLocal = !env.VERCEL && /^(127\.0\.0\.1|localhost)(:\d+)?$/.test(host);
    let origins;
    try {
      origins = allowedOrigins(env);
    } catch (error) {
      console.error('Contact configuration has an invalid site URL.');
      return reply(response, 503, { error: 'Enquiry delivery is not configured correctly. Please use email.' });
    }
    if (isLocal) origins.add(`http://${host}`);
    const configOrigin = origin || (isLocal ? `http://${host}` : `https://${host}`);
    if (request.method === 'GET') {
      if (!enabled) return reply(response, 200, { enabled: false });
      if (!origins.has(configOrigin)) return reply(response, 403, { error: 'This site address is not enabled for enquiries.' });
      return reply(response, 200, { enabled: true, token: tokenFor(configOrigin, now() + windowMs, env.RESEND_API_KEY) });
    }
    if (request.method !== 'POST') return reply(response, 405, { error: 'Method not allowed.' }, { Allow: 'GET, POST' });
    if (!origin || !origins.has(origin)) return reply(response, 403, { error: 'Please submit the enquiry from this website.' });
    if (!enabled) return reply(response, 503, { error: 'Sending is unavailable. Please contact us by email.' });
    if (!/^application\/json(?:;|$)/i.test(request.headers['content-type'] || '')) return reply(response, 415, { error: 'Please send a JSON enquiry.' });

    const ip = isLocal ? request.socket?.remoteAddress || 'local' : String(request.headers['x-forwarded-for'] || 'unknown').split(',')[0].trim();
    const bucket = createHash('sha256').update(ip).digest('hex');
    const time = now();
    for (const [key, record] of rateStore) if (time - record.start >= windowMs) rateStore.delete(key);
    if (!rateStore.has(bucket) && rateStore.size >= 1000) return reply(response, 429, { error: 'Enquiries are busy right now. Please try email instead.' }, { 'Retry-After': '900' });
    const record = rateStore.get(bucket) || { start: time, count: 0 };
    if (record.count >= 5) return reply(response, 429, { error: 'Too many attempts. Please wait 15 minutes or use email.' }, { 'Retry-After': '900' });
    record.count += 1;
    rateStore.set(bucket, record);

    let data;
    try {
      data = await readBody(request);
    } catch (error) {
      if (error instanceof RangeError) return reply(response, 413, { error: 'The enquiry is too large. Please shorten the message.' });
      if (error instanceof SyntaxError) return reply(response, 400, { error: 'The enquiry could not be read. Please try again.' });
      console.error('Unable to read contact request:', error.code || error.name);
      return reply(response, 400, { error: 'The enquiry could not be read. Please try again.' });
    }
    if (!data || typeof data !== 'object' || Array.isArray(data)) return reply(response, 400, { error: 'Please provide the enquiry fields.' });
    if (!validToken(data.token, origin, env.RESEND_API_KEY, time)) return reply(response, 403, { error: 'This form session has expired. Refresh the page before trying again, or contact us by email.' });
    for (const field of ['name', 'email', 'organisation', 'interest', 'industry', 'challenge', 'website', 'requestId']) {
      if (typeof data[field] !== 'string') return reply(response, 400, { error: 'Please complete the enquiry fields.' });
    }
    const name = data.name.trim();
    const email = data.email.trim();
    const organisation = data.organisation.trim();
    const challenge = data.challenge.trim();
    if (data.website) return reply(response, 400, { error: 'The enquiry could not be accepted. Please contact us by email.' });
    if (!name || name.length > 100 || /[\r\n]/.test(name) || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || organisation.length > 160 || challenge.length < 10 || challenge.length > 3000 || !serviceNames.has(data.interest) || !industryNames.has(data.industry) || !/^[a-f0-9-]{36}$/i.test(data.requestId)) {
      return reply(response, 400, { error: 'Check your name, email, service selection, and project outline (10–3,000 characters).' });
    }
    const text = `Name: ${name}\nEmail: ${email}\nOrganisation: ${organisation || 'Not specified'}\nService: ${serviceNames.get(data.interest)}\nIndustry: ${industryNames.get(data.industry)}\n\n${challenge}`;
    const digest = createHash('sha256').update(text).digest('hex');
    try {
      const result = await fetchImpl('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json', 'Idempotency-Key': `${data.requestId}-${digest}` },
        body: JSON.stringify({ from: env.RESEND_FROM_EMAIL, to: [env.CONTACT_NOTIFICATION_EMAIL], reply_to: email, subject: `Cognitron enquiry: ${serviceNames.get(data.interest)}`, text }),
        signal: AbortSignal.timeout(10000),
      });
      if (!result.ok) {
        console.error('Resend rejected an enquiry:', result.status);
        return reply(response, 502, { error: 'The email service did not accept the enquiry. Your details are still here; try again or contact us by email.' });
      }
      const receipt = await result.json();
      if (typeof receipt.id !== 'string' || !receipt.id) {
        console.error('Resend returned no enquiry receipt.');
        return reply(response, 502, { error: 'We could not confirm acceptance. Contact us by email or retry with the same details.' });
      }
      return reply(response, 200, { accepted: true, reference: receipt.id });
    } catch (error) {
      console.error('Contact delivery failed:', error.name || 'Unknown error');
      return reply(response, 502, { error: 'We could not confirm acceptance by the email service. Your details are still here; contact us by email or try again.' });
    }
  };
}

export default createContactHandler();
