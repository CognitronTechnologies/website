import { motion } from "framer-motion";
import { RocketLaunchIcon } from '@heroicons/react/24/solid';

export default function AnimatedSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="my-10 sm:my-16 py-8 sm:py-12 px-4 sm:px-6 bg-navy-dark rounded-lg shadow-lg flex flex-col items-center"
    >
      <RocketLaunchIcon className="w-12 sm:w-14 h-12 sm:h-14 text-blue-400 mb-4 animate-bounce" />
      <h2 className="text-2xl sm:text-3xl text-white font-bold mb-2 text-center">Launch Your Project with Cognitron</h2>
      <p className="text-white/80 text-center max-w-xl text-base sm:text-lg">
        We bring your ideas to life with innovation, expertise, and a passion for technology. Let’s build something amazing together.
      </p>
    </motion.section>
  );
}