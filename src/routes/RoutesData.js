export const routeList = [
    { path: "/dashboard", title: "Dashboard" },
    { path: "/encode", title: "Encode" },
    { path: "/encoded-tracks", title: "Encoded Tracks" },
    { path: "/decode", title: "Decode" },
    {
        // path: "/dashboard",
        title: "Monitor",
        subPath: [
            { path: "/monitor/plays", title: "My Plays" },
            { path: "/monitor/tracks", title: "My Tracks" },
            { path: "/monitor/artists", title: "My Artists" },
            { path: "/monitor/radio-stations", title: "Radio Stations" },
            { path: "/monitor/countries", title: "Countries" },
            { path: "/monitor/companies", title: "Companies" },
        ]
    },
    { path: "/streamreader", title: "StreamReader" },
]