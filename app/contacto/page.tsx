"use client"

import type React from "react"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Phone, Mail, MapPin, Clock } from "lucide-react"
import { useState } from "react"

export default function ContactoPage() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    mensaje: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // Aquí iría la lógica de envío del formulario
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <section className="py-12 md:py-20 bg-gradient-to-br from-primary/5 to-accent/5">
          <div className="container mx-auto px-4">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-center mb-4">Contáctanos</h1>
            <p className="text-center text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Estamos aquí para ayudarte. Envíanos un mensaje o agenda tu cita
            </p>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="font-serif text-3xl font-bold mb-6">Envíanos un Mensaje</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="nombre">Nombre Completo</Label>
                    <Input
                      id="nombre"
                      value={formData.nombre}
                      onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                      placeholder="Tu nombre"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Correo Electrónico</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="tu@email.com"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="telefono">Teléfono</Label>
                    <Input
                      id="telefono"
                      type="tel"
                      value={formData.telefono}
                      onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                      placeholder="+57 300 123 4567"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="mensaje">Mensaje</Label>
                    <Textarea
                      id="mensaje"
                      value={formData.mensaje}
                      onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                      placeholder="¿En qué podemos ayudarte?"
                      rows={5}
                      required
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full">
                    Enviar Mensaje
                  </Button>
                </form>
              </div>

              <div className="space-y-6">
                <div>
                  <h2 className="font-serif text-3xl font-bold mb-6">Información de Contacto</h2>
                  <div className="space-y-6">
                    <Card className="border-none shadow-sm">
                      <CardContent className="pt-6">
                        <div className="flex items-start gap-4">
                          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 flex-shrink-0">
                            <Phone className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold mb-1">Teléfono</h3>
                            <p className="text-muted-foreground">+57 300 123 4567</p>
                            <p className="text-muted-foreground">+57 301 987 6543</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-none shadow-sm">
                      <CardContent className="pt-6">
                        <div className="flex items-start gap-4">
                          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-accent/10 flex-shrink-0">
                            <Mail className="h-5 w-5 text-accent" />
                          </div>
                          <div>
                            <h3 className="font-semibold mb-1">Email</h3>
                            <p className="text-muted-foreground">info@optivision.com</p>
                            <p className="text-muted-foreground">ventas@optivision.com</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-none shadow-sm">
                      <CardContent className="pt-6">
                        <div className="flex items-start gap-4">
                          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 flex-shrink-0">
                            <MapPin className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold mb-1">Ubicación</h3>
                            <p className="text-muted-foreground">Servicio a domicilio en toda Colombia</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-none shadow-sm">
                      <CardContent className="pt-6">
                        <div className="flex items-start gap-4">
                          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-accent/10 flex-shrink-0">
                            <Clock className="h-5 w-5 text-accent" />
                          </div>
                          <div>
                            <h3 className="font-semibold mb-1">Horario de Atención</h3>
                            <p className="text-muted-foreground">Lunes a Viernes: 8:00 AM - 6:00 PM</p>
                            <p className="text-muted-foreground">Sábados: 9:00 AM - 2:00 PM</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  )
}
