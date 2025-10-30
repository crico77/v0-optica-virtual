"use client"

import type React from "react"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/lib/auth-store"

export default function LoginPage() {
  const router = useRouter()
  const { login } = useAuthStore()
  const [loginData, setLoginData] = useState({ email: "", password: "" })
  const [registerData, setRegisterData] = useState({
    nombre: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()

    // Simulación: si el email contiene "admin", es administrador
    const role = loginData.email.includes("admin") ? "admin" : "user"

    login(loginData.email, loginData.password, role)

    // Redirigir según el rol
    if (role === "admin") {
      router.push("/admin")
    } else {
      router.push("/")
    }
  }

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()

    if (registerData.password !== registerData.confirmPassword) {
      alert("Las contraseñas no coinciden")
      return
    }

    login(registerData.email, registerData.password, "user")
    router.push("/")
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 flex items-center justify-center py-12 px-4 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="font-serif text-3xl md:text-4xl font-bold mb-2">Bienvenido</h1>
            <p className="text-muted-foreground">Inicia sesión o crea una cuenta</p>
          </div>

          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">Iniciar Sesión</TabsTrigger>
              <TabsTrigger value="register">Registrarse</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <Card>
                <CardHeader>
                  <CardTitle>Iniciar Sesión</CardTitle>
                  <CardDescription>Ingresa tus credenciales para acceder a tu cuenta</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                      <Label htmlFor="login-email">Correo Electrónico</Label>
                      <Input
                        id="login-email"
                        type="email"
                        value={loginData.email}
                        onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                        placeholder="tu@email.com"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="login-password">Contraseña</Label>
                      <Input
                        id="login-password"
                        type="password"
                        value={loginData.password}
                        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                        placeholder="••••••••"
                        required
                      />
                    </div>

                    <Button type="submit" className="w-full">
                      Iniciar Sesión
                    </Button>

                    <div className="text-center">
                      <Button variant="link" className="text-sm">
                        ¿Olvidaste tu contraseña?
                      </Button>
                    </div>

                    <p className="text-xs text-muted-foreground text-center">
                      Tip: usa un email con "admin" para acceder como administrador
                    </p>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="register">
              <Card>
                <CardHeader>
                  <CardTitle>Crear Cuenta</CardTitle>
                  <CardDescription>Completa el formulario para registrarte</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                      <Label htmlFor="register-nombre">Nombre Completo</Label>
                      <Input
                        id="register-nombre"
                        value={registerData.nombre}
                        onChange={(e) => setRegisterData({ ...registerData, nombre: e.target.value })}
                        placeholder="Tu nombre"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="register-email">Correo Electrónico</Label>
                      <Input
                        id="register-email"
                        type="email"
                        value={registerData.email}
                        onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                        placeholder="tu@email.com"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="register-password">Contraseña</Label>
                      <Input
                        id="register-password"
                        type="password"
                        value={registerData.password}
                        onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                        placeholder="••••••••"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="register-confirm">Confirmar Contraseña</Label>
                      <Input
                        id="register-confirm"
                        type="password"
                        value={registerData.confirmPassword}
                        onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                        placeholder="••••••••"
                        required
                      />
                    </div>

                    <Button type="submit" className="w-full">
                      Crear Cuenta
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">Al continuar, aceptas nuestros términos y condiciones</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
