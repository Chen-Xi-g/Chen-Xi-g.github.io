"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, Smartphone, Code, FigmaIcon } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

const getProjects = (t: (key: string) => string) => [
  {
    title: t("project.fittrack.title"),
    description: t("project.fittrack.desc"),
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Android", "Kotlin", "Jetpack Compose", "Room"],
    links: {
      demo: "#",
      github: "#",
    },
    category: "mobile",
  },
  {
    title: t("project.cryptowatch.title"),
    description: t("project.cryptowatch.desc"),
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Kotlin Multiplatform", "Ktor", "Coroutines", "Flow"],
    links: {
      demo: "#",
      github: "#",
    },
    category: "multiplatform",
  },
  {
    title: t("project.taskmaster.title"),
    description: t("project.taskmaster.desc"),
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Figma", "UI/UX", "Design System"],
    links: {
      demo: "#",
      github: "#",
    },
    category: "design",
  },
  {
    title: t("project.gradlescripts.title"),
    description: t("project.gradlescripts.desc"),
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Gradle", "Kotlin DSL", "CI/CD"],
    links: {
      demo: "#",
      github: "#",
    },
    category: "tools",
  },
  {
    title: t("project.weathernow.title"),
    description: t("project.weathernow.desc"),
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Android", "Kotlin", "MVVM", "Retrofit"],
    links: {
      demo: "#",
      github: "#",
    },
    category: "mobile",
  },
  {
    title: t("project.devnotes.title"),
    description: t("project.devnotes.desc"),
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Kotlin Multiplatform", "SQLDelight", "Material Design"],
    links: {
      demo: "#",
      github: "#",
    },
    category: "multiplatform",
  },
]

export default function Projects() {
  const { t } = useLanguage()
  const [filter, setFilter] = useState("all")
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const projects = getProjects(t)
  const filteredProjects = filter === "all" ? projects : projects.filter((project) => project.category === filter)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <section id="projects" className="py-20 bg-gray-950">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
          <span className="text-green-500">{t("projects.title")}</span>
        </h2>

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            className={filter === "all" ? "bg-green-600 hover:bg-green-700" : "text-gray-400 hover:text-white"}
            onClick={() => setFilter("all")}
          >
            {t("projects.all")}
          </Button>
          <Button
            variant={filter === "mobile" ? "default" : "outline"}
            className={filter === "mobile" ? "bg-green-600 hover:bg-green-700" : "text-gray-400 hover:text-white"}
            onClick={() => setFilter("mobile")}
          >
            <Smartphone className="h-4 w-4 mr-2" />
            {t("projects.android")}
          </Button>
          <Button
            variant={filter === "multiplatform" ? "default" : "outline"}
            className={
              filter === "multiplatform" ? "bg-green-600 hover:bg-green-700" : "text-gray-400 hover:text-white"
            }
            onClick={() => setFilter("multiplatform")}
          >
            <Code className="h-4 w-4 mr-2" />
            {t("projects.kotlin")}
          </Button>
          <Button
            variant={filter === "design" ? "default" : "outline"}
            className={filter === "design" ? "bg-green-600 hover:bg-green-700" : "text-gray-400 hover:text-white"}
            onClick={() => setFilter("design")}
          >
            <FigmaIcon className="h-4 w-4 mr-2" />
            {t("projects.design")}
          </Button>
          <Button
            variant={filter === "tools" ? "default" : "outline"}
            className={filter === "tools" ? "bg-green-600 hover:bg-green-700" : "text-gray-400 hover:text-white"}
            onClick={() => setFilter("tools")}
          >
            <Github className="h-4 w-4 mr-2" />
            {t("projects.tools")}
          </Button>
        </div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800 hover:border-green-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/10 group"
            >
              <div className="relative overflow-hidden h-48">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="bg-black/50 border-white/20 text-white hover:bg-black/70"
                      asChild
                    >
                      <a href={project.links.demo} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-1" />
                        {t("projects.demo")}
                      </a>
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="bg-black/50 border-white/20 text-white hover:bg-black/70"
                      asChild
                    >
                      <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4 mr-1" />
                        {t("projects.code")}
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-white group-hover:text-green-500 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-400 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-green-500/10 text-green-500"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

