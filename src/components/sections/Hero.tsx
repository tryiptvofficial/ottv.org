
"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";
import { Eyebrow } from "@/components/ui/typography";
import { productFacts } from "@/lib/site-data/product-facts";
import { AnimatedText } from "../ui/animated-underline-text-one";
import Image from "next/image";
import MouseIcon from "@/assets/icons/mouse.svg";

export function Hero() {
  const [videoLoaded, setVideoLoaded] = useState(false);

  return (
    <Section spacing="spacious" className="min-h-hero flex w-full items-center overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster="https://iptvwell.com/wp-content/uploads/2024/05/The-Best-IPTV-Subscription-Service-Provider-1.jpeg"
        onCanPlay={() => setVideoLoaded(true)}
        className="mask-fade-b absolute inset-0 h-full w-full object-cover transition-opacity duration-slow ease-standard"
        style={{ opacity: videoLoaded ? 1 : 0 }}
      >
        <source
          src="https://pub-93d3f90925314c4ea8adf63998c26129.r2.dev/The-Best-IPTV-Subscription-Service-Provider.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
      {/* Video and overlay fade out at the bottom so the hero melts into the page background */}
      <div className="mask-fade-b absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
      {/* The one cinematic moment on the site; every section below returns to the plain dark canvas */}
      <div aria-hidden className="hero-atmosphere pointer-events-none absolute inset-0" />
      <div aria-hidden className="bg-dot-grid mask-radial absolute inset-0" />
      <Container className="relative z-10 flex flex-col items-center text-center">
        <div className="w-full max-w-3xl motion-safe:animate-hero-rise">
          <Eyebrow className="mb-6">OTTV</Eyebrow>
          <AnimatedText
            text="Best IPTV Service in 2026"
            textClassName="font-headline text-heading-lg font-normal text-foreground text-balance"
            underlineClassName="text-brand"
          />
          <p className="mx-auto mt-8 max-w-xl text-pretty text-body-lg text-muted-foreground">
            Get access to {productFacts.liveChannels} live TV channels worldwide and a library of {productFacts.vodTitles} on-demand movies and TV shows. Watch in HD or 4K where available, on the devices you already own.
          </p>
          <div data-fab-avoid className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/#pricing">View Pricing</Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link href="/iptv-free-trial">Get IPTV Free Trial</Link>
            </Button>
          </div>
        </div>
      </Container>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5, ease: "easeInOut" }}
        className="absolute inset-x-0 bottom-8 mx-auto w-fit"
      >
        {/* Nudges twice to hint at scrolling, then rests: no endless loop. The SVG draws in black
            (currentColor inside <img>), so it is inverted to read on the dark canvas. */}
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: 2, delay: 1.3 }}>
          <Image src={MouseIcon} alt="Scroll down" width={32} height={32} className="h-8 w-8 opacity-60 invert" />
        </motion.div>
      </motion.div>
    </Section>
  );
}
