import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura';
import './style.css'
import App from './App.vue'
import { createWebHistory, createRouter } from 'vue-router'
import Root from './Root.vue';

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

const routes = [
  { path: "/:date?/:mode?/:main?/:sub?", component: App }
]
const router = createRouter({
  history: createWebHistory(),
  routes
})
app.use(router)
app.mount('#app')
