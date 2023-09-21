import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.css';
import 'bootstrap';
import 'bootswatch/dist/materia/bootstrap.min.css';

// Importa VueGoogleMaps y Vue 3 Google Maps
import VueGoogleMaps from '@fawmi/vue-google-maps';


createApp(App)
  .use(router)
  .use(VueGoogleMaps, {
    load: {
        key: "AIzaSyD9sfG72X_wdtyVybXW6YyrXtbftOR0U8Q",
    },
  })
  .mount('#app');

