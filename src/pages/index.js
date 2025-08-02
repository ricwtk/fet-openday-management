import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura';
import '../style.css'
import App from './Index.vue'
import { createWebHistory, createRouter } from 'vue-router'
import Tools from '../components/Toollist.vue';
import Root from '../Root.vue';
import LocationAssignment from '../components/LocationAssignment.vue';
import Tooltip from 'primevue/tooltip';
import EventCreation from '../components/EventCreation.vue';
import ByLocations from '../components/ByLocations.vue';
import ByActivities from '../components/ByActivities.vue';
import FloorMap from '../components/FloorMap.vue';

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

app.directive('tooltip', Tooltip)
app.mount('#app')
