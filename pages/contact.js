import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="bg-page min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-xl mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold mb-6 text-blue-400">Contact Us</h1>
        {submitted ? (
          <div className="bg-green-700 text-white p-6 rounded-lg shadow text-center">
            Thank you! We'll be in touch soon.
          </div>
        ) : (
          <form className="space-y-5 text-white" onSubmit={handleSubmit}>
            <div>
              <label className="block mb-1 font-medium">Name</label>
              <input type="text" required className="w-full px-3 py-2 rounded bg-navy-dark border border-blue-500 focus:outline-none" />
            </div>
            <div>
              <label className="block mb-1 font-medium">Email</label>
              <input type="email" required className="w-full px-3 py-2 rounded bg-navy-dark border border-blue-500 focus:outline-none" />
            </div>
            <div>
              <label className="block mb-1 font-medium">Message</label>
              <textarea required rows={5} className="w-full px-3 py-2 rounded bg-navy-dark border border-blue-500 focus:outline-none" />
            </div>
            <button type="submit" className="bg-blue-500 text-white rounded px-6 py-2 font-bold hover:bg-blue-400 transition">Send</button>
          </form>
        )}
      </main>
      <Footer />
    </div>
  )
}