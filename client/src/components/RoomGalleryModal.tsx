import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ImageGallery } from "@/components/ImageGallery";
import { 
  Users,
  BedDouble,
  Maximize2,
  CheckCircle2
} from "lucide-react";

interface RoomGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  room: {
    name: string;
    images: string[];
    size: string;
    bedType: string;
    maxGuests: number;
    amenities: string[];
    description?: string;
    features?: string[];
  };
}

export function RoomGalleryModal({ isOpen, onClose, room }: RoomGalleryModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl p-0">
        <div className="max-h-[90vh] overflow-y-auto">
          <ImageGallery 
            mainImage={room.images[0]} 
            additionalImages={room.images.slice(1)}
          />
          
          <div className="p-6 space-y-6">
            <div>
              <h2 className="text-2xl font-semibold mb-2">{room.name}</h2>
              {room.description && (
                <p className="text-gray-600">{room.description}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <BedDouble className="h-5 w-5 text-gray-500" />
                <span>{room.bedType}</span>
              </div>
              <div className="flex items-center gap-2">
                <Maximize2 className="h-5 w-5 text-gray-500" />
                <span>{room.size}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-gray-500" />
                <span>Hasta {room.maxGuests} personas</span>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-semibold mb-4">Amenidades y servicios</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {room.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {room.features && (
              <>
                <Separator />
                <div>
                  <h3 className="text-lg font-semibold mb-4">Características adicionales</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {room.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
