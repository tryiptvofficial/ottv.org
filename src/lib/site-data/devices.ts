

export const devices: { name: string; icon: string; href: string; }[] = [
    { name: 'iPhone', icon: 'SiIphone', href: '/devices/ios' },
    { name: 'iPad', icon: 'SiIpad', href: '/devices/ios' },
    { name: 'macOS', icon: 'SiMacos', href: '/devices/macos' },
    { name: 'Android', icon: 'SiAndroid', href: '/devices/android' },
    { name: 'Windows', icon: 'SiWindows', href: '/devices/windows' },
    { name: 'Roku', icon: 'SiRoku', href: '/devices/roku' },
    { name: 'Samsung TV', icon: 'SiSamsung', href: '/devices/samsung-tv' },
    { name: 'LG TV', icon: 'SiLg', href: '/devices/lg-tv' },
    { name: 'Fire TV', icon: 'SiAmazonfiretv', href: '/devices/fire-tv' },
    { name: 'MAG', icon: 'Tv', href: '/devices/mag' },
    { name: 'Apple TV', icon: 'SiAppletv', href: '/devices/apple-tv' }
];

/**
 * Setup guides grouped by kind of device. The homepage device tiles and the /devices hub both read this, so a
 * guide added to how-to.json also needs a place here. `id` is the guide's slug under /devices/; `name` is the
 * tile label (iPhone and iPad share the iOS guide). `note` is the one thing to know before picking that device,
 * as its guide states it: the player app costs money, playback is by screen mirroring, or the box's MAC address
 * is needed. Devices whose guide uses a free app or a plain sign-in have no note.
 */
export type GuideGroupIcon = 'tv' | 'stick' | 'phone' | 'computer' | 'help';

export const guideGroups: { label: string; icon: GuideGroupIcon; guides: { id: string; name: string; note?: string }[] }[] = [
    {
        label: 'Smart TVs',
        icon: 'tv',
        // Samsung: SET IPTV or NET IPTV, both charging a developer fee. LG: free if IPTV Smarters Player is listed, otherwise the same paid apps.
        guides: [{ id: 'samsung-tv', name: 'Samsung TV', note: 'Paid player app' }, { id: 'lg-tv', name: 'LG TV', note: 'May need a paid app' }],
    },
    {
        label: 'Streaming devices and boxes',
        icon: 'stick',
        guides: [
            { id: 'fire-tv', name: 'Fire TV' },
            { id: 'apple-tv', name: 'Apple TV', note: 'Paid player app' },
            { id: 'roku', name: 'Roku', note: 'Screen mirroring only' },
            { id: 'mag', name: 'MAG', note: 'Send us its MAC address' },
        ],
    },
    {
        label: 'Phones and tablets',
        icon: 'phone',
        guides: [{ id: 'ios', name: 'iPhone', note: 'Paid player app' }, { id: 'ios', name: 'iPad', note: 'Paid player app' }, { id: 'android', name: 'Android' }],
    },
    { label: 'Computers', icon: 'computer', guides: [{ id: 'windows', name: 'Windows' }, { id: 'macos', name: 'macOS' }] },
    { label: 'Help', icon: 'help', guides: [{ id: 'troubleshooting', name: 'Fix buffering' }] },
];
