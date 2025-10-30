"use client"

import type React from "react"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { CartSidebar } from "@/components/cart-sidebar"
import { ProductModal } from "@/components/product-modal"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"
import { ShoppingCart } from "lucide-react"
import { useState } from "react"
import { useCartStore } from "@/lib/cart-store"

const products = {
  lentes: [
    {
      id: 1,
      name: "Lentes Monofocales",
      price: "$180.000",
      image: "/.jpg?height=300&width=400&query=single vision eyeglass lenses",
      category: "Lentes",
    },
    {
      id: 2,
      name: "Lentes Bifocales",
      price: "$320.000",
      image: "/.jpg?height=300&width=400&query=bifocal eyeglass lenses",
      category: "Lentes",
    },
    {
      id: 3,
      name: "Lentes Progresivos",
      price: "$450.000",
      image: "/.jpg?height=300&width=400&query=progressive eyeglass lenses",
      category: "Lentes",
    },
    {
      id: 4,
      name: "Lentes Fotocromáticos",
      price: "$380.000",
      image: "/.jpg?height=300&width=400&query=photochromic transition lenses",
      category: "Lentes",
    },
    {
      id: 5,
      name: "Lentes Antireflex",
      price: "$220.000",
      image: "/.jpg?height=300&width=400&query=anti-reflective coated lenses",
      category: "Lentes",
    },
    {
      id: 6,
      name: "Lentes Blue Light",
      price: "$250.000",
      image: "/.jpg?height=300&width=400&query=blue light blocking lenses",
      category: "Lentes",
    },
  ],
  monturas: [
    {
      id: 7,
      name: "Montura Clásica Metal",
      price: "$150.000",
      image: "/.jpg?height=300&width=400&query=classic metal eyeglass frames",
      category: "Monturas",
    },
    {
      id: 8,
      name: "Montura Acetato Premium",
      price: "$280.000",
      image: "/.jpg?height=300&width=400&query=premium acetate eyeglass frames",
      category: "Monturas",
    },
    {
      id: 9,
      name: "Montura Deportiva",
      price: "$200.000",
      image: "/.jpg?height=300&width=400&query=sporty eyeglass frames",
      category: "Monturas",
    },
    {
      id: 10,
      name: "Montura Titanio",
      price: "$350.000",
      image: "/.jpg?height=300&width=400&query=titanium eyeglass frames",
      category: "Monturas",
    },
    {
      id: 11,
      name: "Montura Vintage",
      price: "$180.000",
      image: "/.jpg?height=300&width=400&query=vintage style eyeglass frames",
      category: "Monturas",
    },
    {
      id: 12,
      name: "Montura Minimalista",
      price: "$220.000",
      image: "/.jpg?height=300&width=400&query=minimalist rimless eyeglass frames",
      category: "Monturas",
    },
  ],
  combos: [
    {
      id: 13,
      name: "Combo Básico",
      price: "$350.000",
      description: "Montura + Lentes Monofocales",
      image: "/.jpg?height=350&width=500&query=basic eyewear package",
      category: "Combos",
    },
    {
      id: 14,
      name: "Combo Premium",
      price: "$650.000",
      description: "Montura Premium + Lentes Progresivos",
      image: "/.jpg?height=350&width=500&query=premium eyewear package",
      category: "Combos",
    },
    {
      id: 15,
      name: "Combo Deportivo",
      price: "$480.000",
      description: "Montura Deportiva + Lentes Antireflex",
      image: "/.jpg?height=350&width=500&query=sports eyewear package",
      category: "Combos",
    },
    {
      id: 16,
      name: "Combo Ejecutivo",
      price: "$720.000",
      description: "Montura Titanio + Lentes Blue Light",
      image: "/.jpg?height=350&width=500&query=executive eyewear package",
      category: "Combos",
    },
  ],
}

export default function CatalogoPage() {
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const { addItem, toggleCart } = useCartStore()

  const handleProductClick = (product: any) => {
    setSelectedProduct(product)
    setModalOpen(true)
  }

  const handleQuickAdd = (product: any, e: React.MouseEvent) => {
    e.stopPropagation()
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
    })
    toggleCart()
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <section className="py-12 md:py-20 bg-gradient-to-br from-primary/5 to-accent/5">
          <div className="container mx-auto px-4">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-center mb-4">Nuestro Catálogo</h1>
            <p className="text-center text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Explora nuestra amplia selección de lentes, monturas y combos especiales
            </p>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <Tabs defaultValue="lentes" className="w-full">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-12">
                <TabsTrigger value="lentes">Lentes</TabsTrigger>
                <TabsTrigger value="monturas">Monturas</TabsTrigger>
                <TabsTrigger value="combos">Combos</TabsTrigger>
              </TabsList>

              <TabsContent value="lentes">
                <div className="grid md:grid-cols-3 gap-8">
                  {products.lentes.map((product) => (
                    <Card
                      key={product.id}
                      className="overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer"
                      onClick={() => handleProductClick(product)}
                    >
                      <div className="relative h-64 overflow-hidden bg-muted">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <CardContent className="p-6">
                        <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                        <p className="text-2xl font-bold text-primary mb-4">{product.price}</p>
                        <Button className="w-full" onClick={(e) => handleQuickAdd(product, e)}>
                          <ShoppingCart className="mr-2 h-4 w-4" />
                          Agregar al Carrito
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="monturas">
                <div className="grid md:grid-cols-3 gap-8">
                  {products.monturas.map((product) => (
                    <Card
                      key={product.id}
                      className="overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer"
                      onClick={() => handleProductClick(product)}
                    >
                      <div className="relative h-64 overflow-hidden bg-muted">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <CardContent className="p-6">
                        <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                        <p className="text-2xl font-bold text-primary mb-4">{product.price}</p>
                        <Button className="w-full" onClick={(e) => handleQuickAdd(product, e)}>
                          <ShoppingCart className="mr-2 h-4 w-4" />
                          Agregar al Carrito
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="combos">
                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                  {products.combos.map((product) => (
                    <Card
                      key={product.id}
                      className="overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer"
                      onClick={() => handleProductClick(product)}
                    >
                      <div className="relative h-72 overflow-hidden bg-muted">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <CardContent className="p-6">
                        <h3 className="font-semibold text-xl mb-2">{product.name}</h3>
                        <p className="text-muted-foreground mb-3">{product.description}</p>
                        <p className="text-2xl font-bold text-primary mb-4">{product.price}</p>
                        <Button className="w-full" onClick={(e) => handleQuickAdd(product, e)}>
                          <ShoppingCart className="mr-2 h-4 w-4" />
                          Agregar al Carrito
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
      <CartSidebar />
      <ProductModal product={selectedProduct} open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  )
}
