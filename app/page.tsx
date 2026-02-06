"use client"

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { easeOut, motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Check, ChevronLeft, ChevronRight } from 'lucide-react'
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

export default function LandingPage() {
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

  // Carousel Component
  function CarouselSection() {
    const [currentSlide, setCurrentSlide] = useState(0)
    const [isLoading, setIsLoading] = useState(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const images = [
      "/assets/case01.jpeg",
      "/assets/case02.jpeg",
      "/assets/case03.jpeg",
      "/assets/case04.jpeg",
      "/assets/case05.jpeg",
      "/assets/case06.jpeg",
      "/assets/case07.jpeg"
    ]

    // Preload next image
    useEffect(() => {
      const nextIdx = (currentSlide + 1) % images.length
      if (typeof window !== 'undefined') {
        const link = document.createElement('link')
        link.rel = 'prefetch'
        link.as = 'image'
        link.href = images[nextIdx]
        document.head.appendChild(link)
      }
    }, [currentSlide, images])

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
        className="relative w-full max-w-xl mx-auto aspect-square rounded-3xl overflow-hidden shadow-2xl bg-gray-100"
      >
        {/* Skeleton Loader */}
        {isLoading && (
          <div className="absolute inset-0 bg-gray-300 animate-pulse z-10" />
        )}

          <Image
            src={images[currentSlide]}
            alt={`Case ${currentSlide + 1}`}
            fill
            className="object-cover"
            sizes="100vw"
            priority={currentSlide === 0}
            onLoadingComplete={() => setIsLoading(false)}
            onLoadStart={() => setIsLoading(true)}
          />

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
          "fixed top-0 w-full z-50 transition-all duration-300 py-6",
          scrolled ? "bg-white/90 backdrop-blur-md shadow-sm" : "bg-transparent"
        )}
      >
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image
              src="/assets/logoNoBackgroundBlack.png"
              alt="Komotex Logo"
              width={80}
              height={28}
              className="object-contain"
            />
          </Link>

          <Button className="rounded-full px-6 bg-linear-to-r from-[#041723] to-[#08455b] hover:from-[#03111a] hover:to-[#06354a] font-unbounded">
            Solicitar orçamento agora
          </Button>
        </div>
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
                  initial={{ opacity: 0, y:20 }}
                  whileInView={{ opacity: 1, y: 0,  }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: easeOut }}
                  className="inline-block mr-4 bg-linear-to-r from-[#041723] to-[#08455b] bg-clip-text text-transparent"
                >
                  Vista sua marca com qualidade
                </motion.span>
              </h1>
              
              <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
                Produção própria, tecidos duráveis e personalização completa para sua empresa.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20">
                <Button className="rounded-full text-lg px-8 py-6 bg-linear-to-r from-[#041723] to-[#08455b] hover:from-[#03111a] hover:to-[#06354a] text-white font-unbounded">
                  Solicitar orçamento agora <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>

          {/* Parallax T-shirt - Absolute */}
          <motion.div 
            style={{ y: camisaY }}
            className="absolute -bottom-120 md:-bottom-220 left-1/2 -translate-x-1/2 size-150 md:size-275 pointer-events-none z-40"
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
                    DESCONTO ESPECIAL + ORÇAMENTO EM ATÉ 24H
                  </span>
                  <span className="text-white/40">•</span>
                  <span className="text-white font-bold text-lg tracking-tight">
                    PRODUÇÃO RÁPIDA
                  </span>
                  <span className="text-white/40">•</span>
                  <span className="text-white font-bold text-lg tracking-tight">
                    ENTREGA NACIONAL
                  </span>
                  <span className="text-white/40">•</span>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Value Proposition Section */}
        <section id="sobre" className="py-24 bg-white relative">
          <div className="container mx-auto px-4 md:px-6 ">
            <div className="grid md:grid-cols-2 gap-16 items-center justify-center">
              <motion.div 
                {...fadeInUp}
                transition={{ duration: 0.8 }}
                className="relative aspect-square rounded-2xl overflow-hidden max-h-125 shadow-lg "
              >
                  <Image
                    src="/assets/showcase02.jpg" 
                    alt="Uniforme de qualidade Komotex"
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
              <p className="text-gray-600">Soluções de uniformes pensadas para diferentes rotinas de trabalho.<br />Escolha a linha ideal para a realidade da sua empresa.</p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
               {/* Card 1 */}
               <motion.div 
                  whileHover={{ y: -10 }}
                  className="group relative bg-white rounded-xl overflow-hidden shadow-sm h-125"
                >
                  <div className="absolute inset-0 bg-gray-200">
                    <Image
                      src="/assets/firstshirt.jpeg"
                      alt="Uniforme Profissional Operacional"
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-80" />
                  </div>
                  <div className="absolute bottom-0 p-8 text-white w-full">
                    <h3 className="text-2xl font-bold mb-2 tracking-tighter">Uniforme Profissional Operacional</h3>
                    <p className="opacity-90 mb-4 text-sm text-gray-200">Ideal para ambientes produtivos e equipes ativas.</p>
                    <div className="flex items-center text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                      Ver detalhes <ArrowRight size={16} className="ml-2" />
                    </div>
                  </div>
               </motion.div>
                
                 {/* Card 2 */}
               <motion.div 
                  whileHover={{ y: -10 }}
                  className="group relative bg-white rounded-xl overflow-hidden shadow-sm h-125"
                >
                  <div className="absolute inset-0 bg-gray-900">
                    <Image
                      src="/assets/showcase03.jpg"
                      alt="Camiseta Executive Line"
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                     <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-60" />
                  </div>
                   <div className="absolute bottom-0 p-8 text-white w-full">
                    <h3 className="text-2xl font-bold mb-2 tracking-tighter">Linha Executiva</h3>
                    <p className="opacity-90 mb-4 text-sm text-gray-200">Sofisticação para lideranças e times comerciais.</p>
                    <div className="flex items-center text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                      Ver detalhes <ArrowRight size={16} className="ml-2" />
                    </div>
                  </div>
               </motion.div>

                 {/* Card 3 */}
               <motion.div 
                  whileHover={{ y: -10 }}
                  className="group relative bg-white rounded-xl overflow-hidden shadow-sm h-125"
                >
                  <div className="absolute inset-0 bg-gray-900">
                     <Image
                      src="/assets/showcase01.jpg"
                      alt="Camiseta Tech Performance"
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                     <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-60" />
                  </div>
                  <div className="absolute bottom-0 p-8 text-white w-full">
                    <h3 className="text-2xl font-bold mb-2 tracking-tighter">Linha Básica</h3>
                    <p className="opacity-90 mb-4 text-sm text-gray-200">Tecidos inteligentes que não precisam passar.</p>
                    <div className="flex items-center text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                      Ver detalhes <ArrowRight size={16} className="ml-2" />
                    </div>
                  </div>
               </motion.div>
            </div>
          </div>
        </section>

        {/* Processes Section */}
        <section id="processos" className="py-24 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div 
              {...fadeInUp}
              className="text-center max-w-2xl mx-auto mb-16"
            >
              <div className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-black uppercase bg-gray-100 rounded-full">
                Tecnologia de Ponta
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tighter">Nossos Processos</h2>
              <p className="text-gray-600">Conheça as diferentes técnicas de personalização que elevam seus uniformes ao próximo nível.</p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Process 1 - Serigrafia */}
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="group bg-white rounded-2xl shadow-sm hover:shadow-lg flex flex-col"
              >
                <div className="p-8 flex-1">
                  <div className="w-12 h-12 rounded-lg bg-linear-to-br from-[#041723] to-[#08455b] flex items-center justify-center text-white font-bold text-xl mb-4">
                    01
                  </div>
                  <h3 className="text-2xl font-bold mb-3 tracking-tighter">Impressão em Tela (Serigrafia)</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Método tradicional de estamparia, onde a tinta é aplicada através de uma tela com o desenho. Ideal para designs bold e cores vibrantes.
                  </p>
                </div>
                <div className="px-8 pb-8">
                  <div className="relative w-full h-56 rounded-2xl overflow-hidden">
                    <Image
                      src="/assets/serigrafia.jpg"
                      alt="Impressão em Tela"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </motion.div>

              {/* Process 2 - Bordado */}
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="group bg-white rounded-2xl shadow-sm hover:shadow-lg flex flex-col"
              >
                <div className="p-8 flex-1">
                  <div className="w-12 h-12 rounded-lg bg-linear-to-br from-[#041723] to-[#08455b] flex items-center justify-center text-white font-bold text-xl mb-4">
                    02
                  </div>
                  <h3 className="text-2xl font-bold mb-3 tracking-tighter">Bordado</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Personalização usando linhas para costurar o desenho diretamente na peça. Transmite sofisticação e durabilidade excepcional.
                  </p>
                </div>
                <div className="px-8 pb-8">
                  <div className="relative w-full h-56 rounded-2xl overflow-hidden">
                    <Image
                      src="/assets/bordado.webp"
                      alt="Bordado"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </motion.div>

              {/* Process 3 - DTF */}
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="group bg-white rounded-2xl shadow-sm hover:shadow-lg flex flex-col"
              >
                <div className="p-8 flex-1">
                  <div className="w-12 h-12 rounded-lg bg-linear-to-br from-[#041723] to-[#08455b] flex items-center justify-center text-white font-bold text-xl mb-4">
                    03
                  </div>
                  <h3 className="text-2xl font-bold mb-3 tracking-tighter">Impressão Digital (DTF)</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Impressão do desenho em um filme especial, depois transferido para o tecido com o calor. Perfeito para designs complexos e detalhados.
                  </p>
                </div>
                <div className="px-8 pb-8">
                  <div className="relative w-full h-56 rounded-2xl overflow-hidden">
                    <Image
                      src="/assets/digital.jpg"
                      alt="Impressão Digital DTF"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </motion.div>

              {/* Process 4 - DTG */}
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="group bg-white rounded-2xl shadow-sm hover:shadow-lg flex flex-col"
              >
                <div className="p-8 flex-1">
                  <div className="w-12 h-12 rounded-lg bg-linear-to-br from-[#041723] to-[#08455b] flex items-center justify-center text-white font-bold text-xl mb-4">
                    04
                  </div>
                  <h3 className="text-2xl font-bold mb-3 tracking-tighter">Impressão Direta (DTG)</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Impressora especial que aplica a tinta diretamente no tecido, igual uma impressora de papel. Resultado fotográfico com máxima qualidade.
                  </p>
                </div>
                <div className="px-8 pb-8">
                  <div className="relative w-full h-56 rounded-2xl overflow-hidden">
                    <Image
                      src="/assets/dtg.webp"
                      alt="Impressão Direta DTG"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 3 Steps Section */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div 
              {...fadeInUp}
              className="text-center max-w-2xl mx-auto mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tighter">Como Funciona</h2>
              <p className="text-gray-600">Três etapas simples para transformar sua visão em uniformes de qualidade premium.</p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Step 1 - Blanks */}
              <motion.div 
                initial="initial"
                whileInView="whileInView"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="relative"
              >
                <div className="bg-gray-50 rounded-2xl p-8 h-full">
                  <div className="w-16 h-16 rounded-full bg-linear-to-br from-[#041723] to-[#08455b] flex items-center justify-center text-white font-bold text-3xl mb-6 shadow-lg">
                    1
                  </div>
                  <h3 className="text-2xl font-bold mb-4 tracking-tighter">Blanks</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Na primeira etapa, oferecemos peças lisas em diversas opções de cores e estilos. Com uma quantidade mínima de apenas 12 peças por modelo e um prazo de produção rápido de dois dias úteis, você pode começar a personalizar suas peças facilmente.
                  </p>
                </div>
              </motion.div>

              {/* Step 2 - Personalização */}
              <motion.div 
                initial="initial"
                whileInView="whileInView"
                viewport={{ once: true }}
                variants={fadeInUp}
                transition={{ delay: 0.2 }}
                className="relative md:mt-8"
              >
                <div className="bg-linear-to-br from-[#041723] to-[#08455b] rounded-2xl p-8 h-full text-white shadow-lg">
                  <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-[#041723] font-bold text-3xl mb-6">
                    2
                  </div>
                  <h3 className="text-2xl font-bold mb-4 tracking-tighter">Personalização</h3>
                  <p className="leading-relaxed">
                    Nesta etapa, você pode transformar os blanks em peças únicas que refletem a sua marca, utilizando serviços de serigrafia, bordado, DTF e aplicações. Com uma quantidade mínima de 30 peças por modelo e um prazo de produção de apenas 15 dias, a personalização se torna fácil e rápida.
                  </p>
                </div>
              </motion.div>

              {/* Step 3 - Desenvolvimento */}
              <motion.div 
                initial="initial"
                whileInView="whileInView"
                viewport={{ once: true }}
                variants={fadeInUp}
                transition={{ delay: 0.4 }}
                className="relative"
              >
                <div className="bg-gray-50 rounded-2xl p-8 h-full">
                  <div className="w-16 h-16 rounded-full bg-linear-to-br from-[#041723] to-[#08455b] flex items-center justify-center text-white font-bold text-3xl mb-6 shadow-lg">
                    3
                  </div>
                  <h3 className="text-2xl font-bold mb-4 tracking-tighter">Desenvolvimento</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Nesta fase, oferecemos o desenvolvimento completo de coleções, utilizando técnicas como pesquisa de tendências, modelagem, plotagem, corte, costura, tingimento e aplicações. Com uma quantidade mínima de 100 peças por modelo e prazos de produção eficientes, sua visão se tornará realidade em pouco tempo.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Carousel Section */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            
            <motion.div 
              {...fadeInUp}
              className="text-center max-w-2xl mx-auto mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tighter">Nossos Cases de Sucesso</h2>
              <p className="text-gray-600">Conheça empresas que já vestem nossa qualidade e fortalecem sua marca com nossos uniformes personalizados.</p>
            </motion.div>

            {/* Carousel with State */}
            <CarouselSection />
          </div>
        </section>

        {/* Trusted Clients Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div 
              {...fadeInUp}
              className="text-center max-w-2xl mx-auto mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tighter">Empresas que Confiam em Nós</h2>
              <p className="text-gray-600">Marcas que já escolheram nossos uniformes para fortalecer sua identidade visual.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center"
            >
              {[
                "/assets/trusted/trusted01.png",
                "/assets/trusted/trusted02.png",
                                   "/assets/trusted/conline.png",

                "/assets/trusted/trusted04.png",
                "/assets/trusted/trusted05.webp",
                             "/assets/trusted/drogaria.png",

                "/assets/trusted/trusted07.png",
                "/assets/trusted/trusted08.jpeg",
                                "/assets/trusted/trusted09.png",

              ].map((logo, index) => (
                <div 
                  key={index} 
                  className="relative h-16 grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
                >
                  <Image
                    src={logo}
                    alt={`Cliente ${index + 1}`}
                    fill
                    className="object-contain"
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </section>
        
        {/* Testimonials / Trust or Stats */}
        <section id="diferenciais" className="py-20 bg-black text-white">
           <div className="container mx-auto px-4 md:px-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-white/10">
                <div className="space-y-2 p-4">
                   <h3 className="text-4xl md:text-5xl font-bold tracking-tighter text-white">+500</h3>
                   <p className="text-white/80 font-medium">Equipes uniformizadas com padrão e consistência</p>
                </div>
                 <div className="space-y-2 p-4">
                   <h3 className="text-4xl md:text-5xl font-bold tracking-tighter text-white">100%</h3>
                   <p className="text-white/80 font-medium">Tecidos selecionados para conforto, durabilidade e uso diário</p>
                </div>
                 <div className="space-y-2 p-4">
                   <h3 className="text-4xl md:text-5xl font-bold tracking-tighter text-white">2026</h3>
                   <p className="text-white/80 font-medium">Produção própria com controle de qualidade em cada etapa</p>
                </div>
                 <div className="space-y-2 p-4">
                   <h3 className="text-4xl md:text-5xl font-bold tracking-tighter text-white">BR</h3>
                   <p className="text-white/80 font-medium">Entrega segura e atendimento para todo o Brasil</p>
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
                  <Button className="h-14 rounded-full bg-white text-gray-950 hover:bg-gray-100 text-lg px-8 font-bold transition-all hover:scale-105 font-unbounded">
                    Solicitar orçamento agora
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
            <div>
              <Image
                src="/assets/logoNoBackgroundBlack.png"
                alt="Komotex Logo"
                width={120}
                height={40}
                className="object-contain"
              />
            </div>
            
            <div className="text-sm text-gray-500 text-center md:text-left">
              © 2026 KomoTex. Todos os direitos reservados. 
              <span className="hidden md:inline mx-2">|</span> 
              <span className="block md:inline mt-2 md:mt-0">Desenvolvido com excelência.</span>
            </div>
            
            <div className="flex gap-6">
              <a href="https://www.instagram.com/komo.tex/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-black transition-colors opacity-70 hover:opacity-100" aria-label="Instagram">
                <Image src="/icons/instagram.svg" alt="Instagram" width={24} height={24} />
              </a>
              <a href="https://www.linkedin.com/company/komotex/?originalSubdomain=br" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-black transition-colors opacity-70 hover:opacity-100" aria-label="LinkedIn">
                <Image src="/icons/linkedin.svg" alt="LinkedIn" width={24} height={24} />
              </a>
              <a href="#" className="text-gray-500 hover:text-black transition-colors opacity-70 hover:opacity-100" aria-label="WhatsApp">
                <Image src="/icons/whatsapp.svg" alt="WhatsApp" width={24} height={24} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
