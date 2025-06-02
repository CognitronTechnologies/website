import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ServiceCard from '../components/ServiceCard'
import { CpuChipIcon, CloudIcon, CubeTransparentIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline'

const services = [
  {
    title: "AI Solutions",
    Icon: CpuChipIcon,
    color: "text-blue-400",
    desc: "Leverage machine learning and intelligent automation to optimize your workflow and unlock new business insights.",
  },
  {
    title: "Blockchain Integration",
    Icon: CubeTransparentIcon,
    color: "text-purple-400",
    desc: "Secure, transparent, and scalable blockchain applications for decentralized finance, supply chain, and more.",
  },
  {
    title: "Cloud Transformation",
    Icon: CloudIcon,
    color: "text-yellow-400",
    desc: "Move, scale, and optimize your infrastructure with our full-stack cloud migration and management services.",
  },
  {
    title: "Tech Consulting",
    Icon: AdjustmentsHorizontalIcon,
    color: "text-pink-400",
    desc: "Expert guidance to align your technology roadmap with business goals, including security and compliance.",
  },
]

export default function Services() {
  return (
    <div className="bg-page min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-5xl mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold mb-10 text-blue-400 text-center">Our Services</h1>
        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}