import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { ArrowRightIcon, CpuChipIcon, RocketLaunchIcon, ShieldCheckIcon, UsersIcon } from '@heroicons/react/24/outline'
import { motion } from 'framer-motion'

export default function Home() {
  return (
    <div className="bg-page min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="max-w-4xl mx-auto px-4 pt-16 pb-24 text-center">
          <motion.h1
            className="text-5xl md:text-6xl font-extrabold text-blue-400 mb-6 drop-shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            Elevate Your Business with <span className="text-purple-400">Cognitron</span>
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-white/90 mb-10 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            We create transformative digital solutions powered by empathy, innovation, and cutting-edge technology. Let’s shape tomorrow’s experiences—together.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <a
              href="/contact"
              className="inline-block bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-4 px-10 rounded-full shadow-lg hover:from-blue-400 hover:to-purple-400 transition text-lg"
            >
              Start Your Project <ArrowRightIcon className="w-6 h-6 inline ml-2" />
            </a>
          </motion.div>
        </section>

        {/* Highlighted Services */}
        <section className="max-w-5xl mx-auto px-4 pb-20">
          <motion.h2
            className="text-2xl sm:text-3xl font-bold text-blue-300 mb-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            What We Do Best
          </motion.h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <motion.div
              className="bg-navy-dark rounded-xl p-6 shadow-lg flex flex-col items-center text-center border border-blue-900"
              whileHover={{ scale: 1.04 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <CpuChipIcon className="w-12 h-12 text-blue-400 mb-3" />
              <h3 className="text-xl font-semibold text-white mb-2">AI & Automation</h3>
              <p className="text-white/80 mb-2">Build smarter processes and products with custom machine learning and automation solutions.</p>
            </motion.div>
            <motion.div
              className="bg-navy-dark rounded-xl p-6 shadow-lg flex flex-col items-center text-center border border-blue-900"
              whileHover={{ scale: 1.04 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <RocketLaunchIcon className="w-12 h-12 text-purple-400 mb-3" />
              <h3 className="text-xl font-semibold text-white mb-2">Cloud Transformation</h3>
              <p className="text-white/80 mb-2">Modernize and scale with secure, resilient cloud platforms tailored to your business.</p>
            </motion.div>
            <motion.div
              className="bg-navy-dark rounded-xl p-6 shadow-lg flex flex-col items-center text-center border border-blue-900"
              whileHover={{ scale: 1.04 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <ShieldCheckIcon className="w-12 h-12 text-yellow-300 mb-3" />
              <h3 className="text-xl font-semibold text-white mb-2">Blockchain Solutions</h3>
              <p className="text-white/80 mb-2">Unlock transparency and trust with blockchain apps for finance, health, supply chain, and more.</p>
            </motion.div>
            <motion.div
              className="bg-navy-dark rounded-xl p-6 shadow-lg flex flex-col items-center text-center border border-blue-900"
              whileHover={{ scale: 1.04 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <UsersIcon className="w-12 h-12 text-pink-400 mb-3" />
              <h3 className="text-xl font-semibold text-white mb-2">Experience Design</h3>
              <p className="text-white/80 mb-2">Delight users and drive results with seamless, human-centered interfaces and journeys.</p>
            </motion.div>
          </div>
        </section>

        {/* Showcase / Call to Action */}
        <section className="max-w-5xl mx-auto px-4 pb-20">
          <motion.div
            className="bg-gradient-to-r from-blue-900/90 via-purple-800/70 to-blue-700/80 rounded-2xl shadow-2xl px-4 sm:px-10 py-10 sm:py-14 text-center border border-blue-900"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">See Our Work in Action</h2>
            <p className="text-white/80 text-base sm:text-lg mb-8">Explore our portfolio to discover how we help organizations like yours achieve breakthrough results.</p>
            <a
              href="/portfolio"
              className="inline-block w-full sm:w-auto bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:from-blue-400 hover:to-purple-400 transition text-base sm:text-lg"
            >
              View Portfolio <ArrowRightIcon className="w-5 h-5 inline ml-2" />
            </a>
          </motion.div>
        </section>
      </main>
      <Footer />
    </div>
  )
}