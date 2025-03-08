import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import useEmblaCarousel from "embla-carousel-react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ImageGalleryProps {
  mainImage: string;
  additionalImages: string[];
}

export function ImageGallery({ mainImage, additionalImages }: ImageGalleryProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel();

  const allImages = [mainImage, ...additionalImages];

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();

  const openCarousel = (index: number) => {
    setSelectedIndex(index);
    setIsOpen(true);
  };

  return (
    <>
      <div className="grid grid-cols-4 gap-2">
        <div className="col-span-2 row-span-2 relative overflow-hidden rounded-lg">
          <img
            src={mainImage}
            alt="Main"
            className="w-full h-full object-cover aspect-[4/3] hover:scale-105 transition-transform duration-300 cursor-pointer"
            onClick={() => openCarousel(0)}
          />
        </div>
        {additionalImages.slice(0, 4).map((image, index) => (
          <div key={index} className="relative overflow-hidden rounded-lg">
            <img
              src={image}
              alt={`Additional ${index + 1}`}
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
                      src={image}
                      alt={`Slide ${index}`}
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
