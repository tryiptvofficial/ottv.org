import * as React from "react";
import { whatsappUrl } from "@/lib/site-config";

interface WhatsAppLinkProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "target" | "rel"> {
  /** Optional pre-filled message. */
  message?: string;
}

/** Opens a chat with the site's WhatsApp number in a new tab. Works inside `Button asChild`. */
export const WhatsAppLink = React.forwardRef<HTMLAnchorElement, WhatsAppLinkProps>(
  ({ message, ...props }, ref) => (
    <a ref={ref} href={whatsappUrl(message)} target="_blank" rel="noopener noreferrer" {...props} />
  )
);
WhatsAppLink.displayName = "WhatsAppLink";
