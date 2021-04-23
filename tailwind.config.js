module.exports = {
    purge: ["./components/**/*.{js,ts,jsx,tsx}", "./pages/**/*.{js,ts,jsx,tsx}"],
    darkMode: "class", // 'media' or 'class'
    theme: {
        extend: {
            colors: {
                brand: "#FF3565",
            },
        },
    },
    variants: {
        extend: {
            // display: ["dark"],
            // backgroundOpacity:["dark"],
            // placeholderColor: ["dark"],
        },
    },
    plugins: [],
};
