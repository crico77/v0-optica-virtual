"use client"

import { MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export function WhatsAppButton() {
  const handleWhatsAppClick = () => {
    window.open("https://wa.me/573001234567", "_blank")
  }

  return (
    <Button
      onClick={handleWhatsAppClick}
      size="icon"
      className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg hover:scale-110 transition-transform z-50 bg-[#25D366] hover:bg-[#20BA5A]"
    >
      <MessageCircle className="h-6 w-6 text-white" />
    </Button>
  )
}
