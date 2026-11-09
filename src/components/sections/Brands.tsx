"use client";

import Image from "next/image";
import { brands, brands_two } from "@/lib/site-data/brands";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Container } from "../shared/Container";
import { Section } from "../shared/Section";
import { cn } from "@/lib/utils";

const BrandCarousel = ({ images, reverse = false }: { images: typeof brands, reverse?: boolean }) => {
    return (
        <div className="mask-fade-x relative w-full overflow-hidden">
          <div className={cn(
            "flex w-max shrink-0 items-center gap-4",
            reverse ? "animate-marquee-reverse" : "animate-marquee"
            )}
            aria-hidden="true"
            >
            {[...images, ...images].map((brand, index) => {
                 const brandImage = PlaceHolderImages.find(img => img.id === brand.id);
                 if (!brandImage) return null;
                 return (
                     <div
                        key={`${brand.id}-${index}`}
                        className="w-36 flex-shrink-0 px-4"
                    >
                        <Image
                            src={brandImage.imageUrl}
                            alt=""
                            width={brandImage.width || 150}
                            height={brandImage.height || 46}
                            className="h-12 w-auto object-contain opacity-50 brightness-0 invert"
                            loading="lazy"
                            sizes="144px"
                        />
                    </div>
                 )
            })}
          </div>
        </div>
    )
}

export function Brands() {
  return (
    <Section spacing="none" className="pb-20 md:pb-24">
      <Container>
        <BrandCarousel images={[...brands, ...brands_two]} />
      </Container>
    </Section>
  );
}
