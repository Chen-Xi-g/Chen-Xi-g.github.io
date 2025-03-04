"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Globe } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage()
  const [mounted, setMounted] = useState(false)

  // Only show the language switcher after the component has mounted to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="z-50">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full bg-gray-900/80 backdrop-blur-sm border-gray-700 hover:bg-gray-800 hover:border-green-500/50"
          >
            <Globe className="h-5 w-5 text-green-500" />
            <span className="sr-only">Toggle language</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-gray-900 border-gray-700">
          <DropdownMenuItem
            onClick={() => setLanguage("en")}
            className={`cursor-pointer ${language === "en" ? "text-green-500" : "text-gray-300"}`}
          >
            {t("lang.en")}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setLanguage("zh")}
            className={`cursor-pointer ${language === "zh" ? "text-green-500" : "text-gray-300"}`}
          >
            {t("lang.zh")}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

