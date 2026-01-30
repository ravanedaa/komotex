"use client"

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { easeOut, motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Check, ChevronLeft, ChevronRight, Menu, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 1.2, ease: easeOut }
}

const staggerContainer = {
  initial: {},
  whileInView: {
    transition: {
      staggerChildren: 0.2
    }
  }
}

const wordVariants = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: easeOut }
}

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const heroRef = useRef<HTMLElement>(null)

  // Parallax effect for hero camisa
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })
  
  const camisaY = useTransform(scrollYProgress, [0, 1], [0, -400])

  // Handle scroll for header styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Início', href: '#home' },
    { name: 'Sobre', href: '#sobre' },
    { name: 'Diferenciais', href: '#diferenciais' },
    { name: 'Produtos', href: '#produtos' },
  ]

  // Carousel Component
  function CarouselSection() {
    const [currentSlide, setCurrentSlide] = useState(0)
    const images = ["/camisa.png", "/camisa2.png", "/camisa3.png", "/camisa3.png"]

    const nextSlide = () => {
      setCurrentSlide((prev) => (prev + 1) % images.length)
    }

    const prevSlide = () => {
      setCurrentSlide((prev) => (prev - 1 + images.length) % images.length)
    }

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4 }}
        className="relative w-full max-w-2xl mx-auto aspect-square rounded-3xl overflow-hidden shadow-2xl bg-gray-100"
      >
        {/* Image Container */}
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="w-full h-full"
        >
          <Image
            src={images[currentSlide]}
            alt={`Uniforme ${currentSlide + 1}`}
            fill
            className="object-cover"
            sizes="100vw"
          />
        </motion.div>

        {/* Left Arrow */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg transition-all hover:scale-110"
        >
          <ChevronLeft size={24} className="text-black" />
        </button>

        {/* Right Arrow */}
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg transition-all hover:scale-110"
        >
          <ChevronRight size={24} className="text-black" />
        </button>

        {/* Navigation Dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={cn(
                "w-3 h-3 rounded-full transition-all shadow-lg",
                currentSlide === idx ? "bg-white" : "bg-white/50 hover:bg-white"
              )}
            />
          ))}
        </div>
      </motion.div>
    )
  }


  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      
      {/* Header */}
      <header 
        className={cn(
          "fixed top-0 w-full z-50 transition-all duration-300",
          scrolled ? "bg-white/90 backdrop-blur-md shadow-sm py-4" : "bg-transparent py-6"
        )}
      >
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          <Link href="/" className="font-bold text-2xl tracking-tighter">
            komotex<span className="text-black">.</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                className="text-sm font-medium hover:text-gray-600 transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {link.name}
              </Link>
            ))}
            <Button className="rounded-full px-6 bg-gradient-to-r from-[#041723] to-[#08455b] hover:from-[#03111a] hover:to-[#06354a] font-unbounded">
              Entrar em contato
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-full left-0 w-full bg-white shadow-lg md:hidden p-6 flex flex-col gap-4"
          >
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                className="text-lg font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Button className="w-full mt-2 bg-linear-to-r from-[#041723] to-[#08455b] hover:from-[#03111a] hover:to-[#06354a] font-unbounded">
              Entrar em contato
            </Button>
          </motion.div>
        )}
      </header>
      
      <main className="flex-1">
        
        {/* Hero Section */}
        <section ref={heroRef} id="home" className="relative min-h-screen pt-32 pb-0 flex items-center justify-center bg-white overflow-hidden">
          {/* Gradient Fade - Circular - Half visible */}
          <div className="absolute -top-1/2 left-1/2 -translate-x-1/2 size-275 bg-linear-to-b from-[#041723] via-[#08455b] to-transparent rounded-full opacity-10 pointer-events-none z-10 blur-3xl"></div>
          
          <div className="container mx-auto px-4 md:px-6 text-center relative z-20">
            
            <div className="max-w-4xl mx-auto">
              <h1 className="text-6xl md:text-8xl tracking-tighter leading-[1.05] mb-8">
                <motion.span
                  initial={{ opacity: 0, backdropFilter: 'blur(30px)' }}
                  whileInView={{ opacity: 1, y: 0, backdropFilter: 'blur(0px)' }}
                  viewport={{ once: true }}
                  transition={{ duration: 2, ease: easeOut }}
                  className="inline-block mr-4 bg-linear-to-r from-[#041723] to-[#08455b] bg-clip-text text-transparent"
                >
                  Vista sua marca com qualidade
                </motion.span>
              </h1>
              
              <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
                Uniformes corporativos que fortalecem a identidade da sua empresa e transmitem profissionalismo em cada detalhe.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20">
                <Button size="lg" className="rounded-full text-lg px-8 py-6 bg-linear-to-r from-[#041723] to-[#08455b] hover:from-[#03111a] hover:to-[#06354a] text-white font-unbounded">
                  Entrar em contato <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <div className="bg-gray-100 border border-gray-200 text-gray-800 px-6 py-3 rounded-full font-medium inline-flex items-center justify-center">
                  <span className="text-black font-bold mr-2">20% OFF</span> no primeiro pedido
                </div>
              </div>
            </div>
          </div>

          {/* Parallax T-shirt - Absolute */}
          <motion.div 
            style={{ y: camisaY }}
            className="absolute -bottom-120 md:-bottom-200 left-1/2 -translate-x-1/2 size-150 md:size-275 pointer-events-none z-40"
          >
            <Image
              src="/hero-tshirt.png"
              alt="Camiseta Komotex preta"
              fill
              className="object-contain"
              priority
              sizes="1000px"
            />
          </motion.div>
        </section>

        {/* Scrolling Promo Banner */}
        <section className="py-4 bg-black overflow-hidden">
          <div className="relative flex whitespace-nowrap">
            <motion.div
              animate={{ x: [0, -1000] }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 20,
                  ease: "linear",
                },
              }}
              className="flex gap-8 items-center"
            >
              {[...Array(10)].map((_, i) => (
                <div key={i} className="flex items-center gap-8">
                  <span className="text-white font-bold text-lg tracking-tight">
                    20% OFF NO PRIMEIRO PEDIDO
                  </span>
                  <span className="text-white/40">•</span>
                  <span className="text-white font-bold text-lg tracking-tight">
                    PEDIDOS A PARTIR DE 30 PEÇAS
                  </span>
                  <span className="text-white/40">•</span>
                  <span className="text-white font-bold text-lg tracking-tight">
                    ENTREGA PARA TODO BRASIL
                  </span>
                  <span className="text-white/40">•</span>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Value Proposition Section */}
        <section id="sobre" className="py-24 bg-white relative">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <motion.div 
                {...fadeInUp}
                transition={{ duration: 0.8 }}
                className="relative h-125 md:h-175 rounded-2xl overflow-hidden"
              >
                  <Image
                    src="/camisa2.png" 
                    alt="Tecido tecnológico Komotex flutuando"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-700"
                  />
              </motion.div>
              
              <motion.div 
                initial="initial"
                whileInView="whileInView"
                viewport={{ once: true }}
                variants={staggerContainer}
              >
                <div className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-black uppercase bg-gray-100 rounded-full">
                  Qualidade Premium
                </div>
                <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-bold mb-6 leading-tight tracking-tighter">
                  Uniforme inteligente <br />
                  <span className="text-black">começa no tecido.</span>
                </motion.h2>
                
                <motion.p variants={fadeInUp} className="text-lg text-gray-600 mb-6">
                  Vista sua marca com qualidade. Nossas peças são desenvolvidas com tecnologia têxtil avançada para garantir durabilidade, conforto e uma apresentação impecável para sua equipe.
                </motion.p>
                
                <motion.p variants={fadeInUp} className="text-lg text-gray-600 mb-8">
                  Uniformes fortalecem a identidade da sua marca e transformam seus colaboradores em embaixadores visuais da empresa.
                </motion.p>

                <motion.ul variants={staggerContainer} className="space-y-4">
                  {["Tecido respirável", "Alta durabilidade", "Modelagem exclusiva", "Personalização premium"].map((item) => (
                    <motion.li key={item} variants={fadeInUp} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center text-white">
                        <Check size={14} />
                      </div>
                      <span className="font-medium">{item}</span>
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Feature/Showcase Section */}
        <section id="produtos" className="py-24 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div 
              {...fadeInUp}
              className="text-center max-w-2xl mx-auto mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tighter">Soluções Personalizadas</h2>
              <p className="text-gray-600">Elegância e conforto em cada detalhe. Conheça nossas linhas.</p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
               {/* Card 1 */}
               <motion.div 
                  whileHover={{ y: -10 }}
                  className="group relative bg-white rounded-xl overflow-hidden shadow-sm h-[500px]"
                >
                  <div className="absolute inset-0 bg-gray-200">
                    <Image
                      src="/camisa3.png"
                      alt="Detalhe de manga oversized"
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-80" />
                  </div>
                  <div className="absolute bottom-0 p-8 text-white w-full">
                    <h3 className="text-2xl font-bold mb-2 tracking-tighter">Oversized Basic</h3>
                    <p className="opacity-90 mb-4 text-sm text-gray-200">Corte moderno e confortável para o dia a dia corporativo.</p>
                    <div className="flex items-center text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                      Ver detalhes <ArrowRight size={16} className="ml-2" />
                    </div>
                  </div>
               </motion.div>
                
                 {/* Card 2 */}
               <motion.div 
                  whileHover={{ y: -10 }}
                  className="group relative bg-white rounded-xl overflow-hidden shadow-sm h-[500px]"
                >
                  <div className="absolute inset-0 bg-gray-900">
                    <Image
                      src="/camisa2.png"
                      alt="Camiseta Executive Line"
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                  </div>
                   <div className="absolute bottom-0 p-8 text-white w-full">
                    <h3 className="text-2xl font-bold mb-2 tracking-tighter">Executive Line</h3>
                    <p className="opacity-90 mb-4 text-sm text-gray-200">Sofisticação para lideranças e times comerciais.</p>
                    <div className="flex items-center text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                      Ver detalhes <ArrowRight size={16} className="ml-2" />
                    </div>
                  </div>
               </motion.div>

                 {/* Card 3 */}
               <motion.div 
                  whileHover={{ y: -10 }}
                  className="group relative bg-white rounded-xl overflow-hidden shadow-sm h-[500px]"
                >
                  <div className="absolute inset-0 bg-gray-900">
                     <Image
                      src="/camisa.png"
                      alt="Camiseta Tech Performance"
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                  </div>
                  <div className="absolute bottom-0 p-8 text-white w-full">
                    <h3 className="text-2xl font-bold mb-2 tracking-tighter">Tech Performance</h3>
                    <p className="opacity-90 mb-4 text-sm text-gray-200">Tecidos inteligentes que não precisam passar.</p>
                    <div className="flex items-center text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                      Ver detalhes <ArrowRight size={16} className="ml-2" />
                    </div>
                  </div>
               </motion.div>
            </div>
          </div>
        </section>

        {/* Carousel Section */}
        <section className="py-24 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6">

            {/* Carousel with State */}
            <CarouselSection />
          </div>
        </section>
        
        {/* Testimonials / Trust or Stats */}
        <section id="diferenciais" className="py-20 bg-black text-white">
           <div className="container mx-auto px-4 md:px-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-white/10">
                <div className="space-y-2 p-4">
                   <h3 className="text-4xl md:text-5xl font-bold tracking-tighter text-white">+500</h3>
                   <p className="text-white/80 font-medium">Empresas atendidas</p>
                </div>
                 <div className="space-y-2 p-4">
                   <h3 className="text-4xl md:text-5xl font-bold tracking-tighter text-white">100%</h3>
                   <p className="text-white/80 font-medium">Algodão sustentável</p>
                </div>
                 <div className="space-y-2 p-4">
                   <h3 className="text-4xl md:text-5xl font-bold tracking-tighter text-white">2026</h3>
                   <p className="text-white/80 font-medium">Coleção Future</p>
                </div>
                 <div className="space-y-2 p-4">
                   <h3 className="text-4xl md:text-5xl font-bold tracking-tighter text-white">BR</h3>
                   <p className="text-white/80 font-medium">Entrega nacional</p>
                </div>
              </div>
           </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="rounded-[2.5rem] p-10 md:p-24 text-center text-white overflow-hidden relative shadow-2xl">
              {/* Background Image */}
              <Image
                src="/backgroundFade.png"
                alt="Background"
                fill
                className="object-cover"
                quality={100}
              />
              {/* Dark overlay for text readability */}
              <div className="absolute inset-0 bg-black/40"></div>
              
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2 }}
                className="relative z-10 max-w-3xl mx-auto"
              >
                <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight tracking-tighter">Pronto para elevar o nível da sua marca?</h2>
                <p className="text-xl md:text-2xl text-gray-300 mb-12 font-light">
                  Solicite um orçamento personalizado hoje e garanta condições exclusivas para pedidos empresariais.
                </p>
                <div className="flex justify-center">
                  <Button size="lg" className="h-14 rounded-full bg-white text-gray-950 hover:bg-gray-100 text-lg px-8 font-bold transition-all hover:scale-105 font-unbounded">
                    Entrar em contato
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-50 py-12 border-t border-gray-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-2xl font-bold tracking-tighter">
              komotex<span className="text-black">.</span>
            </div>
            
            <div className="text-sm text-gray-500 text-center md:text-left">
              © 2026 KomoTex. Todos os direitos reservados. 
              <span className="hidden md:inline mx-2">|</span> 
              <span className="block md:inline mt-2 md:mt-0">Desenvolvido com excelência.</span>
            </div>
            
            <div className="flex gap-8">
               <a href="#" className="text-gray-500 hover:text-black transition-colors font-medium">Instagram</a>
               <a href="#" className="text-gray-500 hover:text-black transition-colors font-medium">LinkedIn</a>
               <a href="#" className="text-gray-500 hover:text-black transition-colors font-medium">WhatsApp</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
