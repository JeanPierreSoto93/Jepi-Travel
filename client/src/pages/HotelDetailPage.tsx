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
  Calendar,
  Users 
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
  amenities: ["wifi", "pool", "parking", "restaurant"],
  location: "Centro Histórico, Cuetzalan",
  checkIn: "15:00",
  checkOut: "12:00",
  phone: "(555) 123-4567",
  additionalImages: [
    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1740",
    "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=1740",
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1740",
    "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1740",
    "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=1740",
    "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?q=80&w=1740",
    "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=1740",
  ],
  rooms: [
    {
      id: 1,
      name: "Junior Suite King Bed",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1740",
      size: "35 metros cuadrados",
      bedType: "1 cama King y 1 cama plegable individual",
      maxGuests: 3,
      amenities: ["Todo incluido", "Estacionamiento gratis", "WiFi gratis"],
      price: 1691,
      taxesAndFees: 305,
      isRefundable: true,
      refundPolicy: "100% reembolsable antes del 25 mar",
      rating: 4.6,
      reviews: 76
    },
    {
      id: 2,
      name: "Habitación Estándar",
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1740",
      size: "25 metros cuadrados",
      bedType: "1 cama King y 1 cama plegable individual",
      maxGuests: 2,
      amenities: ["Estacionamiento gratis", "WiFi gratis"],
      price: 1097,
      taxesAndFees: 198,
      isRefundable: true,
      refundPolicy: "100% reembolsable antes del 25 mar",
      rating: 4.4,
      reviews: 45
    },
    {
      id: 3,
      name: "Suite Ejecutiva con Vista",
      image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=1740",
      size: "45 metros cuadrados",
      bedType: "1 cama King size",
      maxGuests: 2,
      amenities: ["Vista al mar", "Balcón privado", "Minibar", "WiFi gratis"],
      price: 2299,
      taxesAndFees: 415,
      isRefundable: true,
      refundPolicy: "100% reembolsable antes del 25 mar",
      rating: 4.8,
      reviews: 92
    }
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
        <div className="space-y-8">
          {/* Header Section */}
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

          {/* Hotel Information */}
          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Descripción</h2>
              <p className="text-gray-600">{hotel.description}</p>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Servicios y comodidades</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {hotel.amenities.map((amenity) => (
                  <div key={amenity} className="flex items-center gap-2">
                    {getAmenityIcon(amenity)}
                    <span className="capitalize">{amenity}</span>
                  </div>
                ))}
              </div>
            </Card>

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

          {/* Search Section */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Elige tu habitación</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm text-gray-600">Check-in</label>
                <Button variant="outline" className="w-full">
                  <Calendar className="h-4 w-4 mr-2" />
                  Seleccionar fecha
                </Button>
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-600">Check-out</label>
                <Button variant="outline" className="w-full">
                  <Calendar className="h-4 w-4 mr-2" />
                  Seleccionar fecha
                </Button>
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-600">Huéspedes</label>
                <Button variant="outline" className="w-full justify-between">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2" />
                    2 huéspedes
                  </div>
                  <span className="text-gray-400">▼</span>
                </Button>
              </div>
            </div>
          </Card>

          {/* Room Listings */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Habitaciones disponibles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {hotel.rooms.map((room) => (
                <Card key={room.id} className="flex flex-col">
                  <div className="relative">
                    <img 
                      src={room.image} 
                      alt={room.name}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <div className="absolute top-2 right-2 px-2 py-1 bg-blue-900 text-white rounded">
                      <span className="font-bold">{room.rating}</span>
                    </div>
                  </div>
                  <div className="p-4 flex-1 flex flex-col">
                    <h3 className="text-lg font-semibold mb-1">{room.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{room.size}</p>

                    <div className="space-y-3 flex-1">
                      <div className="text-sm">
                        <p>{room.bedType}</p>
                        <p>Máximo {room.maxGuests} personas</p>
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {room.amenities.map((amenity, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {amenity}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4">
                      {room.isRefundable && (
                        <p className="text-sm text-emerald-600 mb-2">{room.refundPolicy}</p>
                      )}
                      <div className="space-y-1">
                        <div className="text-2xl font-bold">
                          MXN ${room.price.toLocaleString()}
                        </div>
                        <p className="text-sm text-gray-500">
                          MXN ${(room.price + room.taxesAndFees).toLocaleString()} total
                        </p>
                        <p className="text-xs text-gray-500">
                          incluye impuestos y cargos
                        </p>
                      </div>
                      <Button className="w-full mt-4">
                        Reservar
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}