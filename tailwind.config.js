import { heroui } from "@heroui/theme"

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        './src/layouts/**/*.{js,ts,jsx,tsx,mdx}',
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                lemon: '#fff700', // neon yellow
                'lemon-glow': 'rgba(255, 247, 0, 0.6)', // semi-transparent for glow effects
                'futuristic-blue': '#0a2239', // light futuristic blue
            },
        },
    },
    darkMode: "class",
    plugins: [heroui()],
}
