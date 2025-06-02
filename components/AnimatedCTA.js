import { motion } from "framer-motion"
import { BoltIcon } from "@heroicons/react/24/solid"

export default function AnimatedCTA() {
  return (
    <motion.section
      className="bg-gradient-to-r from-blue-900 via-purple-800 to-blue-700 rounded-xl shadow-xl px-8 py-12 mt-12 flex flex-col items-center"
      initial={{ opacity: 0, scale: 0.93 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <BoltIcon className="w-16 h-16 text-yellow-300 animate-bounce mb-4" />
      <h2 className="text-3xl text-white font-bold mb-2 text-center">Ready to upgrade your tech?</h2>
      <p className="text-white/80 text-center mb-6 max-w-xl">
        Let’s power your business with the latest in AI, blockchain, and cloud technology. Schedule a free consultation today!
      </p>
      <a href="/contact" className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-3 px-8 rounded-full transition shadow-lg">
        Get Started
      </a>
    </motion.section>
  )
}