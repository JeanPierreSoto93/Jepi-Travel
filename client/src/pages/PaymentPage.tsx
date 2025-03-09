import { useState } from "react";
import { useLocation } from "wouter";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { PaymentElement } from "@/components/PaymentElement";

// Initialize Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

export default function PaymentPage() {
  const [, setLocation] = useLocation();
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isProcessing, setIsProcessing] = useState(false);

  // Mock booking data (replace with actual data from state management)
  const booking = {
    type: "hotel", // or "tour"
    name: "Junior Suite King Bed - Hotel Boutique Cuetzalan",
    dates: {
      checkIn: "2025-03-15",
      checkOut: "2025-03-18",
    },
    guests: 2,
    price: 1691,
    taxesAndFees: 305,
    total: 1996,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1740",
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    
    if (paymentMethod === "destination") {
      // Generate reservation without payment
      setTimeout(() => {
        setLocation("/confirmation/123"); // Replace with actual reservation ID
      }, 1500);
      return;
    }

    // Handle card payment with Stripe
    // Add your Stripe payment logic here
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div>
            <h1 className="text-3xl font-bold">Confirmar reservación</h1>
            <p className="text-gray-600 mt-2">
              Revisa los detalles y selecciona tu método de pago
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Booking Summary */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Detalles de la reserva</h2>
                <div className="flex gap-4">
                  <img
                    src={booking.image}
                    alt={booking.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="font-medium">{booking.name}</h3>
                    <div className="text-sm text-gray-600 space-y-1 mt-2">
                      <p>Check-in: {booking.dates.checkIn}</p>
                      <p>Check-out: {booking.dates.checkOut}</p>
                      <p>{booking.guests} huéspedes</p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Método de pago</h2>
                <RadioGroup
                  value={paymentMethod}
                  onValueChange={setPaymentMethod}
                  className="space-y-4"
                >
                  <div className="flex items-center space-x-4 rounded-lg border p-4">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card" className="flex-1">
                      <div className="font-medium">Pagar ahora con tarjeta</div>
                      <div className="text-sm text-gray-500">
                        Pago seguro con tarjeta de crédito o débito
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-4 rounded-lg border p-4">
                    <RadioGroupItem value="destination" id="destination" />
                    <Label htmlFor="destination" className="flex-1">
                      <div className="font-medium">Pagar en destino</div>
                      <div className="text-sm text-gray-500">
                        Paga directamente en el hotel/agencia a tu llegada
                      </div>
                    </Label>
                  </div>
                </RadioGroup>

                {paymentMethod === "card" && (
                  <div className="mt-6">
                    <Elements stripe={stripePromise}>
                      <PaymentElement />
                    </Elements>
                  </div>
                )}
              </Card>
            </div>

            {/* Price Summary */}
            <div className="lg:col-span-1">
              <Card className="p-6 sticky top-4">
                <h2 className="text-xl font-semibold mb-4">Resumen de precio</h2>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Tarifa base</span>
                    <span>MXN ${booking.price.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Impuestos y cargos</span>
                    <span>MXN ${booking.taxesAndFees.toLocaleString()}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>MXN ${booking.total.toLocaleString()}</span>
                  </div>

                  <Button
                    className="w-full mt-4"
                    size="lg"
                    onClick={handlePayment}
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                        <span>Procesando...</span>
                      </div>
                    ) : (
                      `Pagar MXN $${booking.total.toLocaleString()}`
                    )}
                  </Button>

                  <p className="text-xs text-gray-500 text-center">
                    Al continuar, aceptas nuestros términos y condiciones
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
