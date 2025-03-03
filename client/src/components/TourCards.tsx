import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

const tours = [
  {
    id: 1,
    title: "Lo mejor de Europa",
    image: "https://images.unsplash.com/photo-1513026705753-bc3fffca8bf4?q=80&w=1740",
    discount: "20%",
    description: "Incluye visitas indicadas en el itinerario, alojamiento y desayunos.",
    startDate: "15 Dic 2025",
    price: 45365,
    originalPrice: 56705
  },
  {
    id: 2,
    title: "París y Madrid express",
    image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=1740",
    discount: "35%",
    description: "Incluye visitas indicadas en el itinerarios.",
    startDate: "Jun - Sep 2025",
    price: 22896,
    originalPrice: 35225
  },
  {
    id: 3,
    title: "Europa maravillosa",
    image: "https://images.unsplash.com/photo-1520175480921-4edfa2983e0f?q=80&w=1740",
    discount: "20%",
    description: "Incluye visitas indicadas en el itinerario, alojamiento y desayunos.",
    startDate: "Jun - Sep 2025",
    price: 44777,
    originalPrice: 55973
  }
];

export function TourCards() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Tours a Europa: Descubre los mejores destinos</h2>
        <p className="text-gray-600">
          Sumérgete en el viejo continente. Desde las animadas calles de Madrid, los románticos rincones de París, la histórica Londres y la eterna Roma.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tours.map((tour) => (
          <Card key={tour.id} className="overflow-hidden">
            <div className="relative">
              <img 
                src={tour.image} 
                alt={tour.title}
                className="w-full h-48 object-cover"
              />
              <Badge className="absolute top-4 left-4 bg-white text-primary">
                Desde cualquier parte de la república
              </Badge>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{tour.title}</h3>
              <p className="text-sm text-gray-600 mb-4">{tour.description}</p>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">Fechas de Viaje</div>
                  <div className="font-semibold">{tour.startDate}</div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-gray-600">Precio desde</div>
                    <div className="text-xl font-bold text-primary">
                      MXN$ {tour.price.toLocaleString()}
                    </div>
                    <div className="text-sm line-through text-gray-400">
                      MXN$ {tour.originalPrice.toLocaleString()}
                    </div>
                  </div>
                  <Badge variant="destructive">
                    Hasta {tour.discount} de descuento
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline">Solicita más info</Button>
                  <Button>Ver paquete</Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
