"use client"

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { easeOut, motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Check } from 'lucide-react'
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

          <Button asChild className="rounded-full px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 text-xs sm:text-sm md:text-base whitespace-nowrap bg-linear-to-r from-[#041723] to-[#08455b] hover:from-[#03111a] hover:to-[#06354a] font-unbounded">
            <a href="https://wa.me/5547997225737" target="_blank" rel="noopener noreferrer">
              Solicitar orçamento agora
            </a>
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
                <Button asChild className="rounded-full text-base sm:text-lg px-6 sm:px-8 py-6 bg-linear-to-r from-[#041723] to-[#08455b] hover:from-[#03111a] hover:to-[#06354a] text-white font-unbounded whitespace-nowrap">
                  <a href="https://wa.me/5547997225737" target="_blank" rel="noopener noreferrer">
                    Solicitar orçamento agora <ArrowRight className="ml-2 w-5 h-5" />
                  </a>
                </Button>
                <Button asChild variant="outline" className="rounded-full text-base sm:text-lg px-6 sm:px-8 py-6 border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 font-unbounded whitespace-nowrap">
                  <a href="https://www.komotex.com.br/passwordp" target="_blank" rel="noopener noreferrer">
                    Ver catálogo
                  </a>
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
                  <h3 className="text-2xl font-bold mb-4 tracking-tighter">Escolha das peças ideais</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Definimos os modelos certos para sua operação, considerando conforto, durabilidade e uso diário. Você começa com a base certa, sem erro.
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
                  <h3 className="text-2xl font-bold mb-4 tracking-tighter">Personalização que valoriza sua marca</h3>
                  <p className="leading-relaxed">
                    Aplicamos sua identidade com técnicas profissionais que garantem acabamento limpo, alta resistência e padrão visual em todas as peças.
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
                  <h3 className="text-2xl font-bold mb-4 tracking-tighter">Solução completa para sua empresa</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Cuidamos de todo o processo, do projeto à entrega final, para que sua equipe esteja uniformizada com qualidade e consistência.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Unified Trust Section */}
        <section className="py-24 bg-white overflow-hidden">
          <div className="container mx-auto px-4 md:px-6">
            
            <motion.div 
              {...fadeInUp}
              className="text-center max-w-4xl mx-auto mb-16"
            >
              <h2 className="text-5xl md:text-7xl font-bold mb-4 tracking-tighter text-[#041723]">Quem confia</h2>
            </motion.div>

            {/* Showcase Images Grid */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-24"
            >
               {/* Case 1 */}
               <div className="relative aspect-[3/4] md:aspect-[4/5] rounded-[2rem] overflow-hidden group">
                  <Image
                    src="/assets/case01.jpeg"
                    alt="Case 1"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
               </div>
               
               {/* Case 2 */}
               <div className="relative aspect-[3/4] md:aspect-[4/5] rounded-[2rem] overflow-hidden group">
                  <Image
                    src="/assets/case02.jpeg"
                    alt="Case 2"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                   <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
               </div>

               {/* Case 3 */}
               <div className="relative aspect-[3/4] md:aspect-[4/5] rounded-[2rem] overflow-hidden group">
                  <Image
                    src="/assets/case03.jpeg"
                    alt="Case 3"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                   <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
               </div>

                {/* Case 4 */}
               <div className="relative aspect-[3/4] md:aspect-[4/5] rounded-[2rem] overflow-hidden group">
                  <Image
                    src="/assets/case04.jpeg"
                    alt="Case 4"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                   <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
               </div>
            </motion.div>

            {/* Trusted Logos Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="w-full"
            >
              <Image
                src="/assets/trusted/trusted16.png"
                alt="Empresas que confiam na Komotex"
                width={1200}
                height={300}
                className="w-full h-auto object-contain"
                priority
              />
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
                  <Button asChild className="h-14 rounded-full bg-white text-gray-950 hover:bg-gray-100 text-base sm:text-lg px-6 sm:px-8 font-bold transition-all hover:scale-105 font-unbounded whitespace-nowrap">
                    <a href="https://wa.me/5547997225737" target="_blank" rel="noopener noreferrer">
                      Solicitar orçamento agora
                    </a>
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
