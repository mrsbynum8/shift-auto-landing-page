import { motion, AnimatePresence } from 'framer-motion'
import { Phone, CheckCircle, Wrench, ShieldCheck, Settings, Car, Star, ArrowRight, ChevronDown, MessageSquare, Quote, Facebook, Twitter, Instagram, Menu, X, Mail, Clock, Send, MapPin, Gauge } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import { Routes, Route, Link, useLocation, useParams } from 'react-router-dom'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const BRAND = {
  name: 'Shift Auto',
  fullName: 'Shift Auto Repair & Performance',
  phone: '(800) 555-0724',
  email: 'service@shiftautorepair.com',
  address: '456 Performance Way, Irvine, CA 92602',
  location: 'Irvine, CA',
  tagline: 'Precision Engineering & Expert Care'
}

const services = [
  {
    id: 'mechanical',
    title: 'Precision Mechanical',
    description: 'Comprehensive engine repair, transmission service, and brake optimization for peak performance.',
    longDescription: [
      `When your vehicle hits the roads of ${BRAND.location}, you need a machine that isn't just running, but optimized for the highest levels of safety and response. Our mechanical solutions go beyond simple part replacement; we focus on the entire ecosystem of your vehicle's drivetrain. From complex engine rebuilds to precision brake calibration, we ensure every component works in perfect harmony, keeping you on the road and out of the shop.`,
      `Our master mechanics specialize in identifying the subtle signs of mechanical fatigue before they become catastrophic failures. Whether you're dealing with a mysterious engine knock, a slipping transmission, or a sudden loss of braking power, we provide transparent diagnostics and long-term solutions. We don't just fix symptoms—we restore the reliability and driving experience you expect from your vehicle.`
    ],
    technicalDetails: [
      { label: 'Engine Spec', value: 'OEM Standard' },
      { label: 'Typical Repair', value: 'Same Day Service' },
      { label: 'Warranty', value: '24-Mo / 24k-Mile' },
      { label: 'Certified', value: 'ASE Master Techs' }
    ],
    icon: Settings,
    link: '/services/mechanical',
    image: '/mechanical_service.png'
  },
  {
    id: 'diagnostics',
    title: 'Advanced Diagnostics',
    description: 'Cutting-edge computerized analysis and electrical troubleshooting to find issues before they start.',
    longDescription: [
      `Modern vehicles are more computer than machine. We provide comprehensive diagnostic services that encompass traditional mechanical inspection and cutting-edge digital analysis. Our goal is to ensure that when a warning light appears on your dashboard, we can pinpoint the exact cause instantly, preventing unnecessary part replacements and saving you time and money.`,
      `Using the latest OEM-level scanning technology, we dive deep into your vehicle's onboard systems, checking for hidden faults and software updates. We guide you through the technical data, explaining exactly what your car is telling us in plain English. With our proactive digital health checks, you can rest assured that your vehicle's complex electronics are functioning exactly as intended.`
    ],
    technicalDetails: [
      { label: 'Scan Tech', value: 'Level 3 OBD-II' },
      { label: 'System Check', value: 'All Modules' },
      { label: 'Update Ready', value: 'Firmware Sync' },
      { label: 'Precision', value: '99.9% Accuracy' }
    ],
    icon: Gauge,
    link: '/services/diagnostics',
    image: '/diagnostics_service.png'
  },
  {
    id: 'maintenance',
    title: 'Express Maintenance',
    description: 'Proactive oil changes, fluid flushes, and multi-point inspections to extend your vehicle\'s life.',
    longDescription: [
      `Strategic vehicle maintenance is the single most effective way to protect your investment and ensure the longevity of your car. Our comprehensive multi-point inspection process is designed to catch minor issues—like worn belts, degraded fluids, or tire misalignment—before they lead to expensive repairs. This proactive approach doesn't just save you money; it keeps your vehicle running at peak efficiency, reducing daily wear and tear.`,
      `In addition to mechanical reliability, our maintenance plans place heavy emphasis on safety and fuel economy. We flush vital fluids, rotate tires, and check safety systems to ensure your vehicle is always ready for the road. A well-maintained car is a safe car, providing you with a smoother, more efficient driving experience for you and your family.`
    ],
    technicalDetails: [
      { label: 'Inspection', value: '50-Point Check' },
      { label: 'Intervals', value: '3k - 10k Miles' },
      { label: 'Fluid Spec', value: 'Full Synthetic' },
      { label: 'Priority', value: 'Express Lane Access' }
    ],
    icon: Wrench,
    link: '/services/maintenance',
    image: '/maintenance_service.png'
  }
]

const locations = [
  {
    id: 'irvine',
    name: 'Irvine',
    heroTitle: 'Expert Auto Repair in Irvine',
    description: `We are proud to serve Irvine, bringing world-class automotive repair to the commuters and families of Orange County. As a center for high-end vehicles and daily drivers alike, Irvine demands a mechanic who understands the nuances of precision engineering. From the high-performance cars near UCI to the luxury SUVs in Newport Coast areas, our master technicians ensure your vehicle handles perfectly. We understand the specific stresses that California traffic and coastal air put on your vehicle's systems, allowing us to provide targeted repairs that keep you on the road and safe. Whether you need a simple oil change or complex electrical troubleshooting, Shift Auto brings the expertise and integrity that Irvine drivers deserve.`,
    mapImage: '/locations/irvine.png'
  },
  {
    id: 'tustin',
    name: 'Tustin',
    heroTitle: 'Trusted Mechanics in Tustin',
    description: `Our team is dedicated to providing Tustin residents with automotive services that are as reliable as the historic streets they drive on. In a community that values longevity and quality, we take a thorough approach to every vehicle. Whether you're maintaining a classic car that's been in the family for years or the latest hybrid commuter, we use OEM parts and rigorous testing to ensure your safety. Our understanding of the local driving patterns in Tustin allows us to recommend maintenance schedules that actually make sense for your lifestyle. We prioritize honesty over upselling, ensuring that every Tustin family has a local mechanic they can truly trust for the long haul.`,
    mapImage: '/locations/tustin.png'
  },
  {
    id: 'costa-mesa',
    name: 'Costa Mesa',
    heroTitle: 'Serving Costa Mesa Drivers',
    description: `Costa Mesa vehicle owners trust Shift Auto for our transparent diagnostics and commitment to performance. Known for its strong car culture and industrial heart, Costa Mesa knows the value of hard work and mechanical skill. Whether you're heading to the beach or navigating the 405, we ensure your vehicle is up to the task. From European imports to domestic trucks, we handle every car with the same level of precision and respect. We take pride in solving the problems others can't, offering specialized repairs that keep the Costa Mesa community moving. We aren't just your mechanics; we're your partners in vehicle longevity, ensuring every mile you drive is a confident one.`,
    mapImage: '/locations/costa-mesa.png'
  },
  {
    id: 'santa-ana',
    name: 'Santa Ana',
    heroTitle: 'Your Santa Ana Auto Shop',
    description: `In Santa Ana, we've built a reputation for speed and reliability, serving one of OC's most active and diverse communities. Our shop is designed to get you back on the road quickly without compromising on quality. We understand that in a busy city like Santa Ana, your car isn't just a luxury—it's a necessity. We specialize in hard-working vehicles, providing the robust maintenance and repair services needed to handle heavy traffic and long commutes. Our technicians are trained to identify wear and tear early, saving you from costly roadside failures. By choosing Shift Auto, you're partnering with a team that values your time and your vehicle as much as you do, ensuring you can navigate Santa Ana with total peace of mind.`,
    mapImage: '/locations/santa-ana.png'
  },
  {
    id: 'newport-beach',
    name: 'Newport Beach',
    heroTitle: 'Elite Care for Newport Beach',
    description: `Newport Beach vehicles face unique environmental challenges, particularly the corrosive effects of salt air and high humidity. We provide specialized automotive care that prioritizes both mechanical response and exterior preservation for our coastal clients. From the classic convertibles of the peninsula to the luxury imports of Newport Coast, we provide white-glove service that respects the standard of the local community. Our team specializes in comprehensive corrosion prevention and advanced electronics maintenance, ensuring your high-end investment remains in showroom condition. We offer a level of precision and personal attention that matches the Newport Beach lifestyle, delivering results that are as flawless as the view.`,
    mapImage: '/locations/newport-beach.png'
  }
]

const faqs = [
  {
    question: "Do you use OEM parts for repairs?",
    answer: "Yes, we prioritize Original Equipment Manufacturer (OEM) parts to ensure your vehicle maintains its factory performance and safety standards."
  },
  {
    question: "How often should I get an oil change?",
    answer: "Most modern vehicles require a full synthetic oil change every 7,500 to 10,000 miles, but we recommend checking your specific owner's manual for the best interval."
  },
  {
    question: "What does my 'Check Engine' light mean?",
    answer: "The light can indicate anything from a loose gas cap to a serious engine fault. We provide a full digital scan to identify the exact code and issue."
  }
]

const testimonials = [
  { name: 'Marcus Chen', role: 'Daily Commuter', content: 'Hands down the best shop in Irvine. They found an electrical issue two other mechanics missed. Fast, fair, and professional.' },
  { name: 'Sarah Miller', role: 'SUV Owner', content: 'I bring my car here for all its scheduled maintenance. The digital health checks they provide are so helpful for understanding what my car actually needs.' },
  { name: 'David Rossi', role: 'Car Enthusiast', content: 'Extremely knowledgeable team. They treat my performance car with the same care they would their own. Shift Auto is the only place I trust.' }
]

const SectionHeader = ({ 
  icon: Icon, 
  subtitle, 
  title, 
  description, 
  light = false, 
  centered = false,
  align = 'left',
  mb = '8' 
}: { 
  icon: any, 
  subtitle: string, 
  title: string, 
  description?: string, 
  light?: boolean, 
  centered?: boolean,
  align?: 'left' | 'center' | 'right',
  mb?: string
}) => {
  const isCentered = centered || align === 'center';
  const isRight = align === 'right';

  return (
    <div className={cn(isCentered ? "text-center" : isRight ? "text-right" : "text-left", `mb-${mb}`)}>
      <div className={cn(
        "inline-flex items-center gap-3 font-bold uppercase tracking-[0.2em] text-[13px] mb-6 px-4 py-2 rounded-full",
        light ? "bg-white/10 text-white" : "bg-secondary/10 text-secondary"
      )}>
        <Icon size={16} className={light ? "" : "opacity-80"} />
        {subtitle}
      </div>
      <h2 className={cn(
        "text-[40px] md:text-[56px] font-heading font-bold mb-6 leading-[1.1]",
        light ? "text-white" : "text-text"
      )}>
        {title}
      </h2>
      {description && (
        <p className={cn(
          "text-lg max-w-2xl leading-relaxed",
          isCentered ? "mx-auto" : isRight ? "ml-auto" : "",
          light ? "text-white/60" : "text-text/50"
        )}>
          {description}
        </p>
      )}
    </div>
  );
}

const steps = [
  { title: 'Book Diagnostic', description: 'Schedule your appointment online or by phone for a preliminary inspection or routine service.' },
  { title: 'Digital Analysis', description: 'We perform a full scan and physical inspection, providing a digital report of your vehicle\'s health.' },
  { title: 'Precision Repair', description: 'Our master mechanics perform the necessary work using OEM parts and advanced tools.' },
  { title: 'Performance Test', description: 'We road-test your vehicle and perform final quality checks to ensure everything is perfect.' }
]

const ScrollToTop = () => {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

const Nav = () => {
  const location = useLocation()
  const isHome = location.pathname === '/'
  const [isServicesOpen, setIsServicesOpen] = useState(false)
  const [isLocationsOpen, setIsLocationsOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
            SA
          <span className="text-2xl font-heading font-bold text-primary tracking-tight">{BRAND.name}</span>
        </Link>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 font-medium">
          <Link to="/" className={cn("transition-colors", isHome ? "text-primary" : "text-text hover:text-primary")}>Home</Link>
          <Link to="/about" className={cn("transition-colors", location.pathname === '/about' ? "text-primary" : "text-text hover:text-primary")}>About Us</Link>
          
          <div 
            className="relative"
            onMouseEnter={() => setIsServicesOpen(true)}
            onMouseLeave={() => setIsServicesOpen(false)}
          >
            <button 
              className={cn(
                "flex items-center gap-1 py-4 transition-colors",
                isServicesOpen || location.pathname.startsWith('/services') ? "text-primary" : "text-text hover:text-primary"
              )}
              onClick={() => setIsServicesOpen(!isServicesOpen)}
            >
              Services
              <ChevronDown size={16} className={cn("transition-transform duration-300", isServicesOpen && "rotate-180")} />
            </button>
            <AnimatePresence>
              {isServicesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute left-0 top-full pt-2 w-64 h-auto"
                >
                  <div className="bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-slate-50 p-4 ring-1 ring-black/5 overflow-hidden">
                    {services.map((service) => (
                      <Link
                        key={service.id}
                        to={service.link}
                        className="flex items-center gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors group"
                        onClick={() => setIsServicesOpen(false)}
                      >
                        <div className="w-10 h-10 bg-secondary/10 rounded-xl flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-colors">
                          <service.icon size={20} />
                        </div>
                        <div>
                          <div className="font-bold text-text mb-0.5">{service.title}</div>
                          <div className="text-[11px] text-text/40 font-bold uppercase tracking-widest leading-none">View Details</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div 
            className="relative"
            onMouseEnter={() => setIsLocationsOpen(true)}
            onMouseLeave={() => setIsLocationsOpen(false)}
          >
            <button 
              className={cn(
                "flex items-center gap-1 py-4 transition-colors",
                isLocationsOpen || location.pathname.startsWith('/locations') ? "text-primary" : "text-text hover:text-primary"
              )}
              onClick={() => setIsLocationsOpen(!isLocationsOpen)}
            >
              Locations
              <ChevronDown size={16} className={cn("transition-transform duration-300", isLocationsOpen && "rotate-180")} />
            </button>
            <AnimatePresence>
              {isLocationsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute left-0 top-full pt-2 w-64 h-auto"
                >
                  <div className="bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-slate-100 p-4 ring-1 ring-black/5 overflow-hidden">
                    {locations.map((loc) => (
                      <Link
                        key={loc.id}
                        to={`/locations/${loc.id}`}
                        className="flex items-center gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors group"
                        onClick={() => setIsLocationsOpen(false)}
                      >
                        <div className="w-10 h-10 bg-secondary/10 rounded-xl flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-colors">
                          <MapPin size={20} />
                        </div>
                        <div>
                          <div className="font-bold text-text mb-0.5">{loc.name}</div>
                          <div className="text-[11px] text-text/40 font-bold uppercase tracking-widest leading-none">View Service Area</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <Link to="/contact" className="text-text hover:text-primary transition-colors">Contact</Link>
        </div>

        <div className="flex items-center gap-4">
          <Link to="/contact" className="hidden sm:flex btn-primary items-center gap-2">
            Get a Quote
            <ArrowRight size={18} />
          </Link>
          
          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-text hover:text-primary transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-slate-100 overflow-hidden"
          >
            <div className="p-6 space-y-4">
              <Link to="/" className="block text-lg font-bold text-text hover:text-primary" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
              <Link to="/about" className="block text-lg font-bold text-text hover:text-primary" onClick={() => setIsMobileMenuOpen(false)}>About Us</Link>
              
              <div className="space-y-3">
                <div className="text-sm font-black uppercase tracking-widest text-text/30 pt-2">Our Services</div>
                {services.map((service) => (
                  <Link
                    key={service.id}
                    to={service.link}
                    className="flex items-center gap-4 p-3 rounded-xl bg-slate-50 text-text font-bold"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <service.icon size={20} className="text-primary" />
                    {service.title}
                  </Link>
                ))}
              </div>

              <div className="space-y-3">
                <div className="text-sm font-black uppercase tracking-widest text-text/30 pt-2">Our Locations</div>
                {locations.map((loc) => (
                  <Link
                    key={loc.id}
                    to={`/locations/${loc.id}`}
                    className="flex items-center gap-4 p-3 rounded-xl bg-slate-50 text-text font-bold"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <MapPin size={20} className="text-primary" />
                    {loc.name}
                  </Link>
                ))}
              </div>
              <a href="/#contact" className="block text-lg font-bold text-text hover:text-primary" onClick={() => setIsMobileMenuOpen(false)}>Contact</a>
              <button className="w-full btn-primary py-4 mt-4">Get a Quote</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

const Footer = () => (
  <footer className="bg-black text-white/50 py-16 border-t border-white/5">
    <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 lg:gap-8">
      {/* Brand column — spans 2 cols on md */}
      <div className="col-span-2 md:col-span-3 lg:col-span-1">
        <div className="flex items-center gap-3 text-white mb-6">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">SA</div>
          <span className="text-xl font-heading font-bold tracking-tight">{BRAND.name}</span>
        </div>
        <p className="text-base leading-relaxed mb-6">
          Expert automotive services providing precision mechanical repair and performance optimization to drivers across {BRAND.location} and the surrounding areas.
        </p>
        <div className="flex gap-3">
          {[Facebook, Twitter, Instagram].map((Icon, i) => (
            <div key={i} className="w-9 h-9 border border-white/10 rounded-lg flex items-center justify-center hover:bg-primary hover:border-primary transition-all cursor-pointer">
              <Icon size={16} />
            </div>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-white font-black uppercase tracking-widest text-xs mb-6">Company</h4>
        <ul className="space-y-4 text-base">
          <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
          <li><a href="#" className="hover:text-primary transition-colors">Our Team</a></li>
          <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
          <li><Link to="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
        </ul>
      </div>

      <div>
        <h4 className="text-white font-black uppercase tracking-widest text-xs mb-6">Services</h4>
        <ul className="space-y-4 text-base">
          {services.map(s => (
            <li key={s.id}><Link to={s.link} className="hover:text-primary transition-colors">{s.title}</Link></li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="text-white font-black uppercase tracking-widest text-xs mb-6">Locations</h4>
        <ul className="space-y-4 text-base">
          {locations.map(loc => (
            <li key={loc.id}><Link to={`/locations/${loc.id}`} className="hover:text-primary transition-colors">{loc.name}</Link></li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="text-white font-black uppercase tracking-widest text-xs mb-6">Reach Us</h4>
        <div className="space-y-4 text-base">
          <p className="leading-relaxed">{BRAND.address}</p>
          <a href={`tel:${BRAND.phone}`} className="block text-white font-bold text-2xl tracking-tight hover:text-primary transition-colors">{BRAND.phone}</a>
          <a href={`mailto:${BRAND.email}`} className="block text-secondary font-medium underline hover:text-primary transition-colors">{BRAND.email}</a>
        </div>
      </div>
    </div>
    <div className="max-w-7xl mx-auto px-4 mt-8 pt-6 border-t border-white/5 text-center text-[10px] tracking-[0.5em] uppercase opacity-30 font-bold">
      © 2026 {BRAND.fullName}. All rights reserved. Professional comfort since 2011.
    </div>
  </footer>
)
const AboutPage = () => (
  <div className="pt-20">
    {/* Page Hero - Aligned with Service Pages */}
    <section className="relative py-14 md:py-20 lg:py-24 overflow-hidden bg-[#F9F9F9]">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 -skew-x-12 translate-x-1/4 -z-10 blur-3xl opacity-30" />
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="inline-flex items-center gap-3 text-secondary font-bold mb-6 uppercase tracking-[0.2em] text-[13px] bg-secondary/10 px-4 py-2 rounded-full">
            <CheckCircle size={16} />
            Our Legacy
          </div>
          <h1 className="text-[32px] md:text-[48px] lg:text-[72px] font-heading font-bold text-text mb-8 leading-[1.1]">
            Mastering Automotive <br/><span className="text-secondary">Performance</span> Since 2011
          </h1>
          <p className="text-xl text-text/60 mb-10 leading-relaxed max-w-xl">
            {BRAND.name} started with a simple belief: every driver in {BRAND.location} deserves elite mechanical service without the guesswork. Over a decade later, that precision remains our driving force.
          </p>
          <button className="btn-primary px-10 py-5 text-lg">Schedule Your Visit</button>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative overflow-hidden rounded-3xl shadow-xl shadow-slate-200"
        >
          <img 
            src="/about_hero_cinematic.png" 
            alt="Elite Auto Repair Facility" 
            className="w-full h-auto"
          />
        </motion.div>
      </div>
    </section>

    {/* Story Section - Flipped for better flow */}
    <section className="py-14 md:py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative rounded-[40px] overflow-hidden shadow-2xl order-2 lg:order-1"
        >
          <img 
            src="/about_garage.png" 
            alt="Our Master Tech at work" 
            className="w-full h-auto"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-8 text-xl text-text/70 leading-relaxed order-1 lg:order-2"
        >
          <SectionHeader 
            icon={Star} 
            subtitle="The Journey" 
            title="Rooted in Community" 
            align="center"
            mb="8"
          />
          <p>
            When we first opened our doors in 2011, we noticed a recurring theme among car owners: they were tired of mechanics who provided vague estimates or didn't explain the logic behind a repair. We decided to build a shop that prioritized technical transparency and clinical precision.
          </p>
          <p>
            Today, {BRAND.fullName} is recognized as a leader in premium automotive repair across the {BRAND.location} area. We've stayed dedicated to the craft, growing skilled enough to handle the most complex telemetry and mechanical challenges of modern vehicles.
          </p>
          <p>
            Our team members aren't just mechanics; they're automotive engineers who take pride in restoring your vehicle's factory response. We specialize in precision diagnostics, high-performance drivetrain optimization, and digital health monitoring.
          </p>
        </motion.div>
      </div>
    </section>

    {/* Mission & Values */}
    <section className="py-14 md:py-20 lg:py-24 bg-[#F9F9F9]">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeader 
          icon={ShieldCheck} 
          subtitle="Our Foundation" 
          title="The Values That Guide Us" 
          centered
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            { title: 'Integrity First', desc: 'We only recommend the work your vehicle actually needs. No unnecessary upsells—just honest, performance-driven advice for your car.' },
            { title: 'Technical Mastery', desc: 'Our mechanics undergo rigorous continuous training to stay at the absolute forefront of modern automotive technology.' },
            { title: 'Precision Care', desc: 'Serving our neighbors in Irvine isn\'t just business; it\'s about keeping our community moving safely and efficiently.' }
          ].map((val, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="bg-white p-12 rounded-[50px] shadow-xl shadow-slate-200/50 border border-slate-50"
            >
              <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center text-primary mb-8">
                <CheckCircle size={32} />
              </div>
              <h3 className="text-2xl font-bold text-text mb-4">{val.title}</h3>
              <p className="text-text/60 leading-relaxed">{val.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Final CTA - Updated */}
    <section className="py-14 md:py-20 lg:py-24">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-heading font-bold text-text mb-8">Ready to experience the {BRAND.name} difference?</h2>
        <div className="flex flex-wrap justify-center gap-6">
          <Link to="/contact" className="btn-primary px-10 py-5 text-lg">Get Your Free Quote</Link>
          <a href={`tel:${BRAND.phone}`} className="btn-secondary px-10 py-5 text-lg flex items-center gap-3">
            <Phone size={20} />
            Call Us
          </a>
        </div>
      </div>
    </section>
  </div>
)

const ContactPage = () => (
  <div className="pt-20">
    <section className="relative py-14 md:py-20 lg:py-24 overflow-hidden bg-[#F9F9F9]">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 -skew-x-12 translate-x-1/4 -z-10 blur-3xl opacity-30" />
      <div className="max-w-7xl mx-auto px-4">

        {/* Headline always first — above the 2-col grid */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-12"
        >
          <div className="inline-flex items-center gap-3 text-secondary font-bold mb-6 uppercase tracking-[0.2em] text-[13px] bg-secondary/10 px-4 py-2 rounded-full">
            <MessageSquare size={16} />
            Contact Us
          </div>
          <h1 className="text-[32px] md:text-[48px] lg:text-[72px] font-heading font-bold text-text mb-4 leading-[1.1]">
            Get Your <span className="text-secondary">Free Quote</span> Today
          </h1>
          <p className="text-xl text-text/60 leading-relaxed max-w-xl">
            Ready to restore your vehicle's peak performance? Fill out the form or give us a call. Our master technicians are ready to help.
          </p>
        </motion.div>

        {/* 2-col grid: form first in DOM (mobile), contact info second in DOM (mobile) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Form: first on mobile, right on desktop */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-10 md:p-12 rounded-[40px] shadow-2xl shadow-slate-200 border border-slate-50 lg:order-last"
          >
            <form className="space-y-6" onSubmit={(e: React.FormEvent) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-text/60 px-2 uppercase tracking-wider">Full Name</label>
                  <input type="text" placeholder="John Doe" className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-transparent focus:bg-white focus:border-primary/20 focus:ring-4 focus:ring-primary/5 transition-all text-text outline-none" required />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-text/60 px-2 uppercase tracking-wider">Phone Number</label>
                  <input type="tel" placeholder="(800) 000-0000" className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-transparent focus:bg-white focus:border-primary/20 focus:ring-4 focus:ring-primary/5 transition-all text-text outline-none" required />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-text/60 px-2 uppercase tracking-wider">Email Address</label>
                  <input type="email" placeholder="john@example.com" className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-transparent focus:bg-white focus:border-primary/20 focus:ring-4 focus:ring-primary/5 transition-all text-text outline-none" required />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-text/60 px-2 uppercase tracking-wider">Your City</label>
                  <input type="text" placeholder="New York" className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-transparent focus:bg-white focus:border-primary/20 focus:ring-4 focus:ring-primary/5 transition-all text-text outline-none" required />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-text/60 px-2 uppercase tracking-wider">Service Needed</label>
                <select className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-transparent focus:bg-white focus:border-primary/20 focus:ring-4 focus:ring-primary/5 transition-all text-text outline-none appearance-none">
                  <option>Mechanical Repair</option>
                  <option>Advanced Diagnostics</option>
                  <option>Engine Service</option>
                  <option>Transmission Work</option>
                  <option>Brake Performance</option>
                  <option>Scheduled Maintenance</option>
                  <option>Other / Not Sure</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-text/60 px-2 uppercase tracking-wider">Your Message</label>
                <textarea placeholder="How can we help you?" rows={4} className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-transparent focus:bg-white focus:border-primary/20 focus:ring-4 focus:ring-primary/5 transition-all text-text outline-none resize-none" />
              </div>
              <button type="submit" className="w-full btn-primary py-6 text-xl flex items-center justify-center gap-3 active:scale-95 transition-transform">
                <Send size={20} />
                Submit My Request
              </button>
            </form>
          </motion.div>

          {/* Contact info: second on mobile, left on desktop */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8 lg:order-first"
          >
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-white shadow-lg flex items-center justify-center text-primary border border-slate-50">
                <Phone size={24} />
              </div>
              <div>
                <p className="text-text/40 font-bold uppercase tracking-wider text-xs mb-1">Call Us Anywhere</p>
                <a href={`tel:${BRAND.phone}`} className="text-2xl font-bold text-text hover:text-primary transition-colors">{BRAND.phone}</a>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-white shadow-lg flex items-center justify-center text-primary border border-slate-50">
                <Mail size={24} />
              </div>
              <div>
                <p className="text-text/40 font-bold uppercase tracking-wider text-xs mb-1">Email Our Team</p>
                <p className="text-2xl font-bold text-text">{BRAND.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-white shadow-lg flex items-center justify-center text-primary border border-slate-50">
                <Clock size={24} />
              </div>
              <div>
                <p className="text-text/40 font-bold uppercase tracking-wider text-xs mb-1">Service Hours</p>
                <p className="text-2xl font-bold text-text">Mon - Sat: 8am - 6pm</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  </div>
)


const HomePage = () => {
  const [activeTab, setActiveTab] = useState('Vision')
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-28 md:pt-36 pb-14 md:pb-20 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 -skew-x-12 translate-x-1/4 -z-10 blur-3xl opacity-30 select-none pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-3 text-secondary font-bold mb-6 uppercase tracking-[0.2em] text-[13px] bg-secondary/10 px-4 py-2 rounded-full">
              <Car size={16} />
              Elite Automotive Engineering
            </div>
            <h1 className="text-[48px] md:text-[64px] font-heading font-bold text-text mb-6 leading-[1.05] tracking-tight">
              Precision <br/><span className="text-secondary">Repair & Performance</span> <br/>for Every Drive
            </h1>
            <p className="text-lg md:text-xl text-text/60 mb-10 max-w-xl leading-relaxed">
              Professional automotive solutions for {BRAND.location}. From rapid diagnostics to complex performance tuning, we keep your machine perfect on every road.
            </p>
            <div className="flex flex-wrap gap-4 items-center">
              <a 
                href="#services" 
              className="btn-primary px-8 py-4 text-lg shadow-xl shadow-cta/20 whitespace-nowrap"
              >
                Explore Our Services
              </a>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative overflow-hidden rounded-[40px] shadow-2xl"
          >
            <img 
              src="/homepage_hero.png" 
              alt="Professional HVAC Technician" 
              className="w-full h-auto"
            />
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-14 md:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text first in DOM → appears first on mobile. Image uses lg:order-first to go left on desktop. */}
          <div>
            <SectionHeader 
              icon={CheckCircle} 
              subtitle="About Our Shop" 
              title="Better Parts. Better Service. Better Drive." 
            />
            <p className="text-lg text-text/70 mb-10 leading-relaxed">
              We help drivers solve mechanical and performance issues with practical service that improves reliability, engine health, and day-to-day driving. From engine repair to seasonal maintenance, we focus on what makes your machine feel powerful again.
            </p>

            <div className="bg-white rounded-[40px] p-10 shadow-2xl shadow-black/5/50 border border-slate-50">
              <div className="flex gap-8 border-b border-slate-50 mb-8">
                {['Mission', 'Vision', 'Values'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={cn(
                      "pb-6 text-lg font-bold transition-all relative",
                      activeTab === tab ? "text-primary border-b-2 border-primary" : "text-text/30 hover:text-text/60"
                    )}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <div className="min-h-[140px] flex items-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="w-full"
                  >
                    {activeTab === 'Mission' && (
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <li className="flex items-center gap-4 text-text/80 font-medium"><div className="bg-cta/10 p-1 rounded-full"><CheckCircle className="text-cta" size={20} /></div> Restore Performance</li>
                        <li className="flex items-center gap-4 text-text/80 font-medium"><div className="bg-cta/10 p-1 rounded-full"><CheckCircle className="text-cta" size={20} /></div> Precise Diagnostics</li>
                        <li className="flex items-center gap-4 text-text/80 font-medium"><div className="bg-cta/10 p-1 rounded-full"><CheckCircle className="text-cta" size={20} /></div> Minimize Friction</li>
                        <li className="flex items-center gap-4 text-text/80 font-medium"><div className="bg-cta/10 p-1 rounded-full"><CheckCircle className="text-cta" size={20} /></div> Enhance Reliability</li>
                      </ul>
                    )}
                    {activeTab === 'Vision' && (
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <li className="flex items-center gap-4 text-text/80 font-medium"><div className="bg-cta/10 p-1 rounded-full"><CheckCircle className="text-cta" size={20} /></div> Smoother Engine Cycle</li>
                        <li className="flex items-center gap-4 text-text/80 font-medium"><div className="bg-cta/10 p-1 rounded-full"><CheckCircle className="text-cta" size={20} /></div> Optimal Gear Shifting</li>
                        <li className="flex items-center gap-4 text-text/80 font-medium"><div className="bg-cta/10 p-1 rounded-full"><CheckCircle className="text-cta" size={20} /></div> No Roadside Surprises</li>
                        <li className="flex items-center gap-4 text-text/80 font-medium"><div className="bg-cta/10 p-1 rounded-full"><CheckCircle className="text-cta" size={20} /></div> Informed Service Decisions</li>
                      </ul>
                    )}
                    {activeTab === 'Values' && (
                      <p className="text-text/70 italic text-lg leading-relaxed">
                        "Our values are built on mechanical integrity, engineering mastery, and transparent communication. We treat every vehicle with clinical respect and recommend only what's needed for safety and performance."
                      </p>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-6">
              <Link to="/about" className="btn-primary px-8 py-4 text-base whitespace-nowrap">Learn Our Story</Link>
              <div className="flex items-center gap-4 group cursor-pointer">
                <div className="w-12 h-12 bg-primary text-white rounded-xl flex items-center justify-center shadow-lg shadow-primary/30 group-hover:scale-110 transition-transform">
                  <Phone size={22} />
                </div>
                <div>
                  <div className="text-xs text-text/40 uppercase font-black tracking-widest mb-0.5">Call Today</div>
                  <a href={`tel:${BRAND.phone}`} className="font-bold text-text text-xl tracking-tight hover:text-primary transition-colors">{BRAND.phone}</a>
                </div>
              </div>
            </div>
          </div>

          {/* Image: after text in DOM = below text on mobile. lg:order-first makes it appear left on desktop. */}
          <div className="relative overflow-hidden rounded-3xl shadow-xl lg:order-first">
            <img 
              src="/about_garage.png" 
              alt="Precision Garage Equipment" 
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>


      {/* Services Section */}
      <section id="services" className="py-14 md:py-20 lg:py-24 bg-[#F9F9F9] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-white to-transparent" />
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <SectionHeader 
            icon={Gauge} 
            subtitle="Our Services" 
            title="Elite Automotive Solutions" 
            centered
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {services.map((service, i) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group p-10 rounded-[40px] bg-white border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-primary/10 transition-all hover:-translate-y-2"
              >
                <div className="w-20 h-20 bg-primary/5 rounded-3xl flex items-center justify-center text-primary mb-10 group-hover:bg-primary group-hover:text-white transition-all shadow-inner">
                  <service.icon size={36} />
                </div>
                <h3 className="text-3xl font-heading font-bold text-text mb-6">{service.title}</h3>
                <p className="text-text/60 mb-10 leading-relaxed text-lg">{service.description}</p>
                <Link 
                  to={service.link} 
                  className="inline-flex items-center gap-3 font-black text-secondary uppercase tracking-widest text-sm hover:gap-5 transition-all"
                >
                  Learn More <ArrowRight size={18} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-14 md:py-20 lg:py-24 bg-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/wp-content/uploads/2024/11/why_chose_us_bg_1.jpg')] bg-cover bg-center mix-blend-overlay opacity-20" />
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
          <div className="text-white">
            <SectionHeader 
              icon={ShieldCheck} 
              subtitle="Quality Standards" 
              title="Why Choose Us?" 
              light
            />
            <p className="text-xl text-white/80 mb-8 max-w-xl leading-relaxed">
              When it comes to your vehicle, you want a team that's reliable, technically advanced, and obsessed with precision.
            </p>
            <div className="w-full h-px bg-secondary/50 mb-10" />
            
            <p className="text-white/70 mb-10 leading-relaxed max-w-xl">
              We provide proactive service with our licensed and insured professionals. Using the latest tools and techniques, we deliver top-notch results that last. With transparent pricing and a focus on satisfaction, we ensure a seamless experience.
            </p>

            <ul className="space-y-6 mb-12">
              {[
                'Experienced, licensed, and certified technicians',
                '24/7 emergency service availability',
                'Upfront pricing with no hidden fees',
                '100% satisfaction guarantee on all work'
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-4 text-lg font-medium">
                  <div className="w-3 h-3 bg-secondary rounded-full" />
                  {item}
                </li>
              ))}
            </ul>

            <button className="btn-primary px-10 py-5 text-lg">
              Request Service
            </button>
          </div>
          <div className="relative">
            <div className="absolute -inset-10 bg-white/5 rounded-[60px] blur-3xl -z-10" />
            <img 
              src="/why_choose_us.png" 
              alt="Advanced Diagnostic Bay" 
              className="w-full h-auto drop-shadow-3xl rounded-[40px]" 
            />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-14 md:py-20 lg:py-24 bg-background relative">
        <div className="max-w-7xl mx-auto px-4 relative">
          <SectionHeader 
            icon={MessageSquare} 
            subtitle="Customer Stories" 
            title="What Our Drivers Are Saying" 
            centered
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white p-12 rounded-[50px] shadow-2xl shadow-black/5/30 border border-slate-50 relative group">
                <div className="absolute top-10 right-10 text-secondary opacity-5 group-hover:opacity-20 transition-opacity">
                  <Quote size={80} />
                </div>
                <div className="flex gap-1 mb-8">
                  {[...Array(5)].map((_, star) => <Star key={star} size={16} fill="#FFD700" color="#FFD700" />)}
                </div>
                <p className="text-text/70 text-lg italic leading-relaxed mb-10 relative z-10">"{t.content}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center text-primary font-bold text-xl uppercase">
                    {t.name[0]}
                  </div>
                  <div>
                    <h5 className="font-bold text-text text-lg">{t.name}</h5>
                    <p className="text-sm text-text/40 font-bold uppercase tracking-widest">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-14 md:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-start">
          <div className="lg:sticky lg:top-40">
            <SectionHeader 
              icon={Phone} 
              subtitle="Expert Answers" 
              title="Frequently Asked Automotive Questions" 
              description="Can't find what you're looking for? Reach out to our master technicians for immediate assistance."
            />

          </div>
          
          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-slate-50 rounded-[30px] overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-slate-50/50">
                <button 
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-8 text-left bg-white group"
                >
                  <span className="text-xl font-bold text-text group-hover:text-primary transition-colors">{faq.question}</span>
                  <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300",
                    openFaq === i ? "bg-primary text-white rotate-180" : "bg-slate-50 text-slate-300"
                  )}>
                    <ChevronDown size={24} />
                  </div>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="p-8 pt-0 text-text/60 text-lg leading-relaxed border-t border-slate-100/50">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-14 md:py-20 lg:py-24 bg-[#F9F9F9]">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader 
            icon={Settings} 
            subtitle="Our Workflow" 
            title="A Simple Process From First Call to Finished Service" 
            centered
          />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative">
            {/* Connector Line */}
            <div className="hidden lg:block absolute top-[60px] left-[10%] right-[10%] h-1 border-t-2 border-dashed border-slate-100 -z-0" />
            
            {steps.map((step, i) => (
              <div key={i} className="relative z-10 text-center">
                <div className="w-24 h-24 rounded-[30px] bg-white shadow-xl shadow-black/5 flex items-center justify-center text-3xl font-black text-primary mb-10 mx-auto border border-slate-50 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                  {i + 1}
                </div>
                <h4 className="text-2xl font-bold text-text mb-4">{step.title}</h4>
                <p className="text-base text-text/50 leading-relaxed px-2">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-14 md:py-20 lg:py-24">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="bg-primary rounded-[40px] md:rounded-[60px] lg:rounded-[80px] px-8 py-16 md:p-20 lg:p-24 text-white relative overflow-hidden shadow-[0_50px_100px_-20px_rgba(220,38,38,0.4)]">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent)] opacity-50" />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-heading font-bold mb-8 relative z-10 leading-[1.1]">Ready to restore <br className="hidden md:block"/>your performance?</h2>
            <p className="text-lg md:text-2xl text-white/80 mb-10 max-w-2xl mx-auto relative z-10 opacity-80 leading-relaxed font-medium">
              Join thousands of satisfied drivers who trust {BRAND.name} for their mechanical and performance needs.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 sm:gap-8 relative z-10 px-2">
              <Link to="/contact" className="bg-white text-primary px-8 py-4 md:px-12 md:py-6 rounded-2xl md:rounded-3xl font-bold text-lg md:text-2xl hover:bg-opacity-95 transition-all shadow-2xl hover:scale-105 transform whitespace-nowrap">
                Get Your Free Quote
              </Link>
              <a href={`tel:${BRAND.phone}`} className="bg-cta text-white px-8 py-4 md:px-12 md:py-6 rounded-2xl md:rounded-3xl font-bold text-lg md:text-2xl hover:opacity-90 transition-all whitespace-nowrap shadow-lg shadow-cta/30">
                Call {BRAND.phone}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

const ServicePage = () => {
  const { id } = useParams()
  const service = services.find(s => (s as any).id === id) as any

  if (!service) return <div className="pt-40 text-center">Service not found</div>

  return (
    <div className="pt-20">
      <section className="relative py-14 md:py-20 lg:py-24 overflow-hidden bg-[#F9F9F9]">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 -skew-x-12 translate-x-1/4 -z-10 blur-3xl opacity-30" />
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="inline-flex items-center gap-3 text-secondary font-bold mb-6 uppercase tracking-[0.2em] text-[13px] bg-secondary/10 px-4 py-2 rounded-full">
              <service.icon size={16} />
              Premium Service
            </div>
            <h1 className="text-[32px] md:text-[48px] lg:text-[72px] font-heading font-bold text-text mb-8 leading-[1.1]">
              Professional <br/><span className="text-secondary">{service.title}</span>
            </h1>
            <p className="text-xl text-text/60 mb-10 leading-relaxed max-w-xl">
              {service.description} We bring years of master-grade expertise to ensure your vehicle remains reliable, high-performing, and safe for every mile ahead.
            </p>
            <Link to="/contact" className="btn-primary px-10 py-5 text-lg">Request This Service</Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative overflow-hidden rounded-3xl shadow-xl"
          >
             <img 
              src={service.image} 
              alt={service.title} 
              className="w-full h-auto"
            />
          </motion.div>
        </div>
      </section>

      {/* Main Content / SEO Paragraphs */}
      <section className="py-14 md:py-18 lg:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <SectionHeader 
            icon={Gauge} 
            subtitle="Overview" 
            title={`Expert ${service.title} in ${BRAND.location}`} 
          />
          <div className="space-y-8 text-xl text-text/70 leading-relaxed">
            {service.longDescription.map((para: string, i: number) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </div>
      </section>


      <section className="py-14 md:py-18 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { title: 'Optimal Performance', desc: 'Maximize your engine\'s output and fuel efficiency with precision tuning and high-quality parts.' },
              { title: 'Engine Longevity', desc: 'Protect your vehicle\'s core with advanced filtration and technical maintenance that prevents costly future repairs.' },
              { title: 'Precision Safety', desc: 'Expert brake, suspension, and steering service to ensure total control and reliability on every journey.' }
            ].map((benefit, i) => (
              <div key={i} className="text-center p-8 rounded-[40px] bg-slate-50/50 border border-slate-100 hover:border-primary/20 transition-all group">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Star size={32} />
                </div>
                <h3 className="text-2xl font-bold text-text mb-4">{benefit.title}</h3>
                <p className="text-text/60 leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <SectionHeader 
              icon={CheckCircle} 
              subtitle="What's Included" 
              title="A Complete Solution" 
            />
            <div className="space-y-6">
              {[
                'Full vehicle diagnostic and performance analysis',
                'Precision mechanical repair and expert installation',
                'Fuel system and drivetrain optimization',
                'Comprehensive safety and multi-point inspection',
                'Professional advice on long-term vehicle health',
                'Clean and master-grade service environment'
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-50 transition-all hover:shadow-md hover:border-primary/20 group">
                  <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-colors">
                    <CheckCircle size={18} />
                  </div>
                  <span className="text-lg font-medium text-text/80">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-primary text-white p-8 md:p-12 lg:p-20 rounded-[40px] md:rounded-[60px] lg:rounded-[80px] relative overflow-hidden flex flex-col justify-center">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-6 leading-tight">Need immediate assistance?</h2>
            <p className="text-base md:text-xl text-white/70 mb-8 leading-relaxed font-medium">
              Our technicians are on standby to help you with your {service.title.toLowerCase()} needs. Experience the {BRAND.name} difference today.
            </p>
            <div className="flex flex-col gap-4">
              <a href={`tel:${BRAND.phone}`} className="bg-cta text-white px-8 py-4 rounded-2xl font-bold text-base md:text-xl hover:opacity-90 transition-all text-center whitespace-nowrap">
                Call {BRAND.phone}
              </a>
              <Link to="/contact" className="bg-white/10 border border-white/20 text-white px-8 py-4 rounded-2xl font-bold text-base md:text-xl hover:bg-white/20 transition-all text-center backdrop-blur-md whitespace-nowrap">
                Get a Custom Quote
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

const LocationPage = () => {
  const { id } = useParams()
  const location = locations.find(l => l.id === id)

  if (!location) return <div className="pt-40 text-center text-2xl font-bold">Location not found</div>

  return (
    <div className="pt-20">
      <section className="py-14 md:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          {/* Page Header */}
          <div className="max-w-3xl mx-auto text-center mb-8 px-4">
            <h1 className="text-[32px] md:text-[48px] lg:text-[64px] font-heading font-bold text-text mb-4 leading-[1.1]">
              {location.heroTitle}
            </h1>
            <p className="text-xl text-text/60 font-medium">
              Reliable Solutions Tailored to Your Needs
            </p>
          </div>

          {/* Map shown first on mobile for immediate visual */}
          <div className="max-w-3xl mx-auto mb-12 px-4">
            <div className="relative px-4 py-4 border-[6px] border-primary/5 rounded-[32px] bg-white shadow-xl shadow-black/10">
              <img
                src={location.mapImage}
                alt={`Service Area in ${location.name}`}
                className="w-full h-auto rounded-[24px] drop-shadow-md"
              />
            </div>
            <p className="text-center text-sm text-text/40 font-bold uppercase tracking-widest mt-4">
              Our Service Coverage — {location.name}, CA
            </p>
          </div>

          {/* Two-Column: Text + Checklist */}
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start px-4">
            {/* Left: Description */}
            <div>
              <p className="text-lg text-text/70 leading-relaxed">
                {location.description}
              </p>
            </div>

            {/* Right: Checklist */}
            <div className="bg-slate-50 rounded-[32px] p-8 md:p-10">
              <h2 className="text-xl font-heading font-bold text-text mb-6">
                Why Choose Our Services in {location.name}?
              </h2>
              <ul className="space-y-4">
                {[
                  'A trusted name with years of local service experience',
                  'Affordable pricing and flexible service options',
                  'A smooth and efficient service process',
                  'A team that values customer satisfaction above all else',
                  'A reputation for delivering excellence and reliability'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-base text-text/70">
                    <CheckCircle className="text-secondary shrink-0 mt-1" size={20} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Re-use Final CTA section from HomePage here if desired */}
      <section className="py-14 md:py-20 lg:py-24 bg-background">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="bg-primary rounded-[40px] md:rounded-[60px] lg:rounded-[80px] px-8 py-16 md:p-20 lg:p-24 text-white relative overflow-hidden shadow-[0_50px_100px_-20px_rgba(220,38,38,0.4)]">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent)] opacity-50" />
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold mb-8 relative z-10 leading-[1.1]">Ready to restore your performance in {location.name}?</h2>
            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 sm:gap-8 relative z-10 px-2">
              <Link to="/contact" className="bg-white text-primary px-8 py-4 md:px-12 md:py-6 rounded-2xl md:rounded-3xl font-bold text-lg md:text-2xl hover:bg-opacity-95 transition-all shadow-2xl transform active:scale-95 whitespace-nowrap">
                Get Your Free Quote
              </Link>
              <a href={`tel:${BRAND.phone}`} className="bg-cta text-white px-8 py-4 md:px-12 md:py-6 rounded-2xl md:rounded-3xl font-bold text-lg md:text-2xl hover:opacity-90 transition-all whitespace-nowrap shadow-lg shadow-cta/30">
                Call {BRAND.phone}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default function App() {
  return (
    <div className="min-h-screen selection:bg-primary selection:text-white">
      <ScrollToTop />
      <Nav />
      
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services/:id" element={<ServicePage />} />
          <Route path="/locations/:id" element={<LocationPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}
