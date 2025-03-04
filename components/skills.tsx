"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Smartphone,
  Code,
  FigmaIcon,
  GitBranch,
  Package,
  Server,
  Database,
  Cloud,
} from "lucide-react";
import { useLanguage } from "@/contexts/language-context";

const getSkills = (t: (key: string) => string) => [
  {
    name: t("skills.android.name"),
    icon: <Smartphone className="h-8 w-8" />,
    description: t("skills.android.desc"),
    level: 95,
  },
  {
    name: t("skills.kotlin.name"),
    icon: <Code className="h-8 w-8" />,
    description: t("skills.kotlin.desc"),
    level: 90,
  },
  {
    name: t("skills.figma.name"),
    icon: <FigmaIcon className="h-8 w-8" />,
    description: t("skills.figma.desc"),
    level: 85,
  },
  {
    name: t("skills.gradle.name"),
    icon: <Package className="h-8 w-8" />,
    description: t("skills.gradle.desc"),
    level: 80,
  },
  {
    name: t("skills.git.name"),
    icon: <GitBranch className="h-8 w-8" />,
    description: t("skills.git.desc"),
    level: 90,
  },
  {
    name: t("skills.backend.name"),
    icon: <Server className="h-8 w-8" />,
    description: t("skills.backend.desc"),
    level: 75,
  },
  {
    name: t("skills.databases.name"),
    icon: <Database className="h-8 w-8" />,
    description: t("skills.databases.desc"),
    level: 80,
  },
  {
    name: t("skills.cloud.name"),
    icon: <Cloud className="h-8 w-8" />,
    description: t("skills.cloud.desc"),
    level: 70,
  },
];

export default function Skills() {
  const { t } = useLanguage();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const skills = getSkills(t);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section id="skills" className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          <span className="text-green-500">{t("skills.title")}</span>
        </h2>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-gray-900 rounded-lg p-6 border border-gray-800 hover:border-green-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/10 flex flex-col"
            >
              <div className="flex items-center mb-4">
                <div className="p-2 rounded-md bg-green-500/10 text-green-500 mr-3">
                  {skill.icon}
                </div>
                <h3 className="text-xl font-semibold">{skill.name}</h3>
              </div>
              <p className="text-gray-400 mb-auto">{skill.description}</p>
              <div className="mt-4">
                <div className="w-full bg-gray-800 rounded-full h-2.5">
                  <div
                    className="bg-gradient-to-r from-green-500 to-cyan-500 h-2.5 rounded-full"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
                <div className="flex justify-end mt-2">
                  <span className="text-sm text-green-500 font-medium">
                    {skill.level}%
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
