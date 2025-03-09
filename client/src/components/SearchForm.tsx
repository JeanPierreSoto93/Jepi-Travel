import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { cn } from "@/lib/utils";

interface SearchFormProps {
  isInline?: boolean;
  onSearch?: (searchParams: any) => void;
  initialStartDate?: string;
  initialEndDate?: string;
  initialGuests?: number;
  initialRooms?: number;
}

export function SearchForm({ 
  isInline = false, 
  onSearch, 
  initialStartDate,
  initialEndDate,
  initialGuests = 2,
  initialRooms = 1
}: SearchFormProps) {
  const [location, setLocation] = useLocation();

  // Initialize state from props or URL parameters
  const [startDate, setStartDate] = useState<Date | undefined>(
    initialStartDate ? new Date(initialStartDate) : undefined
  );
  const [endDate, setEndDate] = useState<Date | undefined>(
    initialEndDate ? new Date(initialEndDate) : undefined
  );
  const [guests, setGuests] = useState(String(initialGuests));

  const handleSearch = () => {
    // Prepare search parameters
    const searchParams = {
      startDate,
      endDate,
      guests: Number(guests),
      rooms: initialRooms
    };

    // If onSearch prop is provided, use that instead of navigation
    if (onSearch) {
      onSearch(searchParams);
    } else {
      // Create URL parameters
      const urlParams = new URLSearchParams();
      if (startDate) urlParams.set('startDate', startDate.toISOString());
      if (endDate) urlParams.set('endDate', endDate.toISOString());
      if (guests) urlParams.set('guests', guests);
      if (initialRooms) urlParams.set('rooms', String(initialRooms));
      setLocation(`${location}?${urlParams.toString()}`);
    }
  };

  const containerClass = isInline 
    ? "" 
    : "container mx-auto px-4 relative z-10";

  const formClass = isInline
    ? "bg-transparent shadow-none p-0"
    : "bg-white rounded-lg shadow-lg p-6";

  return (
    <div className={containerClass}>
      <motion.div
        initial={isInline ? false : { opacity: 0, y: 20 }}
        animate={isInline ? false : { opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={formClass}
      >
        {!isInline && (
          <h2 className="text-xl font-semibold mb-4">Encuentra tu próxima aventura</h2>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="text-sm text-gray-600">Fecha de entrada</label>
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
            <label className="text-sm text-gray-600">Fecha de salida</label>
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
                  {endDate ? format(endDate, "PPP", { locale: es }) : <span>Selecciona fecha</span>}
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
                <SelectItem value="4">4 huéspedes</SelectItem>
                <SelectItem value="5">5 huéspedes</SelectItem>
                <SelectItem value="6">6+ huéspedes</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <Button onClick={handleSearch}>
            Buscar
          </Button>
        </div>
      </motion.div>
    </div>
  );
}