export const routeList = [
    { link: "/encode", linkText: "Encode" },
    { link: "/decode", linkText: "Decode" },
    {
        link: "/monitor",
        linkText: "Monitor",
        children: [
            { link: "/dashboard", linkText: "Dashboard" },
            { link: "/plays", linkText: "My Plays" },
            { link: "/plays", linkText: "My Tracks" },
            { link: "/plays", linkText: "Artists" },
            { link: "/plays", linkText: "Radio Stations" },
            { link: "/plays", linkText: "Countries" },
            { link: "/streamreader", linkText: "StreamReader" }
        ]
    },
    { link: "/sonic-keys", linkText: "SonicKeys" },
    { link: "/licences", linkText: "Licenses" }
]