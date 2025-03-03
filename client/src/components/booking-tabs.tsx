import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FaPlane, FaLock, FaHotel, FaGlobe, FaBuilding } from "react-icons/fa";

const bookingOptions = [
  { icon: FaPlane, label: "Vuelos" },
  { icon: FaLock, label: "Seguros" },
  { icon: FaHotel, label: "Tours" },
  { icon: FaGlobe, label: "Vuelo + Hotel" },
  { icon: FaBuilding, label: "Hoteles" }
];

export default function BookingTabs() {
  return (
    <div className="flex justify-center -mt-6 relative z-20">
      <Tabs defaultValue="vuelos" className="w-full max-w-4xl mx-4">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-5">
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
