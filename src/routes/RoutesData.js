export const routeList = [
    { path: "/encode", title: "Encode" },
    { path: "/decode", title: "Decode" },
    {
        path: "/dashboard",
        title: "Monitor",
        subPath: [
            { path: "/dashboard", title: "Dashboard" },
            { path: "/plays", title: "My Plays" },
            { path: "/tracks", title: "My Tracks" },
            { path: "/artists", title: "Artists" },
            { path: "/radio-stations", title: "Radio Stations" },
            { path: "/countries", title: "Countries" },
            { path: "/streamreader", title: "StreamReader" },
        ]
    },
    { path: "/sonic-keys", title: "SonicKeys" },
]