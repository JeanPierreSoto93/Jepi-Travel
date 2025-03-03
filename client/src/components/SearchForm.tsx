import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const searchTypes = [
  { icon: MapPin, label: "Tours", value: "tours" },
  { icon: Building2, label: "Hoteles", value: "hotels" }
];

export function SearchForm() {
  const [destination, setDestination] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [nights, setNights] = useState("11 a 15 noches");
  const regions = ["Europa", "Asia", "América", "África", "Oceanía"];

  const CommonDateSelect = () => (
    <Select value={selectedDate} onValueChange={setSelectedDate}>
      <SelectTrigger>
        <SelectValue placeholder="Abril 2025" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="abril-2025">Abril 2025</SelectItem>
        <SelectItem value="mayo-2025">Mayo 2025</SelectItem>
        <SelectItem value="junio-2025">Junio 2025</SelectItem>
      </SelectContent>
    </Select>
  );

  return (
    <div className="container mx-auto px-4 -mt-16 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white rounded-lg shadow-lg p-6"
      >
        <h2 className="text-xl font-semibold mb-4">Encuentra tu próximo destino</h2>

        <Tabs defaultValue="tours" className="w-full">
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

          {/* Tours Form */}
          <TabsContent value="tours" className="mt-0">
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
                <label className="text-sm text-gray-600">Desde</label>
                <Input placeholder="Madrid" />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-600">Fecha</label>
                <CommonDateSelect />
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
            </div>
          </TabsContent>

          {/* Hotels Form */}
          <TabsContent value="hotels" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="text-sm text-gray-600">Destino</label>
                <Input placeholder="¿A dónde vas?" />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-600">Check-in</label>
                <CommonDateSelect />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-600">Check-out</label>
                <CommonDateSelect />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-600">Huéspedes</label>
                <Select defaultValue="2">
                  <SelectTrigger>
                    <SelectValue placeholder="Número de huéspedes" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 huésped</SelectItem>
                    <SelectItem value="2">2 huéspedes</SelectItem>
                    <SelectItem value="3">3 huéspedes</SelectItem>
                    <SelectItem value="4">4 huéspedes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>

          <div className="mt-6 flex justify-end">
            <Button className="bg-primary hover:bg-primary/90 text-white px-8">
              Buscar
            </Button>
          </div>
        </Tabs>
      </motion.div>
    </div>
  );
}