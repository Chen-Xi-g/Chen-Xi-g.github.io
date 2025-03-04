"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowDown, Github } from "lucide-react"
import { motion } from "framer-motion"
import { useLanguage } from "@/contexts/language-context"

export default function Hero() {
  const { t } = useLanguage()
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="relative h-screen flex flex-col justify-center items-center text-center px-4 overflow-hidden">
      <div
        className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]"
        style={{
          maskImage: "radial-gradient(circle, black, transparent 80%)",
          WebkitMaskImage: "radial-gradient(circle, black, transparent 80%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="z-10 max-w-4xl"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          <span className="text-green-500">{t("hero.hello")}</span> <span className="gradient-text">高国峰</span>
        </h1>
        <h2 className="text-xl md:text-3xl mb-6 text-gray-400">{t("hero.title")}</h2>
        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">{t("hero.description")}</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button className="bg-green-600 hover:bg-green-700 text-white" onClick={() => scrollToSection("projects")}>
            {t("hero.viewWork")}
          </Button>
          <Button
            variant="outline"
            className="border-green-600 text-green-500 hover:bg-green-900/20"
            onClick={() => scrollToSection("contact")}
          >
            {t("hero.contactMe")}
          </Button>
        </div>
        <div className="flex justify-center mt-8 gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full text-gray-400 hover:text-white hover:bg-gray-800"
            asChild
          >
            <a href="https://github.com/Chen-Xi-g" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <Github className="h-5 w-5" />
            </a>
          </Button>
        </div>
      </motion.div>

      <div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce"
        style={{ opacity: Math.max(0, 1 - scrollY / 300) }}
      >
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full text-green-500 hover:text-green-400 hover:bg-gray-800/50"
          onClick={() => scrollToSection("about")}
        >
          <ArrowDown className="h-6 w-6" />
        </Button>
      </div>

      <style jsx global>{`
        .gradient-text {
          background: linear-gradient(90deg, #4ade80 0%, #22d3ee 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}</style>
    </section>
  )
}

