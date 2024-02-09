import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode:"class",
  theme: {
    extend: {
     colors:{
      dark:"#312480",
      medium:"#293245",
      darkcolor:"#2a3447",
      softcolor:"#ddd",
      darkbg: "#222b3c",
     }
    },
  },
  plugins: [],
}
export default config
