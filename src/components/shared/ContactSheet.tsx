
"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

// Loaded when the sheet opens, so the form code is not part of every page.
const ContactForm = dynamic(() => import("@/components/shared/ContactForm").then((mod) => mod.ContactForm));

// The floating button steps aside while any `[data-fab-avoid]` element (the footer, the hero's
// call-to-action group) is on screen, so it never covers links or buttons there.
function useAvoidZonesInView() {
  const pathname = usePathname();
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const zones = document.querySelectorAll("[data-fab-avoid]");
    if (!zones.length) return;
    const visible = new Set<Element>();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) visible.add(entry.target);
        else visible.delete(entry.target);
      }
      setInView(visible.size > 0);
    });
    zones.forEach((zone) => observer.observe(zone));
    return () => observer.disconnect();
  }, [pathname]);

  return inView;
}

export function ContactSheet() {
  const [isOpen, setIsOpen] = useState(false);
  const hidden = useAvoidZonesInView() && !isOpen;

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          size="icon"
          variant="pill"
          className={cn(
            "fixed bottom-4 right-4 z-50 transition duration-standard ease-standard sm:bottom-6 sm:right-6",
            hidden && "pointer-events-none translate-y-4 opacity-0"
          )}
          aria-label="Open contact form"
          aria-hidden={hidden || undefined}
          tabIndex={hidden ? -1 : undefined}
        >
          <MessageSquare aria-hidden className="!size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Contact Us</SheetTitle>
          <SheetDescription>
            Write your question below. Submitting opens WhatsApp with your message ready to send.
          </SheetDescription>
        </SheetHeader>
        <div className="mt-8">
          <ContactForm idPrefix="sheet" onSuccess={() => setIsOpen(false)} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
