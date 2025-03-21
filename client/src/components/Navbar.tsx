import { Link } from "wouter";
import { 
  MapPin, 
  Building2, 
  Package, 
  Search,
  Phone,
  Mail
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { getCurrentClient } from "@/utils/client-detection";
import { preserveAgencyParam } from "@/utils/client-detection";
import type { ClientConfig } from "@/config/clients";

export function Navbar() {
  const currentClient = getCurrentClient();

  // Define all possible nav items
  const allNavItems = {
    tours: { icon: MapPin, label: "Tours", href: "/tours", feature: "showTours" },
    hotels: { icon: Building2, label: "Hoteles", href: "/hotels", feature: "showHotels" },
    packages: { icon: Package, label: "Paquetes", href: "/packages", feature: "showPackages" },
    search: { icon: Search, label: "Buscar Reserva", href: "/buscar-reserva", feature: "showSearch" }
  } as const;

  // Filter nav items based on client type and features
  const getNavItems = () => {
    switch (currentClient.type) {
      case 'hotel':
        // For hotels, only show hotel-specific pages
        return [
          allNavItems.hotels,
          allNavItems.search
        ];
      case 'tour_agency':
        // For tour agencies, show tours and search
        return [
          allNavItems.tours,
          allNavItems.search
        ];
      case 'full_agency':
        // For full agencies, show all enabled features
        return Object.values(allNavItems).filter(item => 
          currentClient.features[item.feature as keyof typeof currentClient.features]
        );
      default:
        return [];
    }
  };

  const navItems = getNavItems();

  return (
    <header className="w-full bg-white shadow-sm">
      <div className="container mx-auto px-4">
        {/* Top Bar */}
        <div className="flex justify-between items-start py-4">
          {/* Logo Section */}
          <Link href={preserveAgencyParam("/")}>
            <span className="text-2xl font-bold text-primary">
              {currentClient.content.brand?.name || currentClient.name}
            </span>
          </Link>

          {/* Contact Info Section - Right Aligned */}
          <div className="flex flex-col items-end gap-2">
            {currentClient.content.contact?.phone && (
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                <span>{currentClient.content.contact.phone}</span>
              </div>
            )}
            {currentClient.content.contact?.email && (
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <span>{currentClient.content.contact.email}</span>
              </div>
            )}
          </div>
        </div>

        <Separator />

        {/* Navigation */}
        <nav className="py-4 overflow-x-auto">
          <div className="flex items-center gap-4 md:gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={preserveAgencyParam(item.href)}
                className="flex flex-col items-center gap-1 text-gray-600 hover:text-primary transition-colors min-w-[70px] md:min-w-[80px]"
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