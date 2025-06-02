import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import TechHero from '../components/TechHero'
import AnimatedSection from '../components/AnimatedSection'
import AnimatedCTA from '../components/AnimatedCTA'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Home() {
  return (
    <div className="bg-page min-h-screen flex flex-col">
      <Navbar />
      <TechHero />
      <main className="flex-1 max-w-5xl mx-auto py-8 px-4 flex flex-col gap-12">
        {/* Services Overview */}
        <section className="mb-10">
          <h2 className="text-3xl font-bold text-blue-400 mb-6 text-center">Explore Our Expertise</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              className="bg-navy-dark rounded-lg shadow-md p-6 flex flex-col justify-between transition-transform duration-300 hover:scale-105 hover:shadow-blue-500/30"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-2xl text-white font-semibold mb-2">AI Solutions</h3>
              <p className="text-white/80 mb-4">
                Unlock the power of artificial intelligence to automate, analyze and scale your business.
              </p>
              <Link href="/services" className="bg-blue-500 text-white px-4 py-2 rounded font-bold hover:bg-blue-400 w-max">Learn More</Link>
            </motion.div>
            <motion.div
              className="bg-navy-dark rounded-lg shadow-md p-6 flex flex-col justify-between transition-transform duration-300 hover:scale-105 hover:shadow-blue-500/30"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl text-white font-semibold mb-2">Blockchain Development</h3>
              <p className="text-white/80 mb-4">
                Build secure, transparent, and scalable blockchain apps for next-gen businesses.
              </p>
              <Link href="/services" className="bg-blue-500 text-white px-4 py-2 rounded font-bold hover:bg-blue-400 w-max">See Blockchain</Link>
            </motion.div>
            <motion.div
              className="bg-navy-dark rounded-lg shadow-md p-6 flex flex-col justify-between transition-transform duration-300 hover:scale-105 hover:shadow-blue-500/30"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h3 className="text-2xl text-white font-semibold mb-2">Cloud Transformation</h3>
              <p className="text-white/80 mb-4">
                Migrate, manage, and optimize your infrastructure with robust cloud solutions.
              </p>
              <Link href="/services" className="bg-blue-500 text-white px-4 py-2 rounded font-bold hover:bg-blue-400 w-max">Cloud Services</Link>
            </motion.div>
            <motion.div
              className="bg-navy-dark rounded-lg shadow-md p-6 flex flex-col justify-between transition-transform duration-300 hover:scale-105 hover:shadow-blue-500/30"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-2xl text-white font-semibold mb-2">Consulting & Strategy</h3>
              <p className="text-white/80 mb-4">
                Align your tech roadmap and business vision with expert guidance and agile processes.
              </p>
              <Link href="/services" className="bg-blue-500 text-white px-4 py-2 rounded font-bold hover:bg-blue-400 w-max">Consult Us</Link>
            </motion.div>
          </div>
        </section>

        {/* Animated Section */}
        <AnimatedSection />

        {/* Portfolio Section */}
        <section className="mb-10">
          <h2 className="text-3xl text-blue-400 font-bold mb-6 text-center">Our Portfolio</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div className="bg-navy-dark rounded-lg shadow-md p-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-xl text-white font-semibold mb-2">Project Alpha</h3>
              <p className="text-white/80">Scalable SaaS business analytics platform with AI-driven insights.</p>
            </motion.div>
            <motion.div className="bg-navy-dark rounded-lg shadow-md p-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-xl text-white font-semibold mb-2">Beta Mobile</h3>
              <p className="text-white/80">Cross-platform mobile productivity app with blockchain-based security.</p>
            </motion.div>
            <motion.div className="bg-navy-dark rounded-lg shadow-md p-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h3 className="text-xl text-white font-semibold mb-2">Gamma AI</h3>
              <p className="text-white/80">AI-powered enterprise automation for process efficiency.</p>
            </motion.div>
            <motion.div className="bg-navy-dark rounded-lg shadow-md p-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-xl text-white font-semibold mb-2">Delta Cloud</h3>
              <p className="text-white/80">Full cloud migration & optimization for a fintech startup.</p>
            </motion.div>
          </div>
          <div className="flex justify-center mt-6">
            <Link href="/portfolio" className="bg-blue-500 text-white px-6 py-2 rounded font-bold hover:bg-blue-400">View All Projects</Link>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="my-12 px-4 max-w-3xl mx-auto">
          <h2 className="text-3xl text-blue-400 font-bold mb-6 text-center">What Our Clients Say</h2>
          <div className="grid gap-8 md:grid-cols-2">
            <motion.blockquote
              className="bg-navy-dark rounded-lg p-6 shadow text-white/90"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              “Cognitron transformed our workflow and helped us scale. Highly recommended!”
              <footer className="mt-4 text-blue-300 font-semibold">— Alex, CEO at FinTechCo</footer>
            </motion.blockquote>
            <motion.blockquote
              className="bg-navy-dark rounded-lg p-6 shadow text-white/90"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              “Professional, creative, and always on time. Our go-to tech partner.”
              <footer className="mt-4 text-blue-300 font-semibold">— Maria, Founder at HealthSync</footer>
            </motion.blockquote>
          </div>
        </section>

        {/* Animated Call to Action */}
        <AnimatedCTA />

      </main>
      <Footer />
    </div>
  )
}