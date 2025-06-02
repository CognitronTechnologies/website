import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { BriefcaseIcon, ArrowTopRightOnSquareIcon, CpuChipIcon } from '@heroicons/react/24/outline'
import { motion } from 'framer-motion'

// Example data, replace with your real projects or fetch from your CMS
const projects = [
  {
    name: "FinTrust AI Analytics",
    description: "AI-powered analytics platform helping financial institutions uncover insights and improve customer experiences.",
    tech: ["AI", "Machine Learning", "Data Visualization", "React"],
    url: "https://fintrust.example.com",
    image: "/portfolio/fintrust.jpg"
  },
  {
    name: "BlockHealth",
    description: "Blockchain solution for secure patient records and instant healthcare provider verification across networks.",
    tech: ["Blockchain", "Node.js", "Smart Contracts", "Cloud"],
    url: "https://blockhealth.example.com",
    image: "/portfolio/blockhealth.jpg"
  },
  {
    name: "Shopwise Commerce",
    description: "Seamless cloud-based platform for e-commerce businesses, enabling real-time inventory, analytics, and AI-driven recommendations.",
    tech: ["Cloud", "AI", "E-commerce", "Next.js"],
    url: "https://shopwise.example.com",
    image: "/portfolio/shopwise.jpg"
  }
]

export default function Portfolio() {
  return (
    <div className="bg-page min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-6xl mx-auto py-12 px-4">
        <motion.div
          className="mb-10 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-blue-400">
            Our Portfolio
          </h1>
          <p className="text-xl text-white/80 font-medium">
            Real solutions. Real impact. See how we help businesses grow, innovate, and delight their users.
          </p>
        </motion.div>
        <section className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, idx) => (
            <motion.div
              key={project.name}
              className="bg-navy-dark rounded-2xl shadow-lg flex flex-col overflow-hidden border border-blue-900 hover:shadow-2xl transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 + idx * 0.1 }}
            >
              {project.image && (
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-48 object-cover object-center"
                />
              )}
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center mb-2 gap-2">
                  <BriefcaseIcon className="w-6 h-6 text-blue-400" />
                  <h2 className="text-2xl text-white font-semibold">{project.name}</h2>
                </div>
                <p className="text-white/80 mb-4 flex-1">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech) => (
                    <span key={tech} className="inline-flex items-center px-3 py-1 rounded-full bg-blue-900/70 text-blue-200 text-sm font-medium">
                      <CpuChipIcon className="w-4 h-4 mr-1 text-blue-400" />
                    </span>
                  ))}
                </div>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center self-start mt-auto bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold px-4 py-2 rounded-full shadow hover:from-blue-400 hover:to-purple-400 transition"
                >
                  View Project
                  <ArrowTopRightOnSquareIcon className="w-5 h-5 ml-2" />
                </a>
              </div>
            </motion.div>
          ))}
        </section>
        <div className="mt-16 text-center">
          <a
            href="/contact"
            className="inline-block bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:from-blue-400 hover:to-purple-400 transition text-lg"
          >
            Start your project with us
          </a>
        </div>
      </main>
      <Footer />
    </div>
  )
}