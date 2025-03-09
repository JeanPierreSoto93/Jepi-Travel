import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Calendar,
  Users,
  MapPin,
  CreditCard,
  CheckCircle2 
} from "lucide-react";
import { useLocation } from "wouter";

export default function ConfirmationPage() {
  const [, setLocation] = useLocation();

  // Mock confirmation data (replace with actual data)
  const confirmation = {
    reservationId: "RES-2025-0309-123",
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
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold">¡Reservación confirmada!</h1>
            <p className="text-gray-600 mt-2">
              Tu reservación se ha completado exitosamente
            </p>
          </div>

          <Card className="p-6 mb-6">
            <div className="space-y-6">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-semibold">Detalles de la reservación</h2>
                  <p className="text-sm text-gray-600 mt-1">
                    ID de reserva: {confirmation.reservationId}
                  </p>
                </div>
                <Button variant="outline" onClick={() => window.print()}>
                  Imprimir
                </Button>
              </div>

              <Separator />

              <div className="flex gap-4">
                <img
                  src={confirmation.booking.image}
                  alt={confirmation.booking.name}
                  className="w-32 h-32 object-cover rounded-lg"
                />
                <div>
                  <h3 className="font-medium">{confirmation.booking.name}</h3>
                  <div className="space-y-2 mt-3">
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-4 w-4 mr-2" />
                      {confirmation.booking.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="h-4 w-4 mr-2" />
                      {confirmation.booking.dates.checkIn} - {confirmation.booking.dates.checkOut}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="h-4 w-4 mr-2" />
                      {confirmation.booking.guests} huéspedes
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <CreditCard className="h-4 w-4 mr-2" />
                      Pagado con {confirmation.paymentMethod === 'card' ? 'tarjeta' : 'pago en destino'}
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Total pagado</span>
                  <span className="font-semibold">
                    MXN ${confirmation.booking.total.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </Card>

          <div className="text-center space-y-4">
            <Button onClick={() => setLocation("/")}>
              Volver al inicio
            </Button>
            <p className="text-sm text-gray-600">
              ¿Necesitas ayuda? Contáctanos al (555) 123-4567
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
