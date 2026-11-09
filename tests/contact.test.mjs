import test from 'node:test';
import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { createSiteServer } from '../preview.mjs';
import { createContactHandler } from '../api/contact.mjs';

const env = { RESEND_API_KEY: 'test-key-not-real', RESEND_FROM_EMAIL: 'Website <test@example.test>', CONTACT_NOTIFICATION_EMAIL: 'inbox@example.test' };
const payload = () => ({ name: 'Test Person', email: 'person@example.test', organisation: 'Test organisation', interest: 'cloud-infrastructure', industry: 'insurance', challenge: 'A synthetic test enquiry for cloud migration.', website: '', requestId: randomUUID() });

async function withContact(options, run) {
  const server = createSiteServer({ contactHandler: createContactHandler({ env, rateStore: new Map(), ...options }) });
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const base = `http://127.0.0.1:${server.address().port}`;
  const config = await (await fetch(base + '/api/contact')).json();
  const post = (data, origin = base) => fetch(base + '/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json', Origin: origin }, body: JSON.stringify({ token: config.token, ...data }) });
  try { await run({ base, post, config }); }
  finally { await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve())); }
}

test('unconfigured delivery is disabled explicitly; no outbound request', async () => {
  await withContact({ env: {}, fetchImpl: () => { throw new Error('Must not call provider'); } }, async ({ config, post }) => {
    assert.equal(config.enabled, false);
    assert.equal((await post(payload())).status, 503);
  });
});

test('only provider acceptance with a receipt produces success; plain text and reply-to are correct', async () => {
  const calls = [];
  await withContact({ fetchImpl: async (url, options) => { calls.push({ url, options }); return Response.json({ id: 'test-receipt' }); } }, async ({ post }) => {
    const response = await post(payload());
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), { accepted: true, reference: 'test-receipt' });
    const email = JSON.parse(calls[0].options.body);
    assert.equal(email.reply_to, 'person@example.test');
    assert.match(email.text, /Cloud & Infrastructure/);
    assert.match(email.text, /Insurance/);
    assert.equal(email.html, undefined);
    assert.ok(calls[0].options.headers['Idempotency-Key']);
  });
});

test('provider rejection, malformed receipt, and timeout do not return success', async () => {
  for (const fetchImpl of [async () => Response.json({ error: 'no' }, { status: 422 }), async () => Response.json({}), async () => { throw new DOMException('Timed out', 'TimeoutError'); }]) {
    await withContact({ fetchImpl }, async ({ post }) => {
      const response = await post(payload());
      assert.equal(response.status, 502);
      const result = await response.json();
      assert.equal(result.accepted, undefined);
      assert.ok(result.error);
    });
  }
});

test('provider rejection logs status and error code without message contents', async (t) => {
  const logs = [];
  t.mock.method(console, 'error', (...args) => logs.push(args));
  await withContact({ fetchImpl: async () => Response.json({ name: 'validation_error', message: 'Private provider detail' }, { status: 422 }) }, async ({ post }) => {
    const response = await post(payload());
    assert.equal(response.status, 502);
    assert.deepEqual(logs, [['Resend rejected an enquiry:', 422, 'validation_error']]);
    assert.doesNotMatch(JSON.stringify(await response.json()), /Private provider detail/);
  });
});

test('invalid input, cross-origin requests, forged tokens, oversized bodies, and bots are rejected', async () => {
  await withContact({ fetchImpl: () => { throw new Error('Must not call provider'); } }, async ({ post, base }) => {
    assert.equal((await post(payload(), 'https://unrelated.example')).status, 403);
    assert.equal((await post({ ...payload(), token: 'forged' })).status, 403);
    assert.equal((await post({ ...payload(), email: 'invalid' })).status, 400);
    assert.equal((await post({ ...payload(), interest: 'unknown' })).status, 400);
    assert.equal((await post({ ...payload(), website: 'bot.example' })).status, 400);
    const response = await fetch(base + '/api/contact', { method: 'POST', headers: { Origin: base, 'Content-Type': 'application/json' }, body: 'x'.repeat(16001) });
    assert.equal(response.status, 413);
  });
});

test('repeat attempts are limited and expired sessions are rejected', async () => {
  let time = Date.now();
  await withContact({ now: () => time, fetchImpl: async () => Response.json({ id: 'receipt' }) }, async ({ post }) => {
    for (let index = 0; index < 5; index++) assert.equal((await post(payload())).status, 200);
    assert.equal((await post(payload())).status, 429);
    time += 16 * 60 * 1000;
    assert.equal((await post(payload())).status, 403);
  });
});

test('same snapshot and request ID produce the same provider idempotency key', async () => {
  const keys = [];
  await withContact({ fetchImpl: async (_, options) => { keys.push(options.headers['Idempotency-Key']); return Response.json({ id: 'receipt' }); } }, async ({ post }) => {
    const data = payload();
    await post(data);
    await post(data);
    assert.equal(keys[0], keys[1]);
    await post({ ...data, challenge: 'A different synthetic request.' });
    assert.notEqual(keys[0], keys[2]);
  });
});
