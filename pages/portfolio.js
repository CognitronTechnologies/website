import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function Portfolio() {
  return (
    <div className="bg-page min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-4xl mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold mb-6 text-blue-400">Our Portfolio</h1>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Sample project cards */}
          <div className="bg-navy-dark rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-white mb-2">Project Alpha</h2>
            <p className="text-white/80">A scalable SaaS platform for business analytics.</p>
          </div>
          <div className="bg-navy-dark rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-white mb-2">Beta Mobile</h2>
            <p className="text-white/80">Cross-platform mobile app for on-the-go productivity.</p>
          </div>
          <div className="bg-navy-dark rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-white mb-2">Gamma AI</h2>
            <p className="text-white/80">AI-powered automation for enterprise workflows.</p>
          </div>
          <div className="bg-navy-dark rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-white mb-2">Delta Cloud</h2>
            <p className="text-white/80">Cloud migration and optimization for a fintech startup.</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}