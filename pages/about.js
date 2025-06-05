import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { LightBulbIcon, UsersIcon, RocketLaunchIcon, ArrowTrendingUpIcon, HeartIcon } from '@heroicons/react/24/solid'
import { motion } from 'framer-motion'

export default function About() {
  return (
    <div className="bg-page min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-3xl mx-auto py-12 px-4">
        {/* Tagline */}
        <motion.div
          className="mb-10 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-blue-400">
            Empowering Exceptional Experiences
          </h1>
          <p className="text-xl text-white/80 font-medium">
            We innovate with purpose, transforming businesses through powerful technology and human-centric design.
          </p>
        </motion.div>

        {/* Our Journey */}
        <motion.section
          className="bg-gradient-to-r from-blue-900/90 via-purple-800/80 to-blue-700/90 rounded-2xl shadow-lg p-8 mb-8 border border-blue-900"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center gap-3 mb-3">
            <ArrowTrendingUpIcon className="w-8 h-8 text-blue-300" />
            <h2 className="text-2xl font-bold text-white">Our Journey</h2>
          </div>
          <p className="text-white/80 text-lg mb-2">
            From humble beginnings as a small group of innovators, Cognitron has grown into a passionate team of technologists, designers, and strategists. Our journey is shaped by curiosity, empathy, and the drive to help businesses thrive.
          </p>
          <p className="text-white/70">
            We believe that every business—no matter the size—deserves access to the latest advancements in AI, blockchain, and cloud. We’ve helped startups launch, enterprises scale, and communities connect by blending strategy, creativity, and world-class engineering.
          </p>
        </motion.section>

        {/* Our Philosophy */}
        <motion.section
          className="grid gap-8 md:grid-cols-2 mb-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="bg-navy-dark rounded-2xl shadow-lg p-6 sm:p-8 flex flex-col">
            <div className="flex items-center gap-3 mb-3">
              <LightBulbIcon className="w-8 h-8 text-yellow-300" />
              <h2 className="text-lg sm:text-xl font-bold text-white">Our Philosophy</h2>
            </div>
            <p className="text-white/80 text-base sm:text-lg">
              We put people first. Every solution we craft is grounded in empathy and the desire to make technology delightful and accessible. 
              We’re relentless learners—exploring the frontier of what’s possible so you can stay ahead.
            </p>
          </div>
          <div className="bg-navy-dark rounded-2xl shadow-lg p-6 sm:p-8 flex flex-col">
            <div className="flex items-center gap-3 mb-3">
              <RocketLaunchIcon className="w-8 h-8 text-purple-400" />
              <h2 className="text-lg sm:text-xl font-bold text-white">What We Do</h2>
            </div>
            <p className="text-white/80 text-base sm:text-lg">
              From AI-powered automation to secure blockchain solutions and scalable cloud platforms, we help businesses reimagine what’s possible. 
              Our team partners with you every step of the way, making your vision a reality—with measurable impact.
            </p>
          </div>
        </motion.section>

        {/* Values */}
        <motion.section
          className="bg-navy-dark rounded-2xl shadow-lg p-6 sm:p-8 mb-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.0 }}
        >
          <div className="flex items-center gap-3 mb-3">
            <HeartIcon className="w-8 h-8 text-pink-400" />
            <h2 className="text-xl sm:text-2xl font-bold text-white">Our Core Values</h2>
          </div>
          <ul className="text-white/80 text-base sm:text-lg grid gap-3 md:grid-cols-2 list-none pl-0">
            <li>
              <span className="text-blue-300 font-semibold">Empathy:</span> We care deeply about user and client experiences.
            </li>
            <li>
              <span className="text-blue-300 font-semibold">Innovation:</span> We embrace the latest technologies to solve real problems.
            </li>
            <li>
              <span className="text-blue-300 font-semibold">Transparency:</span> We believe in honest, open communication and partnerships.
            </li>
            <li>
              <span className="text-blue-300 font-semibold">Excellence:</span> We strive for quality in every project, big or small.
            </li>
          </ul>
        </motion.section>

        {/* Call to Action */}
        <motion.div
          className="mt-10 text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <a
            href="/contact"
            className="inline-block w-full sm:w-auto bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:from-blue-400 hover:to-purple-400 transition text-base sm:text-lg"
          >
            Let’s Build Something Amazing Together
          </a>
        </motion.div>
      </main>
      <Footer />
    </div>
  )
}