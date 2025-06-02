import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function About() {
  return (
    <div className="bg-page min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-3xl mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold mb-6 text-blue-400">About Cognitron</h1>
        <p className="text-white/90 mb-4">
          Cognitron is a technology agency committed to delivering cutting-edge software solutions for businesses of all sizes. 
          Our team is passionate about innovation, quality, and helping clients achieve their digital goals.
        </p>
        <p className="text-white/70">
          Founded by technology enthusiasts, Cognitron blends deep technical expertise with creative thinking to solve your toughest challenges. 
          We believe in transparent communication, agile processes, and long-term partnerships.
        </p>
      </main>
      <Footer />
    </div>
  )
}