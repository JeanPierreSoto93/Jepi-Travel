import { useParams, useLocation } from "wouter";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ImageGallery } from "@/components/ImageGallery";
import { ShareButtons } from "@/components/ShareButtons";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  MapPin,
  Clock,
  Calendar,
  Users,
  Star,
  Compass,
  Sun,
  MountainSnow,
  Coffee
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

// Mock tour data (replace with actual data fetching)
const tour = {
  id: 1,
  title: "Cascadas de Cuetzalan",
  image: "https://images.unsplash.com/photo-1544085311-11a028465b03?q=80&w=1740",
  description: "Explora las majestuosas cascadas de Cuetzalan, incluyendo la famosa cascada Las Brisas y Velo de Novia. Un recorrido que combina naturaleza, aventura y la rica cultura de la región.",
  rating: 4.8,
  reviews: 128,
  price: 1899,
  originalPrice: 2375,
  discount: "20%",
  duration: "8 horas",
  difficulty: "Moderada",
  startTime: "09:00",
  meetingPoint: "Plaza Principal de Cuetzalan",
  maxGroupSize: 12,
  includedItems: [
    "Guía certificado",
    "Equipo de seguridad",
    "Snacks y agua",
    "Transporte local"
  ],
  itinerary: [
    {
      time: "09:00",
      activity: "Encuentro en el punto de partida y briefing de seguridad"
    },
    {
      time: "09:30",
      activity: "Inicio del recorrido hacia la primera cascada"
    },
    {
      time: "11:00",
      activity: "Visita a la Cascada Las Brisas"
    },
    {
      time: "13:00",
      activity: "Almuerzo típico de la región"
    },
    {
      time: "14:30",
      activity: "Visita a la Cascada Velo de Novia"
    },
    {
      time: "17:00",
      activity: "Regreso al punto de partida"
    }
  ],
  additionalImages: [
    "https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?q=80&w=1740",
    "https://images.unsplash.com/photo-1499915174960-6f5340157928?q=80&w=1740",
    "https://images.unsplash.com/photo-1544085311-11a028465b03?q=80&w=1740",
  ]
};

export default function TourDetailPage() {
  const params = useParams();
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{tour.title}</h1>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{tour.meetingPoint}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                      <span>{tour.rating} ({tour.reviews} reseñas)</span>
                    </div>
                  </div>
                </div>
                <ShareButtons
                  title={tour.title}
                  description={tour.description}
                  image={tour.image}
                />
              </div>

              {/* Image Gallery */}
              <ImageGallery mainImage={tour.image} additionalImages={tour.additionalImages} />

              {/* Tour Overview */}
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Descripción del tour</h2>
                <p className="text-gray-600 mb-6">{tour.description}</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-lg">
                    <Clock className="h-6 w-6 text-primary mb-2" />
                    <span className="text-sm font-medium">Duración</span>
                    <span className="text-sm text-gray-600">{tour.duration}</span>
                  </div>
                  <div className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-lg">
                    <MountainSnow className="h-6 w-6 text-primary mb-2" />
                    <span className="text-sm font-medium">Dificultad</span>
                    <span className="text-sm text-gray-600">{tour.difficulty}</span>
                  </div>
                  <div className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-lg">
                    <Users className="h-6 w-6 text-primary mb-2" />
                    <span className="text-sm font-medium">Grupo máximo</span>
                    <span className="text-sm text-gray-600">{tour.maxGroupSize} personas</span>
                  </div>
                  <div className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-lg">
                    <Sun className="h-6 w-6 text-primary mb-2" />
                    <span className="text-sm font-medium">Hora de inicio</span>
                    <span className="text-sm text-gray-600">{tour.startTime}</span>
                  </div>
                </div>
              </Card>

              {/* Itinerary */}
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Itinerario</h2>
                <div className="space-y-4">
                  {tour.itinerary.map((item, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-2 h-2 rounded-full bg-primary"></div>
                        {index !== tour.itinerary.length - 1 && (
                          <div className="w-0.5 h-full bg-gray-200"></div>
                        )}
                      </div>
                      <div className="flex-1 pb-4">
                        <div className="text-sm font-medium">{item.time}</div>
                        <div className="text-gray-600">{item.activity}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Included Items */}
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">¿Qué está incluido?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {tour.includedItems.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Booking Card */}
            <div className="lg:col-span-1">
              <Card className="p-6 sticky top-4">
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-2xl font-bold text-primary">
                        MXN ${tour.price.toLocaleString()}
                      </div>
                      <Badge className="bg-emerald-500">-{tour.discount}</Badge>
                    </div>
                    <div className="text-sm line-through text-gray-400">
                      MXN ${tour.originalPrice.toLocaleString()}
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm text-gray-600">Fecha del tour</label>
                      <Button variant="outline" className="w-full">
                        <Calendar className="h-4 w-4 mr-2" />
                        Seleccionar fecha
                      </Button>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm text-gray-600">Número de personas</label>
                      <Button variant="outline" className="w-full justify-between">
                        2 personas
                        <span className="text-gray-400">▼</span>
                      </Button>
                    </div>
                  </div>

                  <Button
                    className="w-full"
                    size="lg"
                    onClick={() => {
                      // Get current search params from URL
                      const currentParams = new URLSearchParams(window.location.search);
                      // Add tour details to params
                      currentParams.set('type', 'tour');
                      currentParams.set('name', tour.title);
                      currentParams.set('image', tour.image);
                      currentParams.set('price', tour.price.toString());
                      currentParams.set('tourId', params.id);
                      setLocation(`/payment?${currentParams.toString()}`);
                    }}
                  >
                    Reservar ahora
                  </Button>

                  <p className="text-xs text-gray-500 text-center">
                    No se te cobrará nada por ahora
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}