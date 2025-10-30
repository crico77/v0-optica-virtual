"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AdminProductModal } from "@/components/admin-product-modal"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Edit, Trash2 } from "lucide-react"
import { useState } from "react"

const initialProducts = [
  { id: 1, name: "Lentes Progresivos", price: "$450.000", category: "Lentes", description: "Lentes de alta calidad" },
  { id: 2, name: "Montura Premium", price: "$280.000", category: "Monturas", description: "Montura elegante" },
  { id: 3, name: "Combo Básico", price: "$350.000", category: "Combos", description: "Paquete completo" },
]

export default function AdminPage() {
  const [products, setProducts] = useState(initialProducts)
  const [modalOpen, setModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState<"add" | "edit">("add")
  const [selectedProduct, setSelectedProduct] = useState<any>(null)

  const handleAddProduct = () => {
    setSelectedProduct(null)
    setModalMode("add")
    setModalOpen(true)
  }

  const handleEditProduct = (product: any) => {
    setSelectedProduct(product)
    setModalMode("edit")
    setModalOpen(true)
  }

  const handleDeleteProduct = (id: number) => {
    if (confirm("¿Estás seguro de que deseas eliminar este producto?")) {
      setProducts(products.filter((p) => p.id !== id))
      alert("Producto eliminado exitosamente")
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="font-serif text-3xl md:text-4xl font-bold mb-2">Panel de Administración</h1>
            <p className="text-muted-foreground">Gestiona los productos de tu óptica</p>
          </div>

          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Productos</h2>
              <Button onClick={handleAddProduct}>
                <Plus className="mr-2 h-4 w-4" />
                Agregar Producto
              </Button>
            </div>

            <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {products.map((product) => (
                <Card key={product.id}>
                  <CardHeader>
                    <CardTitle className="text-lg">{product.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 mb-4">
                      <p className="text-2xl font-bold text-primary">{product.price}</p>
                      <p className="text-sm text-muted-foreground">Categoría: {product.category}</p>
                      <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        className="flex-1 bg-transparent"
                        onClick={() => handleEditProduct(product)}
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        Editar
                      </Button>
                      <Button
                        variant="outline"
                        className="flex-1 bg-transparent"
                        onClick={() => handleDeleteProduct(product.id)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Eliminar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <AdminProductModal
        product={selectedProduct}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        mode={modalMode}
      />
    </div>
  )
}
