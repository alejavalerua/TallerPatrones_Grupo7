"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import {
  Search,
  ShoppingCart,
  Menu,
  Star,
  Heart,
  Filter,
  Phone,
  Mail,
  LogIn,
  UserCog,
  MessageCircle,
} from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-3">
              <img src="/icon.png" alt="4Code Solutions" className="h-8 w-auto" />
              <h1 className="text-2xl font-bold text-primary">SportFlex</h1>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <a href="#" className="text-foreground hover:text-primary transition-colors">
              Hombres
            </a>
            <a href="#" className="text-foreground hover:text-primary transition-colors">
              Mujeres
            </a>
            <a href="#" className="text-foreground hover:text-primary transition-colors">
              Accesorios
            </a>
            <a href="#" className="text-foreground hover:text-primary transition-colors">
              Ofertas
            </a>
          </nav>

          <div className="flex items-center gap-4">
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Buscar productos..." className="pl-10 w-64" />
            </div>
            <Button variant="ghost" size="icon" title="Iniciar Sesión Usuario">
              <LogIn className="h-5 w-5" />
            </Button>
            <Link href="/admin">
              <Button variant="ghost" size="icon" title="Panel Administrador">
                <UserCog className="h-5 w-5" />
              </Button>
            </Link>
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                2
              </Badge>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-[600px] bg-gradient-to-r from-primary/10 to-accent/10 flex items-center">
        <div className="absolute inset-0 shadow-md">
          <img
            src="/placeholder-ww8ac.png"
            alt="Rendimiento atlético"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <h2 className="text-5xl font-bold text-foreground mb-6">
              Libera Tu <span className="text-primary">Rendimiento</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Ropa deportiva premium diseñada para atletas que exigen excelencia. Experimenta la combinación perfecta de
              comodidad, estilo y rendimiento.
            </p>
            <div className="flex gap-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Comprar Ahora
              </Button>
              <Button size="lg" variant="outline">
                Ver Colecciones
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-foreground mb-4">Colecciones Destacadas</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Descubre nuestras últimas colecciones diseñadas para cada deporte y estilo de vida
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="group cursor-pointer overflow-hidden">
              <div className="relative h-64 overflow-hidden">
                <img
                  src="/mens-athletic-running-gear.png"
                  alt="Colección Hombres"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
              </div>
              <CardContent className="p-6">
                <h4 className="text-xl font-semibold mb-2">Rendimiento Masculino</h4>
                <p className="text-muted-foreground mb-4">Equipamiento de alto rendimiento para el atleta moderno</p>
                <Button variant="outline" className="w-full bg-transparent">
                  Comprar Hombres
                </Button>
              </CardContent>
            </Card>

            <Card className="group cursor-pointer overflow-hidden">
              <div className="relative h-64 overflow-hidden">
                <img
                  src="/women-athletic-yoga-fitness.png"
                  alt="Colección Mujeres"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
              </div>
              <CardContent className="p-6">
                <h4 className="text-xl font-semibold mb-2">Activo Femenino</h4>
                <p className="text-muted-foreground mb-4">Ropa deportiva elegante que se mueve contigo</p>
                <Button variant="outline" className="w-full bg-transparent">
                  Comprar Mujeres
                </Button>
              </CardContent>
            </Card>

            <Card className="group cursor-pointer overflow-hidden">
              <div className="relative h-64 overflow-hidden">
                <img
                  src="/sports-accessories.png"
                  alt="Colección Accesorios"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
              </div>
              <CardContent className="p-6">
                <h4 className="text-xl font-semibold mb-2">Accesorios</h4>
                <p className="text-muted-foreground mb-4">Completa tu entrenamiento con equipamiento premium</p>
                <Button variant="outline" className="w-full bg-transparent">
                  Comprar Accesorios
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h3 className="text-3xl font-bold text-foreground mb-4">Productos Tendencia</h3>
              <p className="text-muted-foreground">Nuestros artículos más populares esta temporada</p>
            </div>
            <Button variant="outline" className="hidden sm:flex bg-transparent">
              <Filter className="h-4 w-4 mr-2" />
              Filtrar
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <Card key={item} className="group cursor-pointer">
                <div className="relative overflow-hidden">
                  <img
                    src={`/premium-athletic-shirt.png?height=300&width=300&query=premium athletic shirt product ${item}`}
                    alt={`Producto ${item}`}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Button
                    size="icon"
                    variant="ghost"
                    className="absolute top-2 right-2 bg-background/80 hover:bg-background"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Badge className="absolute top-2 left-2 bg-accent">Nuevo</Badge>
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center gap-1 mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                    <span className="text-sm text-muted-foreground ml-1">(24)</span>
                  </div>
                  <h4 className="font-semibold mb-1">Camiseta Performance Pro</h4>
                  <p className="text-sm text-muted-foreground mb-3">Tecnología que absorbe la humedad</p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-primary">$189.900 </span>
                    <Button size="sm">Agregar al Carrito</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Service Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-foreground mb-4">Atención al Cliente</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Estamos aquí para ayudarte. Contáctanos por cualquier consulta o soporte que necesites.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="text-center p-6">
              <Phone className="h-12 w-12 text-primary mx-auto mb-4" />
              <h4 className="text-xl font-semibold mb-2">Teléfono</h4>
              <p className="font-semibold mb-2">+57 (1) 234-5678</p>
              <p className="text-muted-foreground">
                <span>Lunes a Viernes</span>
                <br />
                <span>9:00 AM - 6:00 PM</span>
              </p>
            </Card>

            <Card className="text-center p-6">
              <Mail className="h-12 w-12 text-primary mx-auto mb-4" />
              <h4 className="text-xl font-semibold mb-2">Email</h4>
              <p className="text-muted-foreground mb-4">Respuesta en 24 horas</p>
              <p className="font-semibold">soporte@sportflex.com</p>
            </Card>

            <Card className="text-center p-6">
              <MessageCircle className="h-12 w-12 text-primary mx-auto mb-4" />
              <h4 className="text-xl font-semibold mb-2">Chat en Vivo</h4>
              <p className="text-muted-foreground mb-4">Disponible 24/7</p>
              <Link href="/chat">
                <Button className="bg-primary hover:bg-primary/90">Iniciar Chat</Button>
              </Link>
            </Card>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-4">Mantente en el Juego</h3>
          <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Obtén acceso exclusivo a nuevos lanzamientos, consejos de entrenamiento y ofertas especiales
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input placeholder="Ingresa tu email" className="bg-primary-foreground text-foreground" />
            <Button variant="secondary" className="bg-accent hover:bg-accent/90">
              Suscribirse
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4">SportFlex</h4>
              <p className="text-muted-foreground text-sm mb-4">
                Ropa deportiva premium para atletas que exigen excelencia.
              </p>
              <div className="text-sm text-muted-foreground">
                <p className="mb-2">Desarrollado por:</p>
                <p>Juan Carrasquilla</p>
                <p>Gabriel Palencia</p>
                <p>Samuel Robles</p>
                <p>Alejandra Valencia</p>
              </div>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Tienda</h5>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Hombres
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Mujeres
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Accesorios
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Ofertas
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Soporte</h5>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Guía de Tallas
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Devoluciones
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Envíos
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Contacto
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Empresa</h5>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Acerca de
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Carreras
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Prensa
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Privacidad
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2025 SportFlex. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
