import { motion } from "framer-motion";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function HeroSearch() {
  const [date, setDate] = useState<Date>();

  return (
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
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Encuentra tu tour ideal
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Select>
              <option value="">Europa</option>
              <option value="asia">Asia</option>
              <option value="america">América</option>
            </Select>

            <Select>
              <option value="">Madrid</option>
              <option value="barcelona">Barcelona</option>
              <option value="paris">París</option>
            </Select>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Selecciona fecha</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>

            <Button className="bg-primary text-white hover:bg-primary/90">
              Buscar
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
