

// Main menu: four items. "IPTV Subscription" opens the pricing page directly (its old URL /iptv-subscription
// redirects there) and stays: it is the only link text on the site with that page's search phrase, and the footer
// uses the same name. "Devices & Setup" opens the guides hub, which lists every device with its guide. The logo
// goes home, and the free trial is the header's button.
export const navLinks = [
  { name: "IPTV Subscription", href: "/pricing" },
  { name: "Devices & Setup", href: "/devices" },
  { name: "FAQ", href: "/faq" },
  { name: "Contact", href: "/contact" },
];

/** "page" on the item's own page, "true" on a page inside its section (a guide under /devices), else nothing. */
export function navCurrent(pathname: string, href: string): "page" | "true" | undefined {
  if (pathname === href) return "page";
  if (href !== "/" && pathname.startsWith(`${href}/`)) return "true";
  return undefined;
}
