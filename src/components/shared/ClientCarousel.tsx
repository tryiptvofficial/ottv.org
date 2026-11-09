
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
import { Bookmark, Heart, Play } from "lucide-react";
import { IconTile } from "@/components/ui/icon-tile";
import { SignalLine } from "./SignalLine";

type ItemWithPlaceholder = {
  title: string;
  src: string;
  href?: string;
  placeholder: string;
};

interface ClientCarouselProps {
  items: ItemWithPlaceholder[];
  showHoverContent?: boolean;
}

export function ClientCarousel({
  items,
  showHoverContent = false,
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
                alt={`Poster for ${item.title}, a popular movie available on OTTV`}
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
              {showHoverContent && (
                <>
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-transparent opacity-0 transition duration-standard ease-standard group-hover:bg-background/40 group-hover:opacity-100">
                    <IconTile className="m-auto scale-0 transition-transform duration-standard ease-standard group-hover:scale-100">
                      <Play className="fill-current" />
                    </IconTile>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 mx-auto flex flex-col items-center justify-center bg-gradient-to-t from-background/80 to-transparent p-4 opacity-0 transition-opacity duration-standard ease-standard group-hover:opacity-100">
                    <p className="line-clamp-2 translate-y-10 text-center text-label transition-transform duration-standard ease-standard group-hover:translate-y-0">
                      {item.title}
                    </p>
                  </div>
                  {/* Decorative only: these have no action, so they stay out of the tab order */}
                  <div aria-hidden className="absolute inset-x-0 top-0 flex flex-col items-end justify-end gap-2 p-2">
                    <IconTile size="sm">
                      <Heart />
                    </IconTile>
                    <IconTile size="sm">
                      <Bookmark />
                    </IconTile>
                  </div>
                </>
              )}
            </div>
            {/* Signal Line marks the shelf's current position; every item reserves the row so nothing shifts */}
            <div className="mt-3 h-2.5">
              {index === current && (
                <SignalLine key={current} draw duration={0.6} className="h-2.5 w-16 text-brand/80" />
              )}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-1 md:-left-5" />
      <CarouselNext className="right-1 md:-right-5" />
    </Carousel>
  );
}
