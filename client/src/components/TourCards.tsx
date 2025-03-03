import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const tours = [
  {
    id: 1,
    title: "Cascadas de Cuetzalan",
    image: "https://images.unsplash.com/photo-1544085311-11a028465b03?q=80&w=1740",
    discount: "20%",
    description: "Explora las majestuosas cascadas de Cuetzalan, incluyendo la famosa cascada Las Brisas y Velo de Novia.",
    startDate: "15 Dic 2025",
    price: 1899,
    originalPrice: 2375
  },
  {
    id: 2,
    title: "Centro Histórico y Artesanías",
    image: "https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?q=80&w=1740",
    discount: "15%",
    description: "Recorre el centro histórico de Cuetzalan, visita su iglesia principal y mercado de artesanías.",
    startDate: "Jun - Sep 2025",
    price: 2199,
    originalPrice: 2599
  },
  {
    id: 3,
    title: "Grutas de Cuetzalan",
    image: "https://images.unsplash.com/photo-1499915174960-6f5340157928?q=80&w=1740",
    discount: "25%",
    description: "Aventúrate en las misteriosas grutas de Cuetzalan y descubre sus formaciones geológicas.",
    startDate: "Jun - Sep 2025",
    price: 1699,
    originalPrice: 2265
  }
];

export function TourCards() {
  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h2 className="text-2xl font-bold mb-2">Tours en Cuetzalan: Pueblo Mágico de Puebla</h2>
        <p className="text-gray-600">
          Descubre la magia de Cuetzalan del Progreso, un pueblo mágico lleno de historia, tradiciones y belleza natural.
          Desde cascadas impresionantes hasta arquitectura colonial y rica gastronomía.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tours.map((tour, index) => (
          <motion.div
            key={tour.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1">
              <div className="relative">
                <div className="overflow-hidden">
                  <img 
                    src={tour.image} 
                    alt={tour.title}
                    className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
                  />
                </div>
                <Badge 
                  className="absolute top-4 left-4 bg-white text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300"
                >
                  Salidas garantizadas
                </Badge>
                <Badge 
                  variant="destructive" 
                  className="absolute top-4 right-4 group-hover:scale-110 transition-transform duration-300"
                >
                  Hasta {tour.discount} de descuento
                </Badge>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors duration-300">
                  {tour.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4 group-hover:text-gray-800 transition-colors duration-300">
                  {tour.description}
                </p>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-600">Fechas de Viaje</div>
                    <div className="font-semibold group-hover:text-primary transition-colors duration-300">
                      {tour.startDate}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-gray-600">Precio desde</div>
                      <div className="text-xl font-bold text-primary group-hover:scale-105 transition-transform duration-300">
                        MXN$ {tour.price.toLocaleString()}
                      </div>
                      <div className="text-sm line-through text-gray-400">
                        MXN$ {tour.originalPrice.toLocaleString()}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Button 
                      variant="outline"
                      className="group-hover:border-primary group-hover:text-primary transition-colors duration-300"
                    >
                      Más información
                    </Button>
                    <Button className="group-hover:scale-105 transition-transform duration-300">
                      Reservar ahora
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}