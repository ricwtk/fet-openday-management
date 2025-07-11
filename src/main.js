import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura';
import './style.css'
import App from './App.vue'
import { createWebHistory, createRouter } from 'vue-router'
import Tools from './components/Tools.vue';
import Root from './Root.vue';
import LocationAssignment from './components/LocationAssignment.vue';
import Tooltip from 'primevue/tooltip';
import EventCreation from './components/EventCreation.vue';

const app = createApp(Root)
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
  // { path: "/:date?/:mode?/:main?/:sub?", component: App },
  { path: "/", component: App },
  { 
    path: "/tools", name: "Tools", component: Tools, 
    children: [
      { path: "locationassignment", name: "Location Assignment", component: LocationAssignment },
      { path: "eventcreation", name: "Event Creation", component: EventCreation },
    ]
  }
]
const router = createRouter({
  history: createWebHistory(),
  routes
})
app.use(router)
app.directive('tooltip', Tooltip)
app.mount('#app')
