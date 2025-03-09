import { useState } from "react";
import { useLocation } from "wouter";
import { Navbar } from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { MapPin, CalendarIcon, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Footer } from "@/components/Footer";
import { TourCards } from "@/components/TourCards";

// Destinations data
const destinations = [
  {
    id: "cuetzalan",
    name: "Cuetzalan, Puebla",
    description: "Ciudad mágica en el corazón de la Sierra Norte"
  }
];

const searchTypes = [
  { id: "tours", name: "Tours" },
  { id: "hotels", name: "Hoteles" },
  { id: "packages", name: "Paquetes" }
];

export default function Home() {
  const [, setLocation] = useLocation();
  const [searchType, setSearchType] = useState("tours");
  const [destination, setDestination] = useState(destinations[0].id);
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [guests, setGuests] = useState("2");

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (destination) params.set('destination', destination);
    if (startDate) params.set('startDate', startDate.toISOString());
    if (endDate) params.set('endDate', endDate.toISOString());
    if (guests) params.set('guests', guests);

    // Redirect to appropriate page based on search type
    const routes = {
      tours: "/tours",
      hotels: "/hotels",
      packages: "/packages"
    };

    setLocation(`${routes[searchType as keyof typeof routes]}?${params.toString()}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main>
        {/* Hero Section with Search */}
        <div className="relative h-[500px] flex items-center justify-center">
          {/* Background Image */}
          <div 
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1682686580433-c4c4e9d8c515?q=80&w=1920&auto=format')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "brightness(0.7)"
            }}
          />

          <div className="relative z-10 w-full max-w-4xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg shadow-xl p-6"
            >
              <h1 className="text-2xl font-bold mb-6">
                Encuentra tu próxima aventura
              </h1>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Select value={searchType} onValueChange={setSearchType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona tipo de búsqueda" />
                    </SelectTrigger>
                    <SelectContent>
                      {searchTypes.map((type) => (
                        <SelectItem key={type.id} value={type.id}>
                          {type.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={destination} onValueChange={setDestination}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona destino">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          <span>{destinations.find(d => d.id === destination)?.name}</span>
                        </div>
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {destinations.map((dest) => (
                        <SelectItem key={dest.id} value={dest.id}>
                          <div>
                            <div className="font-medium">{dest.name}</div>
                            <div className="text-xs text-gray-500">{dest.description}</div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !startDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {startDate ? format(startDate, "PPP", { locale: es }) : <span>Fecha de entrada</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={startDate}
                        onSelect={setStartDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>

                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !endDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {endDate ? format(endDate, "PPP", { locale: es }) : <span>Fecha de salida</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={endDate}
                        onSelect={setEndDate}
                        initialFocus
                        disabled={(date) => date < (startDate || new Date())}
                      />
                    </PopoverContent>
                  </Popover>

                  <Select value={guests} onValueChange={setGuests}>
                    <SelectTrigger>
                      <SelectValue placeholder="Número de huéspedes" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 huésped</SelectItem>
                      <SelectItem value="2">2 huéspedes</SelectItem>
                      <SelectItem value="3">3 huéspedes</SelectItem>
                      <SelectItem value="4">4 huéspedes</SelectItem>
                      <SelectItem value="5">5 huéspedes</SelectItem>
                      <SelectItem value="6">6+ huéspedes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleSearch}>
                    Buscar
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <TourCards />
      </main>
      <Footer />
    </div>
  );
}