import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { Card, CardContent } from "@/components/ui/card"
import { Eye, Users, Target, Heart } from "lucide-react"
import Image from "next/image"

export default function NosotrosPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <section className="py-12 md:py-20 bg-gradient-to-br from-primary/5 to-accent/5">
          <div className="container mx-auto px-4">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-center mb-4">Sobre Nosotros</h1>
            <p className="text-center text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Conoce la historia y el equipo detrás de OptiVision
            </p>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
              <div>
                <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">Nuestra Historia</h2>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  OptiVision nació de la visión de hacer accesible el cuidado visual de calidad para todos. Entendemos
                  que no todos tienen tiempo para visitar una óptica física, por eso creamos una solución virtual que
                  combina profesionalismo, calidad y comodidad.
                </p>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  A través de alianzas estratégicas con los mejores profesionales y proveedores del sector, ofrecemos un
                  servicio integral que va desde el examen optométrico hasta la entrega de tus lentes en la puerta de tu
                  casa.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Cada miembro de nuestro equipo está comprometido con brindarte la mejor experiencia posible, porque
                  creemos que una buena visión es fundamental para una mejor calidad de vida.
                </p>
              </div>
              <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl">
                <Image src="/modern-optical-store-interior-with-eyeglasses.jpg" alt="OptiVision" fill className="object-cover" />
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
              <Card className="border-none shadow-sm">
                <CardContent className="pt-6 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                    <Eye className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold mb-2">Misión</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Proporcionar soluciones visuales de calidad accesibles para todos, combinando tecnología y
                    profesionalismo.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-sm">
                <CardContent className="pt-6 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-4">
                    <Target className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold mb-2">Visión</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Ser la óptica virtual líder en Colombia, reconocida por nuestra calidad, innovación y servicio al
                    cliente.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-sm">
                <CardContent className="pt-6 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                    <Heart className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold mb-2">Valores</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Integridad, excelencia, compromiso con el cliente y pasión por el cuidado visual.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-sm">
                <CardContent className="pt-6 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-4">
                    <Users className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold mb-2">Equipo</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Profesionales certificados dedicados a brindarte la mejor atención y asesoría personalizada.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="bg-muted/50 rounded-2xl p-8 md:p-12">
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-8 text-center">Nuestro Modelo de Trabajo</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold text-xl mb-4">
                    1
                  </div>
                  <h3 className="font-semibold text-lg mb-3">Examen Optométrico</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Trabajamos con optometristas certificados que realizan exámenes completos para determinar tu
                    graduación exacta y necesidades visuales.
                  </p>
                </div>

                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent text-accent-foreground font-bold text-xl mb-4">
                    2
                  </div>
                  <h3 className="font-semibold text-lg mb-3">Selección de Monturas</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Contamos con un proveedor especializado que nos suministra monturas de las mejores marcas,
                    garantizando calidad y variedad de estilos.
                  </p>
                </div>

                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold text-xl mb-4">
                    3
                  </div>
                  <h3 className="font-semibold text-lg mb-3">Fabricación de Lentes</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Nuestro laboratorio aliado fabrica tus lentes con la más alta precisión y tecnología, asegurando una
                    visión perfecta.
                  </p>
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
