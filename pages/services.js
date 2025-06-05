import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { CpuChipIcon, RocketLaunchIcon, ShieldCheckIcon, UsersIcon, ArrowRightIcon } from '@heroicons/react/24/outline'
import { motion } from 'framer-motion'

const services = [
	{
		icon: <CpuChipIcon className="w-10 h-10 text-blue-400 mb-3" />,
		title: 'AI & Automation',
		description:
			'From predictive analytics to workflow automation, we design and deploy intelligent solutions that transform how you work and deliver value.',
	},
	{
		icon: <RocketLaunchIcon className="w-10 h-10 text-purple-400 mb-3" />,
		title: 'Cloud Transformation',
		description:
			'Build, migrate, and optimize on secure, scalable, and cost-effective cloud platforms to power your business for growth.',
	},
	{
		icon: <ShieldCheckIcon className="w-10 h-10 text-yellow-300 mb-3" />,
		title: 'Blockchain Solutions',
		description:
			'We develop decentralized apps and smart contracts to unlock transparency, trust, and efficiency for your organization.',
	},
	{
		icon: <UsersIcon className="w-10 h-10 text-pink-400 mb-3" />,
		title: 'Experience Design',
		description:
			'Human-centered design for web, mobile, and enterprise. We create seamless, beautiful, and accessible digital journeys.',
	},
]

export default function Services() {
	return (
		<div className="bg-page min-h-screen flex flex-col">
			<Navbar />
			<main className="flex-1 max-w-5xl mx-auto py-12 px-4">
				<motion.div
					className="mb-10 text-center"
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.7 }}
				>
					<h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-blue-400 drop-shadow-lg">
						Our Services
					</h1>
					<p className="text-lg md:text-xl text-white/80 font-medium max-w-2xl mx-auto">
						We help you grow and thrive with technology, creativity, and a
						relentless commitment to your success.
					</p>
				</motion.div>
				<section className="grid gap-8 sm:gap-10 sm:grid-cols-2 lg:grid-cols-2">
					{services.map((service, idx) => (
						<motion.div
							key={service.title}
							className="bg-navy-dark rounded-2xl shadow-lg flex flex-col items-center text-center p-6 sm:p-10 border border-blue-900 hover:shadow-2xl transition-shadow w-full"
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5 + idx * 0.1 }}
						>
							{service.icon}
							<h2 className="text-lg sm:text-2xl text-white font-semibold mb-2">
								{service.title}
							</h2>
							<p className="text-white/80 text-base sm:text-lg mb-4">
								{service.description}
							</p>
						</motion.div>
					))}
				</section>
				<motion.div
					className="mt-10 sm:mt-16 text-center"
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.7 }}
				>
					<a
						href="/contact"
						className="inline-block w-full sm:w-auto bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:from-blue-400 hover:to-purple-400 transition text-base sm:text-lg"
					>
						Let's Talk About Your Project{' '}
						<ArrowRightIcon className="w-5 h-5 inline ml-2" />
					</a>
				</motion.div>
			</main>
			<Footer />
		</div>
	)
}