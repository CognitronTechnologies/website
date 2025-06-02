import { motion } from "framer-motion";
import { RocketLaunchIcon } from '@heroicons/react/24/solid';

export default function AnimatedSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="my-16 py-12 px-6 bg-navy-dark rounded-lg shadow-lg flex flex-col items-center"
    >
      <RocketLaunchIcon className="w-14 h-14 text-blue-400 mb-4 animate-bounce" />
      <h2 className="text-3xl text-white font-bold mb-2">Launch Your Project with Cognitron</h2>
      <p className="text-white/80 text-center max-w-xl">
        We bring your ideas to life with innovation, expertise, and a passion for technology. Let’s build something amazing together.
      </p>
    </motion.section>
  );
}