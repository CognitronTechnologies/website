import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="bg-page min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-4xl mx-auto py-16 px-4 flex flex-col gap-12">
        <section className="mb-8 text-center">
          <h1 className="text-5xl font-bold text-blue-400 mb-2">Welcome to Cognitron</h1>
          <p className="text-lg text-white/80">
            Innovative software solutions, AI, and cloud for your business.
          </p>
        </section>
        <section className="grid md:grid-cols-2 gap-8">
          <div className="bg-navy-dark rounded-lg shadow-md p-6 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl text-white font-semibold mb-2">Our Services</h2>
              <p className="text-white/80 mb-4">See what we offer – from software development to cloud and AI.</p>
            </div>
            <Link href="/services" className="bg-blue-500 text-white px-4 py-2 rounded font-bold hover:bg-blue-400 w-max">Learn More</Link>
          </div>
          <div className="bg-navy-dark rounded-lg shadow-md p-6 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl text-white font-semibold mb-2">Portfolio</h2>
              <p className="text-white/80 mb-4">Check out projects we've delivered for our clients.</p>
            </div>
            <Link href="/portfolio" className="bg-blue-500 text-white px-4 py-2 rounded font-bold hover:bg-blue-400 w-max">View Portfolio</Link>
          </div>
          <div className="bg-navy-dark rounded-lg shadow-md p-6 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl text-white font-semibold mb-2">About Us</h2>
              <p className="text-white/80 mb-4">Learn more about our mission, values, and team.</p>
            </div>
            <Link href="/about" className="bg-blue-500 text-white px-4 py-2 rounded font-bold hover:bg-blue-400 w-max">About Cognitron</Link>
          </div>
          <div className="bg-navy-dark rounded-lg shadow-md p-6 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl text-white font-semibold mb-2">Contact</h2>
              <p className="text-white/80 mb-4">Ready to start? Reach out to our team today.</p>
            </div>
            <Link href="/contact" className="bg-blue-500 text-white px-4 py-2 rounded font-bold hover:bg-blue-400 w-max">Contact Us</Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}