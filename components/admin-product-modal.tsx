"use client"

import type React from "react"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { Upload } from "lucide-react"

interface Product {
  id?: number
  name: string
  price: string
  category: string
  description: string
  image?: string
}

interface AdminProductModalProps {
  product: Product | null
  open: boolean
  onClose: () => void
  mode: "add" | "edit"
}

export function AdminProductModal({ product, open, onClose, mode }: AdminProductModalProps) {
  const [formData, setFormData] = useState<Product>(
    product || {
      name: "",
      price: "",
      category: "lentes",
      description: "",
    },
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Product saved:", formData)
    alert(mode === "add" ? "Producto agregado exitosamente" : "Producto actualizado exitosamente")
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-serif">
            {mode === "add" ? "Agregar Nuevo Producto" : "Editar Producto"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Nombre del Producto</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Ej: Lentes Progresivos Premium"
              required
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="price">Precio</Label>
              <Input
                id="price"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="$450.000"
                required
              />
            </div>

            <div>
              <Label htmlFor="category">Categoría</Label>
              <select
                id="category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full h-10 px-3 rounded-md border border-input bg-background"
              >
                <option value="lentes">Lentes</option>
                <option value="monturas">Monturas</option>
                <option value="combos">Combos</option>
              </select>
            </div>
          </div>

          <div>
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Descripción detallada del producto..."
              rows={4}
            />
          </div>

          <div>
            <Label>Imagen del Producto</Label>
            <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
              <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Haz clic para subir una imagen o arrastra aquí</p>
              <p className="text-xs text-muted-foreground mt-1">PNG, JPG hasta 5MB</p>
            </div>
          </div>

          <div className="flex gap-3 justify-end pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">{mode === "add" ? "Agregar Producto" : "Guardar Cambios"}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
