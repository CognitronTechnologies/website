import { motion } from "framer-motion"
import { CpuChipIcon, CloudIcon, CubeTransparentIcon } from "@heroicons/react/24/outline"

export default function TechHero() {
  return (
    <section className="relative mb-10 sm:mb-16">
      {/* SVG Techy Background */}
      <svg className="absolute inset-0 w-full h-full" style={{zIndex:0, opacity:0.13}} viewBox="0 0 600 200" fill="none">
        <rect x="20" y="50" width="560" height="100" rx="30" fill="#0ea5e9"/>
        <circle cx="500" cy="100" r="60" fill="#a21caf"/>
        <rect x="200" y="20" width="80" height="160" rx="20" fill="#fbbf24"/>
      </svg>
      <motion.div
        className="relative z-10 flex flex-col items-center py-10 sm:py-16"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="flex gap-4 sm:gap-6 mb-4">
          <CpuChipIcon className="w-10 sm:w-12 h-10 sm:h-12 text-blue-400 animate-pulse" />
          <CubeTransparentIcon className="w-10 sm:w-12 h-10 sm:h-12 text-purple-400 animate-bounce" />
          <CloudIcon className="w-10 sm:w-12 h-10 sm:h-12 text-yellow-400 animate-spin-slow" />
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold text-white mb-3 text-center">AI, Blockchain & Cloud for Your Future</h1>
        <p className="text-base sm:text-lg text-white/80 text-center max-w-2xl">
          Cognitron delivers next-generation solutions powered by AI, blockchain, and cutting-edge tech. Transform your business for tomorrow.
        </p>
      </motion.div>
      {/* Custom animation for cloud icon */}
      <style>{`
        .animate-spin-slow {
          animation: spin 7s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg);}
          to { transform: rotate(360deg);}
        }
      `}</style>
    </section>
  )
}