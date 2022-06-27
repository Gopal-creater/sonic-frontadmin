export const routeList = [
    { path: "/dashboard", title: "Dashboard" },
    { path: "/encode", title: "Encode" },
    { path: "/encoded-tracks", title: "Encoded Tracks" },
    { path: "/decode", title: "Decode" },
    {
        // path: "/dashboard",
        title: "Monitor",
        subPath: [
            { path: "/plays", title: "My Plays" },
            { path: "/tracks", title: "My Tracks" },
            { path: "/artists", title: "My Artists" },
            { path: "/radio-stations", title: "Radio Stations" },
            { path: "/countries", title: "Countries" },
        ]
    },
    { path: "/streamreader", title: "StreamReader" },
]