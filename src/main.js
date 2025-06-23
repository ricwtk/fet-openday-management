import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura';
import './style.css'
import App from './App.vue'

const app = createApp(App)
app.use(PrimeVue, {
    // Default theme configuration
  theme: {
    preset: Aura,
    options: {
      prefix: 'p',
      darkModeSelector: 'system',
      cssLayer: false
    }
  },
  ripple: true,
 });
app.mount('#app')
