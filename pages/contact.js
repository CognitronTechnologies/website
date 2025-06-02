import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { EnvelopeIcon, UserIcon, ChatBubbleLeftRightIcon, TagIcon, UsersIcon, BriefcaseIcon, LifebuoyIcon, DocumentTextIcon } from '@heroicons/react/24/outline'

const contactReasons = [
  { value: '', label: 'Select a reason' },
  { value: 'enquiry', label: 'General Enquiry' },
  { value: 'quote', label: 'Request a Quote/Proposal' },
  { value: 'partnership', label: 'Partnership/Collaboration' },
  { value: 'job', label: 'Careers/Jobs' },
  { value: 'support', label: 'Support/Technical Issue' },
]

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [reason, setReason] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="bg-page min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-xl mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold mb-6 text-blue-400 text-center">Contact Us</h1>
        <p className="text-white/70 text-center mb-8">
          Have a project in mind or want to learn more? Fill out the form below and our team will get back to you soon.
        </p>
        {submitted ? (
          <div className="bg-green-700 text-white p-6 rounded-lg shadow text-center text-lg font-semibold">
            Thank you for reaching out!<br />We'll be in touch soon.
          </div>
        ) : (
          <form
            className="space-y-6 bg-navy-dark p-8 rounded-2xl shadow-xl border border-blue-900 backdrop-blur-sm"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col gap-1">
              <label className="text-blue-300 font-medium flex items-center gap-2" htmlFor="name">
                <UserIcon className="w-5 h-5" /> Name
              </label>
              <input
                id="name"
                type="text"
                required
                placeholder="Your name"
                className="w-full px-4 py-2 rounded-lg bg-navy border border-blue-500 text-white focus:ring-2 focus:ring-blue-400 outline-none transition"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-blue-300 font-medium flex items-center gap-2" htmlFor="email">
                <EnvelopeIcon className="w-5 h-5" /> Email
              </label>
              <input
                id="email"
                type="email"
                required
                placeholder="your@email.com"
                className="w-full px-4 py-2 rounded-lg bg-navy border border-blue-500 text-white focus:ring-2 focus:ring-blue-400 outline-none transition"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-blue-300 font-medium flex items-center gap-2" htmlFor="subject">
                <TagIcon className="w-5 h-5" /> Subject
              </label>
              <input
                id="subject"
                type="text"
                required
                placeholder="Subject"
                className="w-full px-4 py-2 rounded-lg bg-navy border border-blue-500 text-white focus:ring-2 focus:ring-blue-400 outline-none transition"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-blue-300 font-medium flex items-center gap-2" htmlFor="reason">
                <DocumentTextIcon className="w-5 h-5" /> Why are you contacting us?
              </label>
              <select
                id="reason"
                required
                value={reason}
                onChange={e => setReason(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-navy border border-blue-500 text-white focus:ring-2 focus:ring-blue-400 outline-none transition"
              >
                {contactReasons.map(({ value, label }) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-blue-300 font-medium flex items-center gap-2" htmlFor="message">
                <ChatBubbleLeftRightIcon className="w-5 h-5" /> Message
              </label>
              <textarea
                id="message"
                required
                rows={5}
                placeholder="How can we help you?"
                className="w-full px-4 py-2 rounded-lg bg-navy border border-blue-500 text-white focus:ring-2 focus:ring-blue-400 outline-none transition"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg py-3 font-bold hover:from-blue-400 hover:to-purple-400 transition text-lg shadow-lg"
            >
              Send Message
            </button>
          </form>
        )}
      </main>
      <Footer />
    </div>
  )
}