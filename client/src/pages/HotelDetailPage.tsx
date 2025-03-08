import { useParams } from "wouter";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ImageGallery } from "@/components/ImageGallery";
import { ShareButtons } from "@/components/ShareButtons";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { 
  Wifi, 
  Waves, 
  Coffee, 
  ParkingCircle, 
  Star,
  MapPin,
  Phone,
  Clock,
  Calendar 
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

// Mock hotel data (replace with actual data fetching)
const hotel = {
  id: 1,
  name: "Hotel Boutique Cuetzalan",
  image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1740",
  description: "Hermoso hotel boutique en el corazón de Cuetzalan, con vistas panorámicas y arquitectura colonial. Nuestras habitaciones combinan el encanto tradicional con comodidades modernas para una estancia inolvidable.",
  rating: 4.8,
  reviews: 128,
  price: 1899,
  originalPrice: 2375,
  discount: "20%",
  amenities: ["wifi", "pool", "parking", "restaurant"],
  roomTypes: ["Individual", "Doble", "Suite"],
  location: "Centro Histórico, Cuetzalan",
  distance: "0.2 km del centro",
  checkIn: "15:00",
  checkOut: "12:00",
  phone: "(555) 123-4567",
  additionalImages: [
    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1740",
    "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=1740",
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1740",
  ]
};

const getAmenityIcon = (amenity: string) => {
  switch (amenity) {
    case 'wifi':
      return <Wifi className="h-4 w-4" />;
    case 'pool':
      return <Waves className="h-4 w-4" />;
    case 'parking':
      return <ParkingCircle className="h-4 w-4" />;
    case 'restaurant':
      return <Coffee className="h-4 w-4" />;
    default:
      return null;
  }
};

export default function HotelDetailPage() {
  const params = useParams();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold mb-2">{hotel.name}</h1>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{hotel.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                    <span>{hotel.rating} ({hotel.reviews} reseñas)</span>
                  </div>
                </div>
              </div>
              <ShareButtons 
                title={hotel.name}
                description={hotel.description}
                image={hotel.image}
              />
            </div>

            {/* Image Gallery */}
            <ImageGallery mainImage={hotel.image} additionalImages={hotel.additionalImages} />

            {/* Description */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Descripción</h2>
              <p className="text-gray-600">{hotel.description}</p>
            </Card>

            {/* Amenities */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Servicios y comodidades</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {hotel.amenities.map((amenity) => (
                  <div key={amenity} className="flex items-center gap-2">
                    {getAmenityIcon(amenity)}
                    <span className="capitalize">{amenity}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Hotel Policies */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Información importante</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium mb-2">Horarios</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span>Check-in: {hotel.checkIn}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span>Check-out: {hotel.checkOut}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Contacto</h3>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <span>{hotel.phone}</span>
                  </div>
                </div>
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
                      MXN ${hotel.price.toLocaleString()}
                    </div>
                    <Badge className="bg-emerald-500">-{hotel.discount}</Badge>
                  </div>
                  <div className="text-sm line-through text-gray-400">
                    MXN ${hotel.originalPrice.toLocaleString()}
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm text-gray-600">Check-in</label>
                      <Button variant="outline" className="w-full">
                        <Calendar className="h-4 w-4 mr-2" />
                        Seleccionar
                      </Button>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-gray-600">Check-out</label>
                      <Button variant="outline" className="w-full">
                        <Calendar className="h-4 w-4 mr-2" />
                        Seleccionar
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm text-gray-600">Huéspedes</label>
                    <Button variant="outline" className="w-full justify-between">
                      2 adultos
                      <span className="text-gray-400">▼</span>
                    </Button>
                  </div>
                </div>

                <Button className="w-full" size="lg">
                  Reservar ahora
                </Button>

                <p className="text-xs text-gray-500 text-center">
                  No se te cobrará nada por ahora
                </p>
              </div>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}