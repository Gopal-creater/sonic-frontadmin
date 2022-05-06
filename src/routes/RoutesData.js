export const routeList = [
    { link: "/encode", linkText: "Encode" },
    { link: "/decode", linkText: "Decode" },
    {
        link: "/monitor",
        linkText: "Monitor",
        children: [
            { link: "/dashboard", linkText: "Dashboard" },
            { link: "/plays", linkText: "My Plays" },
            { link: "/tracks", linkText: "My Tracks" },
            { link: "/artists", linkText: "Artists" },
            { link: "/radio-stations", linkText: "Radio Stations" },
            { link: "/countries", linkText: "Countries" },
            { link: "/streamreader", linkText: "StreamReader" },
        ]
    },
    { link: "/sonic-keys", linkText: "SonicKeys" },
    // { link: "/licences", linkText: "Licenses" }
]