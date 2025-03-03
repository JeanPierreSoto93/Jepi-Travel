import { Link } from "wouter";
import { Instagram, Facebook, Twitter, Youtube, Phone, Mail, MapPin } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();
  
  return (
    <footer className="bg-[#02060f] text-white py-12">
      <div className="container mx-auto px-4">
        {/* Logo and Tagline */}
        <div className="mb-8">
          <Link href="/">
            <img
              src="/logo.svg" // We'll need to update this path
              alt="JepiTravel"
              className="h-8 mb-2"
            />
          </Link>
          <p className="text-sm">30 AÑOS INSPIRANDO VIAJEROS</p>
        </div>

        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span>(55) 54 82 82 82</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <span>contacto@jepitravel.com</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <Link href="/sucursales">Encuentra tu Sucursal</Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Enlaces rápidos</h3>
            <ul className="space-y-2">
              <li><Link href="/politicas-de-privacidad">Políticas de Privacidad</Link></li>
              <li><Link href="/grupos">Grupos</Link></li>
              <li><Link href="/visas">Visas</Link></li>
              <li><Link href="/franquicias">Franquicias</Link></li>
              <li><Link href="/blog">Blog</Link></li>
            </ul>
          </div>

          {/* Destinations */}
          <div>
            <h3 className="font-semibold mb-4">Destinos populares</h3>
            <ul className="space-y-2">
              <li><Link href="/tours/cuetzalan">Tour a Cuetzalan</Link></li>
              <li><Link href="/tours/cascadas">Cascadas de Cuetzalan</Link></li>
              <li><Link href="/tours/centro-historico">Centro Histórico</Link></li>
              <li><Link href="/tours/experiencias">Experiencias locales</Link></li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="font-semibold mb-4">Síguenos en redes</h3>
            <div className="flex gap-4">
              <a href="https://instagram.com/jepitravel" target="_blank" rel="noopener noreferrer">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://facebook.com/jepitravel" target="_blank" rel="noopener noreferrer">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://twitter.com/jepitravel" target="_blank" rel="noopener noreferrer">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://youtube.com/jepitravel" target="_blank" rel="noopener noreferrer">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-8 text-center text-sm">
          <p>Copyright © JepiTravel {year}</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
