"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ShoppingCart } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { useCartStore } from "@/lib/cart-store"

interface Product {
  id: number
  name: string
  price: string
  image: string
  description?: string
  category: string
}

interface ProductModalProps {
  product: Product | null
  open: boolean
  onClose: () => void
}

export function ProductModal({ product, open, onClose }: ProductModalProps) {
  const [quantity, setQuantity] = useState(1)
  const { addItem, toggleCart } = useCartStore()

  if (!product) return null

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
      })
    }
    onClose()
    toggleCart()
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-serif">{product.name}</DialogTitle>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="relative h-80 rounded-lg overflow-hidden bg-muted">
            <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-3xl font-bold text-primary">{product.price}</p>
              <p className="text-sm text-muted-foreground mt-1">Categoría: {product.category}</p>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Descripción</h4>
              <p className="text-muted-foreground leading-relaxed">
                {product.description ||
                  "Producto de alta calidad diseñado para brindarte la mejor experiencia visual. Fabricado con materiales premium y tecnología de punta."}
              </p>
            </div>

            <div>
              <Label htmlFor="quantity">Cantidad</Label>
              <Input
                id="quantity"
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, Number.parseInt(e.target.value) || 1))}
                className="w-24"
              />
            </div>

            <Button className="w-full" size="lg" onClick={handleAddToCart}>
              <ShoppingCart className="mr-2 h-5 w-5" />
              Agregar al Carrito
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
