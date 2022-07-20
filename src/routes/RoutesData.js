export const routeList = [
    { path: "/dashboard", title: "Dashboard", helperText: "A complete overview of how your music is performing." },
    { path: "/encode", title: "Encode", helperText: "Upload your audio file here, manage its metadata and let the tracking begin." },
    { path: "/decode", title: "Decode", helperText: "Use this section to double-check if your audio file has already been encoded." },
    { path: "/encoded-tracks", title: "Encoded Tracks", helperText: "A register of all your encoded tracks." },
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