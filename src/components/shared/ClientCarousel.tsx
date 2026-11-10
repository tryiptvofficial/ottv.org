
"use client";

import { useEffect, useReducer, useState } from "react";
import Image from "next/image";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type ItemWithPlaceholder = {
  title: string;
  src: string;
  href?: string;
  placeholder: string;
};

interface ClientCarouselProps {
  items: ItemWithPlaceholder[];
  /** Names the carousel for screen readers. */
  label: string;
}

export function ClientCarousel({
  items,
  label,
}: ClientCarouselProps) {
  // The shelf's current position (first poster in view) is read from Embla during render;
  // its select events only trigger a re-render.
  const [api, setApi] = useState<CarouselApi>();
  const [, refresh] = useReducer((n: number) => n + 1, 0);
  const current = api?.selectedScrollSnap() ?? 0;

  useEffect(() => {
    if (!api) return;
    api.on("select", refresh);
    api.on("reInit", refresh);
    return () => {
      api.off("select", refresh);
      api.off("reInit", refresh);
    };
  }, [api]);

  return (
    <Carousel
      setApi={setApi}
      aria-label={label}
      opts={{
        align: "start",
        loop: true,
      }}
      className="w-full"
    >
      <CarouselContent className="-ml-3">
        {items.map((item, index) => (
          <CarouselItem
            key={index}
            className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/6 pl-3"
          >
            <div className="group relative overflow-hidden rounded-card ring-1 ring-border transition-shadow duration-standard hover:ring-foreground/40">
              <Image
                alt={`${item.title} poster`}
                loading="lazy"
                width={200}
                height={300}
                decoding="async"
                className="aspect-poster h-auto w-full rounded-card object-cover transition-opacity duration-standard"
                src={item.src}
                placeholder="blur"
                blurDataURL={item.placeholder}
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, (max-width: 1280px) 17vw, 14vw"
              />
            </div>
            {/* Signal Line marks the shelf's current position; every item reserves the row so nothing shifts */}
            <div className="mt-3 h-2.5">
              {index === current && (
                <span className="block h-0.5 w-16 rounded-full bg-brand" />
              )}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-1 md:-left-4" />
      <CarouselNext className="right-1 md:-right-4" />
    </Carousel>
  );
}
