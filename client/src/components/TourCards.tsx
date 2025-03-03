import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const tours = [
  {
    id: 1,
    title: "Aventura en Cuetzalan",
    image: "https://images.unsplash.com/photo-1589487391730-58f20eb2c308?q=80&w=1740", // Cuetzalan landscape
    discount: "20%",
    description: "Descubre la magia del Pueblo Mágico de Cuetzalan, sus cascadas y sitios arqueológicos.",
    startDate: "15 Dic 2025",
    price: 1899,
    originalPrice: 2375
  },
  {
    id: 2,
    title: "Cuetzalan Cultural",
    image: "https://images.unsplash.com/photo-1598885159329-a5983c6f0acc?q=80&w=1740", // Traditional dancers
    discount: "15%",
    description: "Explora las tradiciones, danzas y gastronomía local de Cuetzalan.",
    startDate: "Jun - Sep 2025",
    price: 2199,
    originalPrice: 2599
  },
  {
    id: 3,
    title: "Cascadas y Grutas",
    image: "https://images.unsplash.com/photo-1598884143267-c5c89a8c873f?q=80&w=1740", // Waterfalls
    discount: "25%",
    description: "Visita las impresionantes cascadas y grutas de la región.",
    startDate: "Jun - Sep 2025",
    price: 1699,
    originalPrice: 2265
  }
];

export function TourCards() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Tours en Cuetzalan: Descubre la magia de Puebla</h2>
        <p className="text-gray-600">
          Explora uno de los Pueblos Mágicos más hermosos de México. Desde sus calles empedradas y arquitectura colonial, hasta sus impresionantes cascadas y sitios arqueológicos.
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
                Salidas garantizadas
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