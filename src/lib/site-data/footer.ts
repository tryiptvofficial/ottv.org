
import { legalLinks } from "@/lib/site-data/legal-details";

export const footerLinks = {
    quickLinks: [
        { name: "IPTV Subscription", href: "/pricing" },
        { name: "Free Trial", href: "/iptv-free-trial" },
        { name: "FAQ", href: "/faq" },
        { name: "Contact", href: "/contact" },
        ...legalLinks,
    ],
    // Every guide, so each one is linked from every page.
    setupGuides: [
        { name: "Fire TV Stick", href: "/devices/fire-tv" },
        { name: "Samsung TV", href: "/devices/samsung-tv" },
        { name: "LG TV", href: "/devices/lg-tv" },
        { name: "Apple TV", href: "/devices/apple-tv" },
        { name: "Roku", href: "/devices/roku" },
        { name: "MAG box", href: "/devices/mag" },
        { name: "Android", href: "/devices/android" },
        { name: "iPhone & iPad", href: "/devices/ios" },
        { name: "Windows", href: "/devices/windows" },
        { name: "macOS", href: "/devices/macos" },
        { name: "Fix buffering", href: "/devices/troubleshooting" },
    ],
};
