import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function Services() {
  return (
    <div className="bg-page min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-3xl mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold mb-6 text-blue-400">Our Services</h1>
        <ul className="space-y-6 text-white/90">
          <li>
            <h2 className="text-2xl font-semibold">Custom Software Development</h2>
            <p>We design and build web and mobile applications tailored to your business needs.</p>
          </li>
          <li>
            <h2 className="text-2xl font-semibold">Cloud Solutions</h2>
            <p>Migration, deployment, and management of cloud infrastructure for scalable operations.</p>
          </li>
          <li>
            <h2 className="text-2xl font-semibold">AI & Automation</h2>
            <p>Integrate intelligent systems to automate tasks and enhance productivity.</p>
          </li>
          <li>
            <h2 className="text-2xl font-semibold">Consulting & Strategy</h2>
            <p>Expert advice to help you leverage technology for growth and efficiency.</p>
          </li>
        </ul>
      </main>
      <Footer />
    </div>
  )
}