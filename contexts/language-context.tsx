"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

type Language = "en" | "zh";

type LanguageContextType = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

// English translations
const enTranslations = {
  // Navigation
  "nav.about": "About",
  "nav.skills": "Skills",
  "nav.projects": "Projects",
  "nav.contact": "Contact",

  // Hero section
  "hero.name": "Guofeng Gao",
  "hero.hello": "Hello, I'm",
  "hero.title": "Android Developer & Kotlin Multiplatform Specialist",
  "hero.description":
    "I build exceptional mobile experiences with cutting-edge technologies",
  "hero.viewWork": "View My Work",
  "hero.contactMe": "Contact Me",

  // About section
  "about.title": "About Me",
  "about.p1":
    "I'm a passionate software developer specializing in Android development and Kotlin Multiplatform. With over 5 years of experience, I've built applications that millions of users love and enjoy.",
  "about.p2":
    "My expertise extends beyond coding - I'm proficient in UI/UX design with Figma, build automation with Gradle, and version control with Git. I believe in creating software that's not just functional, but also beautiful and intuitive.",
  "about.p3":
    "When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or sharing my knowledge through technical articles and community events.",

  // Skills section
  "skills.title": "My Skills",
  "skills.android.name": "Android Development",
  "skills.android.desc":
    "Building native Android applications with Kotlin and Jetpack Compose",
  "skills.kotlin.name": "Kotlin Multiplatform",
  "skills.kotlin.desc":
    "Creating cross-platform applications with shared Kotlin code",
  "skills.figma.name": "Figma",
  "skills.figma.desc": "Designing beautiful user interfaces and prototypes",
  "skills.gradle.name": "Gradle",
  "skills.gradle.desc": "Automating builds and managing dependencies",
  "skills.git.name": "Git",
  "skills.git.desc": "Version control and collaborative development",
  "skills.backend.name": "Backend Development",
  "skills.backend.desc": "Building RESTful APIs with Spring Boot and Ktor",
  "skills.databases.name": "Databases",
  "skills.databases.desc": "Working with SQLite, Room, and Firebase Firestore",
  "skills.cloud.name": "Cloud Services",
  "skills.cloud.desc":
    "Deploying and managing applications on AWS and Google Cloud",

  // Projects section
  "projects.title": "My Projects",
  "projects.all": "All",
  "projects.android": "Android",
  "projects.kotlin": "Kotlin Multiplatform",
  "projects.design": "Design",
  "projects.tools": "Tools",
  "projects.demo": "Demo",
  "projects.code": "Code",

  // Project titles and descriptions
  "project.fittrack.title": "FitTrack",
  "project.fittrack.desc":
    "A fitness tracking app with personalized workout plans and progress analytics",
  "project.cryptowatch.title": "CryptoWatch",
  "project.cryptowatch.desc":
    "Real-time cryptocurrency tracking app with price alerts and portfolio management",
  "project.taskmaster.title": "TaskMaster UI Kit",
  "project.taskmaster.desc":
    "A comprehensive UI kit for productivity applications with dark and light themes",
  "project.gradlescripts.title": "GradleScripts",
  "project.gradlescripts.desc":
    "A collection of Gradle scripts to automate common Android development tasks",
  "project.weathernow.title": "WeatherNow",
  "project.weathernow.desc":
    "A beautiful weather app with animated visualizations and accurate forecasts",
  "project.devnotes.title": "DevNotes",
  "project.devnotes.desc":
    "A cross-platform note-taking app for developers with code syntax highlighting",

  // Contact section
  "contact.title": "Get In Touch",
  "contact.subtitle": "Let's Talk",
  "contact.description":
    "Have a project in mind or just want to say hello? Feel free to reach out. I'm always open to discussing new projects, creative ideas or opportunities to be part of your vision.",
  "contact.email": "Email",
  "contact.phone": "Phone",
  "contact.location": "Location",
  "contact.locationValue": "Beijing, China",
  "contact.formTitle": "Send a Message",
  "contact.name": "Name",
  "contact.namePlaceholder": "Your name",
  "contact.emailPlaceholder": "your@email.com",
  "contact.subject": "Subject",
  "contact.subjectPlaceholder": "How can I help you?",
  "contact.message": "Message",
  "contact.messagePlaceholder": "Your message...",
  "contact.send": "Send Message",
  "contact.sending": "Sending...",
  "contact.success": "Message Sent!",
  "contact.successMessage":
    "Thank you for reaching out. I'll get back to you as soon as possible.",

  // Footer
  "footer.rights": "All rights reserved.",
  "footer.built": "Designed and built with",
  "footer.using": "using Next.js and Tailwind CSS",

  // Language switcher
  "lang.en": "English",
  "lang.zh": "中文",
};

// Chinese translations
const zhTranslations = {
  // Navigation
  "nav.about": "关于我",
  "nav.skills": "技能",
  "nav.projects": "项目",
  "nav.contact": "联系",

  // Hero section
  "hero.name": "高国峰",
  "hero.hello": "你好，我是",
  "hero.title": "Android 开发者 & Kotlin 多平台专家",
  "hero.description": "我使用前沿技术构建卓越的移动体验",
  "hero.viewWork": "查看我的作品",
  "hero.contactMe": "联系我",

  // About section
  "about.title": "关于我",
  "about.p1":
    "我是一名热衷于 Android 开发和 Kotlin 多平台的软件开发者。凭借超过 5 年的经验，我构建了受到数百万用户喜爱的应用程序。",
  "about.p2":
    "我的专业知识不仅限于编码 - 我精通使用 Figma 进行 UI/UX 设计，使用 Gradle 进行构建自动化，以及使用 Git 进行版本控制。我相信创建的软件不仅要实用，还要美观且直观。",
  "about.p3":
    "当我不在编码时，你可以看到我在探索新技术，为开源项目做贡献，或通过技术文章和社区活动分享我的知识。",

  // Skills section
  "skills.title": "我的技能",
  "skills.android.name": "Android 开发",
  "skills.android.desc": "使用 Kotlin 和 Jetpack Compose 构建原生 Android 应用",
  "skills.kotlin.name": "Kotlin 多平台",
  "skills.kotlin.desc": "使用共享 Kotlin 代码创建跨平台应用",
  "skills.figma.name": "Figma 设计",
  "skills.figma.desc": "设计美观的用户界面和原型",
  "skills.gradle.name": "Gradle 构建",
  "skills.gradle.desc": "自动化构建和管理依赖",
  "skills.git.name": "Git 版本控制",
  "skills.git.desc": "版本控制和协作开发",
  "skills.backend.name": "后端开发",
  "skills.backend.desc": "使用 Spring Boot 和 Ktor 构建 RESTful API",
  "skills.databases.name": "数据库",
  "skills.databases.desc": "使用 SQLite、Room 和 Firebase Firestore",
  "skills.cloud.name": "云服务",
  "skills.cloud.desc": "在 AWS 和 Google Cloud 上部署和管理应用",

  // Projects section
  "projects.title": "我的项目",
  "projects.all": "全部",
  "projects.android": "Android",
  "projects.kotlin": "Kotlin 多平台",
  "projects.design": "设计",
  "projects.tools": "工具",
  "projects.demo": "演示",
  "projects.code": "代码",

  // Project titles and descriptions
  "project.fittrack.title": "健身追踪",
  "project.fittrack.desc": "一款提供个性化锻炼计划和进度分析的健身追踪应用",
  "project.cryptowatch.title": "加密货币监控",
  "project.cryptowatch.desc":
    "实时加密货币追踪应用，具有价格提醒和投资组合管理功能",
  "project.taskmaster.title": "任务大师 UI 套件",
  "project.taskmaster.desc": "一个全面的生产力应用 UI 套件，支持深色和浅色主题",
  "project.gradlescripts.title": "Gradle 脚本集",
  "project.gradlescripts.desc":
    "一系列自动化常见 Android 开发任务的 Gradle 脚本",
  "project.weathernow.title": "天气预报",
  "project.weathernow.desc": "一款具有动画可视化效果和精准预报的精美天气应用",
  "project.devnotes.title": "开发笔记",
  "project.devnotes.desc": "一款面向开发者的跨平台笔记应用，支持代码语法高亮",

  // Contact section
  "contact.title": "联系我",
  "contact.subtitle": "让我们交流",
  "contact.description":
    "有项目想法或只是想打个招呼？请随时联系我。我始终愿意讨论新项目、创意想法或成为您愿景的一部分。",
  "contact.email": "邮箱",
  "contact.phone": "电话",
  "contact.location": "位置",
  "contact.locationValue": "中国北京",
  "contact.formTitle": "发送消息",
  "contact.name": "姓名",
  "contact.namePlaceholder": "您的姓名",
  "contact.emailPlaceholder": "your@email.com",
  "contact.subject": "主题",
  "contact.subjectPlaceholder": "我能如何帮助您？",
  "contact.message": "消息",
  "contact.messagePlaceholder": "您的消息...",
  "contact.send": "发送消息",
  "contact.sending": "发送中...",
  "contact.success": "消息已发送！",
  "contact.successMessage": "感谢您的联系。我会尽快回复您。",

  // Footer
  "footer.rights": "版权所有。",
  "footer.built": "设计和开发",
  "footer.using": "使用 Next.js 和 Tailwind CSS",

  // Language switcher
  "lang.en": "English",
  "lang.zh": "中文",
};

const translations: any = {
  en: enTranslations,
  zh: zhTranslations,
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("en");

  // Load language preference from localStorage on client side
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language;
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "zh")) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Save language preference to localStorage
  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  // Translation function
  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
