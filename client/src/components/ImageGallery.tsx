import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import useEmblaCarousel from "embla-carousel-react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ImageGalleryProps {
  // For standard gallery view
  mainImage?: string;
  additionalImages?: string[];
  // For modal gallery view
  images?: Array<{ url: string; description: string }>;
  onClose?: () => void;
  initialIndex?: number;
}

export function ImageGallery({ mainImage, additionalImages, images, onClose, initialIndex = 0 }: ImageGalleryProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(initialIndex);
  const [emblaRef, emblaApi] = useEmblaCarousel();

  // Convert the input props to a unified format
  const allImages = images
    ? images.map(img => ({ url: img.url, description: img.description }))
    : [
        { url: mainImage!, description: "Main image" },
        ...(additionalImages || []).map(url => ({ url, description: "" }))
      ];

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();

  const openCarousel = (index: number) => {
    setSelectedIndex(index);
    setIsOpen(true);
  };

  // If being used as a modal, render just the carousel
  if (images && onClose) {
    return (
      <Dialog open={true} onOpenChange={onClose}>
        <DialogContent className="max-w-6xl p-0 gap-0">
          <div className="relative bg-black/90 h-[80vh]">
            <div className="embla h-full" ref={emblaRef}>
              <div className="embla__container h-full">
                {allImages.map((image, index) => (
                  <div key={index} className="embla__slide h-full flex items-center justify-center p-4">
                    <img
                      src={image.url}
                      alt={image.description}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white"
              onClick={scrollPrev}
            >
              <ChevronLeft className="h-8 w-8" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white"
              onClick={scrollNext}
            >
              <ChevronRight className="h-8 w-8" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  // Standard gallery view
  return (
    <>
      <div className="grid grid-cols-4 gap-2">
        <div className="col-span-2 row-span-2 relative overflow-hidden rounded-lg">
          <img
            src={allImages[0].url}
            alt={allImages[0].description}
            className="w-full h-full object-cover aspect-[4/3] hover:scale-105 transition-transform duration-300 cursor-pointer"
            onClick={() => openCarousel(0)}
          />
        </div>
        {allImages.slice(1, 5).map((image, index) => (
          <div key={index} className="relative overflow-hidden rounded-lg">
            <img
              src={image.url}
              alt={image.description}
              className="w-full h-full object-cover aspect-square hover:scale-105 transition-transform duration-300 cursor-pointer"
              onClick={() => openCarousel(index + 1)}
            />
          </div>
        ))}
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-6xl p-0 gap-0">
          <div className="relative bg-black/90 h-[80vh]">
            <div className="embla h-full" ref={emblaRef}>
              <div className="embla__container h-full">
                {allImages.map((image, index) => (
                  <div key={index} className="embla__slide h-full flex items-center justify-center p-4">
                    <img
                      src={image.url}
                      alt={image.description}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white"
              onClick={scrollPrev}
            >
              <ChevronLeft className="h-8 w-8" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white"
              onClick={scrollNext}
            >
              <ChevronRight className="h-8 w-8" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}