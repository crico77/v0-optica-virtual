"use client"

import Link from "next/link"
import { ShoppingCart, Menu, User, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { useCartStore } from "@/lib/cart-store"
import { useAuthStore } from "@/lib/auth-store"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"

export function Header() {
  const { items, toggleCart } = useCartStore()
  const { user, isAuthenticated, logout } = useAuthStore()
  const router = useRouter()
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0)

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  const isAdmin = user?.role === "admin"

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <div className="flex items-center">
            <span className="font-serif text-2xl font-bold text-primary">OptiVision</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {isAdmin ? (
            <Link href="/admin" className="text-sm font-medium transition-colors hover:text-primary">
              Productos
            </Link>
          ) : (
            <>
              <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
                Inicio
              </Link>
              <Link href="/catalogo" className="text-sm font-medium transition-colors hover:text-primary">
                Catálogo
              </Link>
              <Link href="/nosotros" className="text-sm font-medium transition-colors hover:text-primary">
                Nosotros
              </Link>
              <Link href="/contacto" className="text-sm font-medium transition-colors hover:text-primary">
                Contacto
              </Link>
            </>
          )}
        </nav>

        <div className="flex items-center space-x-4">
          {isAuthenticated && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="hidden md:flex">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                  <div className="flex flex-col">
                    <span className="font-semibold">{user.name}</span>
                    <span className="text-xs text-muted-foreground">{user.email}</span>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Cerrar Sesión
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/login">
              <Button variant="ghost" size="icon" className="hidden md:flex">
                <User className="h-5 w-5" />
              </Button>
            </Link>
          )}

          {!isAdmin && (
            <Button variant="ghost" size="icon" onClick={toggleCart} className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                  {cartCount}
                </Badge>
              )}
            </Button>
          )}

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col space-y-4 mt-8">
                {isAdmin ? (
                  <Link href="/admin" className="text-lg font-medium transition-colors hover:text-primary">
                    Productos
                  </Link>
                ) : (
                  <>
                    <Link href="/" className="text-lg font-medium transition-colors hover:text-primary">
                      Inicio
                    </Link>
                    <Link href="/catalogo" className="text-lg font-medium transition-colors hover:text-primary">
                      Catálogo
                    </Link>
                    <Link href="/nosotros" className="text-lg font-medium transition-colors hover:text-primary">
                      Nosotros
                    </Link>
                    <Link href="/contacto" className="text-lg font-medium transition-colors hover:text-primary">
                      Contacto
                    </Link>
                  </>
                )}
                {isAuthenticated ? (
                  <Button variant="ghost" className="justify-start" onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Cerrar Sesión
                  </Button>
                ) : (
                  <Link href="/login" className="text-lg font-medium transition-colors hover:text-primary">
                    Iniciar Sesión
                  </Link>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
