"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useLanguage } from "@/contexts/language-context";

export default function About() {
  const { t } = useLanguage();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="about" className="py-20 bg-gray-950">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
            <span className="text-green-500">{t("about.title")}</span>
          </h2>

          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/3">
              <div className="relative w-64 h-64 mx-auto">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-500 to-cyan-500 blur-lg opacity-50"></div>
                <img
                  src="/images/user_avatar.jpg"
                  alt="Guofeng Gao"
                  className="relative rounded-full w-full h-full object-cover border-2 border-green-500"
                />
              </div>
            </div>

            <div className="md:w-2/3">
              <p className="text-lg mb-4">{t("about.p1")}</p>
              <p className="text-lg mb-4">{t("about.p2")}</p>
              <p className="text-lg">{t("about.p3")}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
