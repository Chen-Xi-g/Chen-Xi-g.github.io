"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, Send, Loader2, Github } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export default function Contact() {
  const { t } = useLanguage()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)

      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false)
      }, 3000)
    }, 1500)
  }

  return (
    <section id="contact" className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            <span className="text-green-500">{t("contact.title")}</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold mb-6">{t("contact.subtitle")}</h3>
              <p className="text-gray-400 mb-8">{t("contact.description")}</p>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="p-2 rounded-md bg-green-500/10 text-green-500 mr-4">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium">{t("contact.email")}</h4>
                    <a
                      href="mailto:a912816369@gmail.com"
                      className="text-gray-400 hover:text-green-500 transition-colors"
                    >
                      a912816369@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="p-2 rounded-md bg-green-500/10 text-green-500 mr-4">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium">{t("contact.phone")}</h4>
                    <a href="tel:+8613161668101" className="text-gray-400 hover:text-green-500 transition-colors">
                      +86 13161668101
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="p-2 rounded-md bg-green-500/10 text-green-500 mr-4">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium">{t("contact.location")}</h4>
                    <p className="text-gray-400">{t("contact.locationValue")}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="p-2 rounded-md bg-green-500/10 text-green-500 mr-4">
                    <Github className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium">GitHub</h4>
                    <a
                      href="https://github.com/Chen-Xi-g"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-green-500 transition-colors"
                    >
                      github.com/Chen-Xi-g
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
              <h3 className="text-2xl font-semibold mb-6">{t("contact.formTitle")}</h3>

              {isSubmitted ? (
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 text-center">
                  <h4 className="text-lg font-medium text-green-500 mb-2">{t("contact.success")}</h4>
                  <p className="text-gray-400">{t("contact.successMessage")}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2">
                        {t("contact.name")}
                      </label>
                      <Input
                        id="name"
                        placeholder={t("contact.namePlaceholder")}
                        required
                        className="bg-gray-800 border-gray-700 focus:border-green-500 focus:ring-green-500/20"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        {t("contact.email")}
                      </label>
                      <Input
                        id="email"
                        type="email"
                        placeholder={t("contact.emailPlaceholder")}
                        required
                        className="bg-gray-800 border-gray-700 focus:border-green-500 focus:ring-green-500/20"
                      />
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium mb-2">
                        {t("contact.subject")}
                      </label>
                      <Input
                        id="subject"
                        placeholder={t("contact.subjectPlaceholder")}
                        required
                        className="bg-gray-800 border-gray-700 focus:border-green-500 focus:ring-green-500/20"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-2">
                        {t("contact.message")}
                      </label>
                      <Textarea
                        id="message"
                        placeholder={t("contact.messagePlaceholder")}
                        rows={4}
                        required
                        className="bg-gray-800 border-gray-700 focus:border-green-500 focus:ring-green-500/20"
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-green-600 hover:bg-green-700 text-white"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          {t("contact.sending")}
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          {t("contact.send")}
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

