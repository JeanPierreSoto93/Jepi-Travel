import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { MapPin, Building2, Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { cn } from "@/lib/utils";

interface SearchFormProps {
  isInline?: boolean;
  onSearch?: (searchParams: any) => void;
  searchType?: "hotels" | "tours" | "both";
}

export function SearchForm({ isInline = false, onSearch, searchType = "both" }: SearchFormProps) {
  const [, setLocation] = useLocation();
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [nights, setNights] = useState("");
  const [guests, setGuests] = useState("2");
  const [activeType, setActiveType] = useState(searchType === "both" ? "tours" : searchType);

  const regions = ["Europa", "Asia", "América", "África", "Oceanía"];

  const handleSearch = () => {
    const searchParams = new URLSearchParams();
    if (destination) searchParams.set('destination', destination);
    if (startDate) searchParams.set('startDate', startDate.toISOString());
    if (endDate) searchParams.set('endDate', endDate.toISOString());
    if (nights) searchParams.set('nights', nights);
    if (guests) searchParams.set('guests', guests);
    searchParams.set('type', activeType);

    // If onSearch prop is provided, use that instead of navigation
    if (onSearch) {
      onSearch({
        destination,
        startDate,
        endDate,
        nights,
        guests,
        type: activeType
      });
    } else {
      // Redirect to the appropriate listing page based on search type
      const route = activeType === 'hotels' ? '/hotels' : '/tours';
      setLocation(`${route}?${searchParams.toString()}`);
    }
  };

  const containerClass = isInline 
    ? "" 
    : "container mx-auto px-4 -mt-16 relative z-10";

  const formClass = isInline
    ? "bg-transparent shadow-none p-0"
    : "bg-white rounded-lg shadow-lg p-6";

  const searchTypes = [
    { icon: MapPin, label: "Tours", value: "tours" },
    { icon: Building2, label: "Hoteles", value: "hotels" }
  ];

  const renderSearchContent = (type: "hotels" | "tours") => {
    if (type === "tours") {
      return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <label className="text-sm text-gray-600">Destino</label>
            <Select value={destination} onValueChange={setDestination}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona región" />
              </SelectTrigger>
              <SelectContent>
                {regions.map((region) => (
                  <SelectItem key={region} value={region.toLowerCase()}>
                    {region}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-600">Fecha de salida</label>
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
                  {startDate ? format(startDate, "PPP", { locale: es }) : <span>Selecciona fecha</span>}
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
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-600">Duración</label>
            <Select value={nights} onValueChange={setNights}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona noches" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1-5">1 a 5 noches</SelectItem>
                <SelectItem value="6-10">6 a 10 noches</SelectItem>
                <SelectItem value="11-15">11 a 15 noches</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-600">Viajeros</label>
            <Select value={guests} onValueChange={setGuests}>
              <SelectTrigger>
                <SelectValue placeholder="Número de viajeros" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 viajero</SelectItem>
                <SelectItem value="2">2 viajeros</SelectItem>
                <SelectItem value="3">3 viajeros</SelectItem>
                <SelectItem value="4">4 o más</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <label className="text-sm text-gray-600">Check-in</label>
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
        </div>

        <div className="space-y-2">
          <label className="text-sm text-gray-600">Check-out</label>
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
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <label className="text-sm text-gray-600">Huéspedes</label>
          <Select value={guests} onValueChange={setGuests}>
            <SelectTrigger>
              <SelectValue placeholder="Número de huéspedes" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1 huésped</SelectItem>
              <SelectItem value="2">2 huéspedes</SelectItem>
              <SelectItem value="3">3 huéspedes</SelectItem>
              <SelectItem value="4">4 o más</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    );
  };

  return (
    <div className={containerClass}>
      <motion.div
        initial={isInline ? false : { opacity: 0, y: 20 }}
        animate={isInline ? false : { opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className={formClass}
      >
        {!isInline && (
          <h2 className="text-xl font-semibold mb-4">Encuentra tu próximo destino</h2>
        )}

        {searchType === "both" ? (
          <Tabs value={activeType} onValueChange={setActiveType} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              {searchTypes.map((type) => (
                <TabsTrigger
                  key={type.value}
                  value={type.value}
                  className="flex items-center gap-2"
                >
                  <type.icon className="h-4 w-4" />
                  <span>{type.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="tours" className="mt-0">
              {renderSearchContent("tours")}
            </TabsContent>

            <TabsContent value="hotels" className="mt-0">
              {renderSearchContent("hotels")}
            </TabsContent>
          </Tabs>
        ) : (
          renderSearchContent(searchType as "hotels" | "tours")
        )}

        <div className="mt-6 flex justify-end">
          <Button 
            className="bg-primary hover:bg-primary/90 text-white px-8"
            onClick={handleSearch}
          >
            Buscar
          </Button>
        </div>
      </motion.div>
    </div>
  );
}