import { motion } from "framer-motion"

export default function ServiceCard({ title, Icon, desc, color }) {
  return (
    <motion.div
      className="bg-navy-dark rounded-lg p-5 sm:p-6 flex flex-col items-center transition-shadow hover:shadow-blue-500/40 shadow-md w-full"
      whileHover={{ scale: 1.07, y: -8, boxShadow: "0 8px 40px 4px rgba(59, 130, 246, 0.18)" }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45 }}
    >
      <Icon className={`w-10 sm:w-12 h-10 sm:h-12 mb-3 ${color}`} aria-hidden="true" />
      <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 text-center">{title}</h3>
      <p className="text-white/80 text-center text-sm sm:text-base">{desc}</p>
    </motion.div>
  )
}