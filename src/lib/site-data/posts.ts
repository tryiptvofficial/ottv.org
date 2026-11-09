

export const posts: {
  id: string;
  title: string;
  image: string;
  excerpt: string;
  tags: string[];
  href: string;
  content?: string;
}[] = [
    {
        id: "how-to-install-iptv-on-fire-tv",
        title: "How to Install IPTV on Amazon Fire TV Stick",
        image: "guide-image-fire-tv",
        excerpt: "A step-by-step guide to setting up IPTV on your Fire TV Stick and start streaming your favorite channels in minutes.",
        tags: ["Fire TV", "Installation", "Guide"],
        href: "/guides/fire-tv"
    },
    {
        id: "how-to-install-iptv-on-android",
        title: "Setting Up IPTV on Your Android Device",
        image: "guide-image-android",
        excerpt: "Learn how to easily install and configure our IPTV service on any Android phone, tablet, or TV box.",
        tags: ["Android", "Setup", "Mobile"],
        href: "/guides/android"
    },
    {
        id: "troubleshooting-common-iptv-issues",
        title: "Troubleshooting Common IPTV Buffering Issues",
        image: "guide-image-troubleshooting",
        excerpt: "Experiencing buffering? Our guide provides simple fixes to solve common IPTV streaming problems for a smooth experience.",
        tags: ["Troubleshooting", "Buffering", "Tips"],
        href: "/faq"
    }
];
