import { Link } from "wouter";
import { 
  FaPlane, FaMapMarkerAlt, FaHotel, FaUmbrella, 
  FaPassport, FaGraduationCap, FaPhone, FaBlog
} from "react-icons/fa";

const navItems = [
  { icon: FaPlane, label: "Vuelos", href: "/vuelos" },
  { icon: FaMapMarkerAlt, label: "Tours", href: "/tours" },
  { icon: FaHotel, label: "Hoteles", href: "/hoteles" },
  { icon: FaUmbrella, label: "Seguros", href: "/seguros" },
  { icon: FaPassport, label: "Visas", href: "/visas" },
  { icon: FaGraduationCap, label: "Estudios", href: "/estudios" },
  { icon: FaPhone, label: "Contacto", href: "/contacto" },
  { icon: FaBlog, label: "Blog", href: "/blog" }
];

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/">
              <img 
                src="https://www.mundojoven.com/_next/static/media/logo.a4cb0f51.svg"
                alt="Mundo Joven"
                className="h-8 w-auto"
              />
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <Link 
                key={item.href}
                href={item.href}
                className="flex flex-col items-center px-3 py-2 text-sm font-medium text-gray-600 hover:text-primary transition-colors"
              >
                <item.icon className="h-5 w-5 mb-1" />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-gray-600">
              (55) 54 82 82 82
            </span>
            <Link href="/cuenta" className="text-sm font-medium text-primary">
              Mi Cuenta
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
