"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { CartSidebar } from "@/components/cart-sidebar"
import { AppointmentModal } from "@/components/appointment-modal"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Eye, Award, Clock, Shield } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"

export default function HomePage() {
  const [appointmentOpen, setAppointmentOpen] = useState(false)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/10 py-20 md:py-32">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="font-serif text-4xl md:text-6xl font-bold text-balance mb-6 leading-tight">
                  Visión clara, estilo único
                </h1>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  Descubre nuestra colección de lentes y monturas diseñadas para realzar tu personalidad. Calidad
                  profesional con la comodidad de comprar desde casa.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link href="/catalogo">
                    <Button size="lg" className="text-base">
                      Ver Catálogo
                    </Button>
                  </Link>
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-base bg-transparent"
                    onClick={() => setAppointmentOpen(true)}
                  >
                    Agendar Examen
                  </Button>
                </div>
              </div>
              <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/modern-eyeglasses-display-showcase.jpg"
                  alt="Colección de lentes OptiVision"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-8">
              <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="pt-6 text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                    <Eye className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Examen Profesional</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Optometristas certificados con años de experiencia
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="pt-6 text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent/10 mb-4">
                    <Award className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-semibold mb-2">Calidad Garantizada</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Productos de las mejores marcas internacionales
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="pt-6 text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Entrega Rápida</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">Recibe tus lentes en tiempo récord</p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="pt-6 text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent/10 mb-4">
                    <Shield className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-semibold mb-2">Compra Segura</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">Protección total en cada transacción</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Productos Destacados</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Descubre nuestra selección de lentes y monturas más populares
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: "Lentes Progresivos", price: "$450.000", image: "progressive lenses on display" },
                { title: "Monturas Premium", price: "$280.000", image: "premium eyeglass frames collection" },
                { title: "Combo Completo", price: "$650.000", image: "complete eyewear set with case" },
              ].map((product, i) => (
                <Card key={i} className="overflow-hidden hover:shadow-lg transition-shadow group">
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={`/.jpg?height=300&width=400&query=${product.image}`}
                      alt={product.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-2">{product.title}</h3>
                    <p className="text-2xl font-bold text-primary mb-4">{product.price}</p>
                    <Button className="w-full">Ver Detalles</Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link href="/catalogo">
                <Button size="lg" variant="outline">
                  Ver Todo el Catálogo
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Optometrist Section */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/optometrist-examining-patient.png"
                  alt="Nuestro optometrista"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">Nuestro Optometrista</h2>
                <h3 className="text-xl font-semibold text-primary mb-4">Dr. Carlos Mendoza</h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  Optometrista certificado con más de 15 años de experiencia en el cuidado de la salud visual.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                    <span className="text-muted-foreground leading-relaxed">
                      Licenciado en Optometría - Universidad Nacional
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                    <span className="text-muted-foreground leading-relaxed">Especialización en Lentes de Contacto</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                    <span className="text-muted-foreground leading-relaxed">
                      Miembro de la Asociación Colombiana de Optometría
                    </span>
                  </li>
                </ul>
                <Button size="lg" onClick={() => setAppointmentOpen(true)}>
                  Agendar Cita
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6 text-balance">
              ¿Listo para mejorar tu visión?
            </h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90 leading-relaxed">
              Agenda tu examen de optometría hoy y descubre la diferencia de trabajar con profesionales
            </p>
            <Button size="lg" variant="secondary" className="text-base" onClick={() => setAppointmentOpen(true)}>
              Contáctanos Ahora
            </Button>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
      <CartSidebar />
      <AppointmentModal open={appointmentOpen} onClose={() => setAppointmentOpen(false)} />
    </div>
  )
}
