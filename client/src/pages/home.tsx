import { useState } from "react";
import { useLocation } from "wouter";
import { Navbar } from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { MapPin, CalendarIcon, Building2, Package, Map } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Footer } from "@/components/Footer";
import { TourCards } from "@/components/TourCards";
import { getCurrentClient } from "@/utils/client-detection";
import { HotelCards } from "@/components/HotelCards";
import { preserveAgencyParam } from "@/utils/client-detection";

// Destinations data
const destinations = [
  {
    id: "cuetzalan",
    name: "Cuetzalan, Puebla",
    description: "Ciudad mágica en el corazón de la Sierra Norte"
  }
];

export default function Home() {
  const [, setLocation] = useLocation();
  const currentClient = getCurrentClient();

  // Set initial search type based on client type
  const initialSearchType = () => {
    switch(currentClient.type) {
      case 'hotel':
        return 'hotels';
      case 'tour_agency':
        return 'tours';
      default:
        return 'tours';
    }
  };

  const [searchType, setSearchType] = useState(initialSearchType());
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

    // Handle navigation based on client type
    let targetUrl = '';

    switch(currentClient.type) {
      case 'hotel':
        // Direct to hotel detail page for hotel-only clients
        targetUrl = `/hotels/${currentClient.id}?${params.toString()}`;
        break;
      case 'tour_agency':
        // Direct to tours list for tour agencies
        targetUrl = `/tours?${params.toString()}`;
        break;
      case 'full_agency':
        // Direct to appropriate list page based on search type
        const routes = {
          tours: "/tours",
          hotels: "/hotels",
          packages: "/packages"
        };
        targetUrl = `${routes[searchType as keyof typeof routes]}?${params.toString()}`;
        break;
    }

    setLocation(preserveAgencyParam(targetUrl));
  };

  const renderSearchForm = () => {
    // Common destination selector
    const DestinationSelect = () => (
      <Select value={destination} onValueChange={setDestination}>
        <SelectTrigger>
          <SelectValue placeholder="¿A dónde quieres ir?">
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
    );

    // Common guests selector with customizable labels
    const GuestsSelect = ({ label = "huéspedes" }) => (
      <Select value={guests} onValueChange={setGuests}>
        <SelectTrigger>
          <SelectValue placeholder={`Número de ${label}`} />
        </SelectTrigger>
        <SelectContent>
          {[1, 2, 3, 4, 5, 6].map((num) => (
            <SelectItem key={num} value={num.toString()}>
              {num} {num === 1 ? label.slice(0, -2) : label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );

    // Date selector component
    const DateSelector = ({ label, value, onChange, minDate }: any) => (
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !value && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {value ? format(value, "PPP", { locale: es }) : <span>{label}</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={value}
            onSelect={onChange}
            initialFocus
            disabled={minDate ? (date) => date < minDate : undefined}
          />
        </PopoverContent>
      </Popover>
    );

    switch (searchType) {
      case "tours":
        return (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <DestinationSelect />
            <DateSelector
              label="Fecha del tour"
              value={startDate}
              onChange={setStartDate}
            />
            <GuestsSelect label="personas" />
            <Button onClick={handleSearch} className="w-full">
              Buscar Tours
            </Button>
          </div>
        );

      case "hotels":
        return (
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <DestinationSelect />
            <DateSelector
              label="Check-in"
              value={startDate}
              onChange={setStartDate}
            />
            <DateSelector
              label="Check-out"
              value={endDate}
              onChange={setEndDate}
              minDate={startDate || new Date()}
            />
            <GuestsSelect label="huéspedes" />
            <Button onClick={handleSearch} className="w-full">
              Buscar Hoteles
            </Button>
          </div>
        );

      case "packages":
        return (
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <DestinationSelect />
            <DateSelector
              label="Inicio del viaje"
              value={startDate}
              onChange={setStartDate}
            />
            <DateSelector
              label="Fin del viaje"
              value={endDate}
              onChange={setEndDate}
              minDate={startDate || new Date()}
            />
            <GuestsSelect label="viajeros" />
            <Button onClick={handleSearch} className="w-full">
              Buscar Paquetes
            </Button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main>
        {/* Hero Section with Search */}
        <div className="relative h-[800px] flex items-center justify-center">
          {/* Background Image with Overlay */}
          <div
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: `url('${currentClient.content.hero.backgroundImage}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* Very light gradient overlay for better image visibility */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/20" />
          </div>

          {/* Content */}
          <div className="relative z-10 w-full max-w-7xl mx-auto px-4">
            {/* Hero Text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-white text-center mb-24"
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white drop-shadow-lg">
                {currentClient.content.hero.title}
              </h1>
              <p className="text-xl md:text-2xl text-white/90 font-medium drop-shadow-md max-w-2xl mx-auto">
                {currentClient.content.hero.subtitle}
              </p>
            </motion.div>

            {/* Search Box */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white/95 backdrop-blur-sm rounded-lg shadow-xl p-6 mt-24"
            >
              {currentClient.type === 'full_agency' ? (
                <Tabs defaultValue={searchType} value={searchType} onValueChange={setSearchType}>
                  <TabsList className="grid w-full grid-cols-3 mb-6">
                    {currentClient.features.showTours && (
                      <TabsTrigger value="tours" className="flex items-center gap-2">
                        <Map className="h-4 w-4" />
                        <span>Tours</span>
                      </TabsTrigger>
                    )}
                    {currentClient.features.showHotels && (
                      <TabsTrigger value="hotels" className="flex items-center gap-2">
                        <Building2 className="h-4 w-4" />
                        <span>Hoteles</span>
                      </TabsTrigger>
                    )}
                    {currentClient.features.showPackages && (
                      <TabsTrigger value="packages" className="flex items-center gap-2">
                        <Package className="h-4 w-4" />
                        <span>Paquetes</span>
                      </TabsTrigger>
                    )}
                  </TabsList>

                  <TabsContent value="tours" className="mt-0">
                    {renderSearchForm()}
                  </TabsContent>

                  <TabsContent value="hotels" className="mt-0">
                    {renderSearchForm()}
                  </TabsContent>

                  <TabsContent value="packages" className="mt-0">
                    {renderSearchForm()}
                  </TabsContent>
                </Tabs>
              ) : (
                // For single-type agencies, show only relevant form
                renderSearchForm()
              )}
            </motion.div>
          </div>
        </div>

        {/* Show tour/hotel cards based on client type */}
        {(currentClient.type === 'full_agency' || currentClient.type === 'tour_agency') && <TourCards />}
        {(currentClient.type === 'full_agency' || currentClient.type === 'hotel') && <HotelCards />}

      </main>
      <Footer />
    </div>
  );
}