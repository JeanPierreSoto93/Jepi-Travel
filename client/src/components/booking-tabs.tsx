import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FaHotel, FaBoxOpen, FaBuilding, FaSearch } from "react-icons/fa";
import { useLocation } from "wouter";

const bookingOptions = [
  { icon: FaBuilding, label: "Tours", route: "/tours" },
  { icon: FaHotel, label: "Hoteles", route: "/hotels" },
  { icon: FaBoxOpen, label: "Paquetes", route: "/packages" },
  { icon: FaSearch, label: "Buscar Reserva", route: "/buscar-reserva" }
];

export default function BookingTabs() {
  const [location, setLocation] = useLocation();

  // Get the current active tab based on the route
  const getCurrentTab = () => {
    const path = location.split('?')[0]; // Remove query parameters
    const option = bookingOptions.find(opt => opt.route === path);
    return option ? option.label.toLowerCase() : "tours";
  };

  const handleTabChange = (value: string) => {
    const option = bookingOptions.find(opt => opt.label.toLowerCase() === value);
    if (option) {
      setLocation(option.route);
    }
  };

  return (
    <div className="flex justify-center -mt-6 relative z-20">
      <Tabs 
        defaultValue={getCurrentTab()} 
        className="w-full max-w-4xl mx-4" 
        onValueChange={handleTabChange}
      >
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
          {bookingOptions.map((option) => (
            <TabsTrigger
              key={option.label}
              value={option.label.toLowerCase()}
              className="flex items-center gap-2"
            >
              <option.icon className="h-4 w-4" />
              <span>{option.label}</span>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
}