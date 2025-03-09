import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { 
  Calendar,
  Users,
  MapPin,
  CreditCard,
  Search,
  CheckCircle2 
} from "lucide-react";

export default function ReservationLookupPage() {
  const [reservationId, setReservationId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [reservation, setReservation] = useState<any>(null);
  const [error, setError] = useState("");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setReservation(null);

    // Simulate API call - replace with actual API call
    setTimeout(() => {
      if (reservationId === "RES-2025-0309-123") {
        setReservation({
          id: "RES-2025-0309-123",
          status: "confirmed",
          paymentMethod: "card",
          booking: {
            type: "hotel",
            name: "Junior Suite King Bed - Hotel Boutique Cuetzalan",
            location: "Centro Histórico, Cuetzalan",
            dates: {
              checkIn: "2025-03-15",
              checkOut: "2025-03-18",
            },
            guests: 2,
            total: 1996,
            image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1740",
          }
        });
      } else {
        setError("No se encontró la reservación. Por favor verifica el ID.");
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">
            Buscar Reservación
          </h1>

          <Card className="p-6 mb-8">
            <form onSubmit={handleSearch} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ID de Reservación
                </label>
                <div className="flex gap-2">
                  <Input
                    value={reservationId}
                    onChange={(e) => setReservationId(e.target.value)}
                    placeholder="Ejemplo: RES-2025-0309-123"
                    className="flex-1"
                  />
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                        <span>Buscando...</span>
                      </div>
                    ) : (
                      <>
                        <Search className="h-4 w-4 mr-2" />
                        Buscar
                      </>
                    )}
                  </Button>
                </div>
                {error && (
                  <p className="mt-2 text-sm text-red-600">{error}</p>
                )}
              </div>
            </form>
          </Card>

          {reservation && (
            <Card className="p-6">
              <div className="space-y-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-semibold">Detalles de la reservación</h2>
                    <p className="text-sm text-gray-600 mt-1">
                      ID de reserva: {reservation.id}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle2 className="h-5 w-5" />
                    <span className="font-medium">Confirmada</span>
                  </div>
                </div>

                <div className="flex gap-4">
                  <img
                    src={reservation.booking.image}
                    alt={reservation.booking.name}
                    className="w-32 h-32 object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="font-medium">{reservation.booking.name}</h3>
                    <div className="space-y-2 mt-3">
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="h-4 w-4 mr-2" />
                        {reservation.booking.location}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="h-4 w-4 mr-2" />
                        {reservation.booking.dates.checkIn} - {reservation.booking.dates.checkOut}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Users className="h-4 w-4 mr-2" />
                        {reservation.booking.guests} huéspedes
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <CreditCard className="h-4 w-4 mr-2" />
                        Pagado con {reservation.paymentMethod === 'card' ? 'tarjeta' : 'pago en destino'}
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Total pagado</span>
                    <span className="font-semibold">
                      MXN ${reservation.booking.total.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-sm text-gray-600">
                    ¿Necesitas ayuda? Contáctanos al (555) 123-4567
                  </p>
                </div>
              </div>
            </Card>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
