import { Github, Mail } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="bg-gray-950 border-t border-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h2 className="text-2xl font-bold">
              <span className="text-green-500">高国峰</span> Guofeng Gao
            </h2>
            <p className="text-gray-400 mt-2">{t("hero.title")}</p>
          </div>

          <div className="flex space-x-4">
            <a
              href="https://github.com/Chen-Xi-g"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-gray-900 text-gray-400 hover:text-white hover:bg-green-500/20 transition-colors"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="mailto:a912816369@gmail.com"
              className="p-2 rounded-full bg-gray-900 text-gray-400 hover:text-white hover:bg-green-500/20 transition-colors"
              aria-label="Email"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>
            © {new Date().getFullYear()} Guofeng Gao. {t("footer.rights")}
          </p>
          <p className="mt-2">
            {t("footer.built")} <span className="text-green-500">♥</span> {t("footer.using")}
          </p>
        </div>
      </div>
    </footer>
  )
}

