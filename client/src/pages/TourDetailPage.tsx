import { useState } from 'react';
import { useParams, useLocation } from "wouter";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ImageGallery } from "@/components/ImageGallery";
import { ShareButtons } from "@/components/ShareButtons";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import {
  MapPin,
  Clock,
  Calendar as CalendarIcon,
  Users,
  Star,
  Compass,
  Sun,
  MountainSnow,
  Coffee
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

// Add more images to the mock tour data
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
  images: [
    {
      url: "https://images.unsplash.com/photo-1544085311-11a028465b03?q=80&w=1740",
      description: "Vista panorámica de la cascada principal"
    },
    {
      url: "https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?q=80&w=1740",
      description: "Sendero entre la vegetación"
    },
    {
      url: "https://images.unsplash.com/photo-1499915174960-6f5340157928?q=80&w=1740",
      description: "Formaciones rocosas en la cascada"
    },
    {
      url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1740",
      description: "Vista desde lo alto de la cascada"
    },
    {
      url: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1740",
      description: "Paisaje natural del entorno"
    },
    {
      url: "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?q=80&w=1740",
      description: "Amanecer en Cuetzalan"
    }
  ]
};

export default function TourDetailPage() {
  const params = useParams();
  const [, setLocation] = useLocation();
  const [selectedImage, setSelectedImage] = useState(0);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  // Get URL parameters
  const searchParams = new URLSearchParams(window.location.search);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    searchParams.get("startDate") ? new Date(searchParams.get("startDate")!) : undefined
  );
  const [guestCount, setGuestCount] = useState(searchParams.get("guests") || "2");

  const handleSearch = () => {
    // Get current search params from URL
    const currentParams = new URLSearchParams(window.location.search);

    // Update search parameters
    if (selectedDate) {
      currentParams.set('startDate', selectedDate.toISOString());
    }
    currentParams.set('guests', guestCount);
    currentParams.set('type', 'tour');
    currentParams.set('name', tour.title);
    currentParams.set('image', tour.image);
    currentParams.set('price', tour.price.toString());
    currentParams.set('tourId', params.id);

    setLocation(`/payment?${currentParams.toString()}`);
  };

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

              {/* Image Gallery Grid */}
              <div className="relative overflow-hidden rounded-lg">
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src={tour.images[selectedImage].url}
                    alt={tour.images[selectedImage].description}
                    className="object-cover w-full h-full rounded-lg cursor-pointer"
                    onClick={() => setIsGalleryOpen(true)}
                  />
                </div>
                <div className="grid grid-cols-5 gap-2 mt-2">
                  {tour.images.slice(0, 5).map((image, index) => (
                    <div
                      key={index}
                      className={`aspect-w-4 aspect-h-3 cursor-pointer overflow-hidden rounded-lg 
                        ${selectedImage === index ? 'ring-2 ring-primary' : ''}`}
                      onClick={() => setSelectedImage(index)}
                    >
                      <img
                        src={image.url}
                        alt={image.description}
                        className="object-cover w-full h-full hover:opacity-75 transition-opacity"
                      />
                      {index === 4 && tour.images.length > 5 && (
                        <div
                          className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white"
                          onClick={() => setIsGalleryOpen(true)}
                        >
                          +{tour.images.length - 5}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>


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
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !selectedDate && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {selectedDate ? (
                              format(selectedDate, "PPP", { locale: es })
                            ) : (
                              <span>Seleccionar fecha</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={selectedDate}
                            onSelect={setSelectedDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm text-gray-600">Número de personas</label>
                      <Select value={guestCount} onValueChange={setGuestCount}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona número de personas" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 persona</SelectItem>
                          <SelectItem value="2">2 personas</SelectItem>
                          <SelectItem value="3">3 personas</SelectItem>
                          <SelectItem value="4">4 personas</SelectItem>
                          <SelectItem value="5">5 personas</SelectItem>
                          <SelectItem value="6">6+ personas</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Button
                    className="w-full"
                    size="lg"
                    onClick={handleSearch}
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

      {/* Full Image Gallery Modal */}
      {isGalleryOpen && (
        <ImageGallery
          images={tour.images}
          onClose={() => setIsGalleryOpen(false)}
          initialIndex={selectedImage}
        />
      )}
    </div>
  );
}