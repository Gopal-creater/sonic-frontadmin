export const routeList = [
    { path: "/dashboard", title: "Dashboard" },
    { path: "/encode", title: "Encode" },
    { path: "/decode", title: "Decode" },
    { path: "/encoded-tracks", title: "Encoded Tracks" },
    {
        // path: "/dashboard",
        title: "Monitor",
        subPath: [
            { path: "/monitor/companies", title: "Companies" },
            { path: "/monitor/plays", title: "My Plays" },
            { path: "/monitor/tracks", title: "My Tracks" },
            { path: "/monitor/artists", title: "My Artists" },
            { path: "/monitor/radio-stations", title: "Radio Stations" },
            { path: "/monitor/countries", title: "Countries" },
        ]
    },
    {
        title: "Reports",
        subPath: [
            { path: "/reports/encodes-by-company", title: "Encodes by company" },
        ]
    },
    { path: "/streamreader", title: "StreamReader" },
]