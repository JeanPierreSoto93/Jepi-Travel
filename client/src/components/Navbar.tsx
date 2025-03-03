import { Link } from "wouter";
import { 
  Plane, 
  Shield, 
  MapPin, 
  Globe2, 
  Building2, 
  Umbrella, 
  ShoppingBag,
  Package,
  UserCircle2,
  GraduationCap,
  Phone,
  FileText,
  MousePointer2
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

export function Navbar() {
  const navItems = [
    { icon: Plane, label: "Vuelos" },
    { icon: Shield, label: "Seguros" },
    { icon: MapPin, label: "Tours" },
    { icon: Globe2, label: "Vuelos + Hotel" },
    { icon: Building2, label: "Hoteles" },
    { icon: Umbrella, label: "Disney" },
    { icon: ShoppingBag, label: "Paquetes" },
    { icon: Package, label: "Experiencias" },
    { icon: UserCircle2, label: "Cruceros" },
    { icon: GraduationCap, label: "Estudios en el extranjero" }
  ];

  return (
    <header className="w-full bg-white shadow-sm">
      <div className="container mx-auto px-4">
        {/* Top Bar */}
        <div className="flex items-center justify-between py-2">
          <Link href="/">
            <img
              src="https://www.mundojoven.com/_next/static/media/logo.a4cb0f51.svg"
              alt="Mundo Joven"
              className="h-8"
            />
          </Link>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-primary" />
              <span className="text-sm">(55) 54 82 82 82</span>
            </div>
            <Link href="/blog" className="flex items-center gap-2 hover:text-primary transition-colors">
              <FileText className="h-4 w-4" />
              <span className="text-sm">Nuestro Blog</span>
            </Link>
            <Link href="/sucursales" className="flex items-center gap-2 hover:text-primary transition-colors">
              <MousePointer2 className="h-4 w-4" />
              <span className="text-sm">Sucursales Mundo Joven</span>
            </Link>
          </div>
        </div>

        <Separator />

        {/* Navigation */}
        <nav className="flex items-center justify-between py-4 overflow-x-auto">
          <div className="flex items-center gap-6">
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={`/${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                className="flex flex-col items-center gap-1 text-gray-600 hover:text-primary transition-colors min-w-[80px]"
              >
                <item.icon className="h-5 w-5" />
                <span className="text-xs text-center whitespace-nowrap">{item.label}</span>
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;