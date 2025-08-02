import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import {PrimeVueResolver} from '@primevue/auto-import-resolver'
import tailwindcss from '@tailwindcss/vite'
import svgLoader from "vite-svg-loader";
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  base: "/fet-openday-management/",
  plugins: [
    svgLoader(),
    vue(),
    tailwindcss(),
    Components({
      resolvers: [
        PrimeVueResolver()
      ]
    })
  ],
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        locations: path.resolve(__dirname, 'locations.html'),
        activities: path.resolve(__dirname, 'activities.html'),
        tools: path.resolve(__dirname, 'tools/index.html'),
        "tools/locationassignment": path.resolve(__dirname, 'tools/locationassignment.html'),
        "tools/eventcreation": path.resolve(__dirname, 'tools/eventcreation.html'),
      }
    }
  }
})
