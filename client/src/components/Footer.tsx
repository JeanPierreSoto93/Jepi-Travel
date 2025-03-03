import { Link } from "wouter";
import { Instagram, Facebook, Twitter, Youtube, Phone, Mail, MapPin } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#02060f] text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Logo and Contact Info */}
          <div className="space-y-6">
            <Link href="/">
              <span className="text-3xl font-bold text-primary">JepiTravel</span>
            </Link>
            <p className="text-sm text-gray-400">30 AÑOS INSPIRANDO VIAJEROS</p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary" />
                <a href="tel:5554828282" className="hover:text-primary transition-colors">
                  (55) 54 82 82 82
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary" />
                <a href="mailto:contacto@jepitravel.com" className="hover:text-primary transition-colors">
                  contacto@jepitravel.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-primary" />
                <Link href="/sucursales" className="hover:text-primary transition-colors">
                  Encuentra tu Sucursal
                </Link>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Enlaces rápidos</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/politicas-de-privacidad" className="text-gray-400 hover:text-primary transition-colors">
                  Políticas de Privacidad
                </Link>
              </li>
              <li>
                <Link href="/grupos" className="text-gray-400 hover:text-primary transition-colors">
                  Grupos
                </Link>
              </li>
              <li>
                <Link href="/visas" className="text-gray-400 hover:text-primary transition-colors">
                  Visas
                </Link>
              </li>
              <li>
                <Link href="/franquicias" className="text-gray-400 hover:text-primary transition-colors">
                  Franquicias
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Tours */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Tours en Cuetzalan</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/tours/cascadas" className="text-gray-400 hover:text-primary transition-colors">
                  Cascadas de Cuetzalan
                </Link>
              </li>
              <li>
                <Link href="/tours/centro" className="text-gray-400 hover:text-primary transition-colors">
                  Centro Histórico
                </Link>
              </li>
              <li>
                <Link href="/tours/grutas" className="text-gray-400 hover:text-primary transition-colors">
                  Grutas y Cavernas
                </Link>
              </li>
              <li>
                <Link href="/tours/gastronomia" className="text-gray-400 hover:text-primary transition-colors">
                  Tour Gastronómico
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Síguenos</h3>
            <div className="flex gap-4">
              {[
                { icon: Instagram, href: "https://instagram.com/jepitravel" },
                { icon: Facebook, href: "https://facebook.com/jepitravel" },
                { icon: Twitter, href: "https://twitter.com/jepitravel" },
                { icon: Youtube, href: "https://youtube.com/jepitravel" }
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-800 p-2 rounded-full hover:bg-primary transition-colors"
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <Separator className="bg-gray-800 my-8" />

        {/* Copyright */}
        <div className="text-center text-sm text-gray-400">
          <p>Copyright © {year} JepiTravel. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;