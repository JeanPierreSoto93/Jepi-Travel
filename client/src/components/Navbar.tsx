import { Link } from "wouter";
import { 
  MapPin, 
  Building2, 
  Package, 
  Search,
  Phone,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "./theme-toggle";

export function Navbar() {
  const navItems = [
    { icon: MapPin, label: "Tours", href: "/tours" },
    { icon: Building2, label: "Hoteles", href: "/hotels" },
    { icon: Package, label: "Paquetes", href: "/packages" },
    { icon: Search, label: "Buscar Reserva", href: "/buscar-reserva" }
  ];

  return (
    <header className="w-full bg-white shadow-sm">
      <div className="container mx-auto px-4">
        {/* Top Bar */}
        <div className="flex items-center justify-between py-2">
          <Link href="/">
            <span className="text-2xl font-bold text-primary">JepiTravel</span>
          </Link>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-primary" />
              <span className="text-sm">(55) 54 82 82 82</span>
            </div>
            <ThemeToggle />
          </div>
        </div>

        <Separator />

        {/* Navigation */}
        <nav className="flex items-center justify-between py-4 overflow-x-auto">
          <div className="flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
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