<template>
  <div>
    <Navbar v-if="!$route.meta.hideNavbar" /> 
    <router-view />
    <div class="container p-5"></div>
    <BarChart /> 
   <!-- <button @click="getLocation" class="custom-button">Obtener Ubicación</button>
    <div id="map" class="map-container"></div>-->
  </div>
</template>

<style>
.map-container {
  width: 60%;
  height: 300px;
}

.custom-button {
  background-color: #007BFF; /* Color de fondo del botón */
  color: #fff; /* Color del texto del botón */
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease; /* Efecto de transición suave */
}

.custom-button:hover {
  background-color: #0056b3; /* Color de fondo del botón al pasar el mouse */
}


.marker {
  width: 20px;
  height: 20px;
  background-color: red;
  border-radius: 50%;
  position: absolute;
  transform: translate(-50%, -50%);
  z-index: 1000;
}
</style>


<style>
.map-container {
  width: 60%;
  height: 300px;
}
</style>

<script lang="ts">
import { defineComponent, ref, onMounted, watch } from 'vue';
import Navbar from '@/components/Navbar.vue';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';




export default defineComponent({
  name: 'App',
  components: {
    Navbar,
  },
  data() {
    return {
      lat: ref(0),
      lng: ref(0),
      map: null as L.Map | null, 
    };
  },
  methods: {
    getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;

          if (!this.map) {
        
            this.createMap();
          } else {
            
            this.updateMarker();
          }
        });
      }
    },
    createMap() {
  this.map = L.map('map').setView([this.lat, this.lng], 13);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(this.map as any);

  L.marker([this.lat, this.lng]).addTo(this.map as any)
    .bindPopup('Ubicación actual')
    .openPopup();
},
    updateMarker() {
      if (this.map) {
        this.map.setView([this.lat, this.lng], this.map.getZoom());
        this.map.eachLayer((layer) => {
          if (layer instanceof L.Marker) {
            layer.setLatLng([this.lat, this.lng]);
          }
        });
      }
    },
  },
  mounted() {
  if (this.lat !== 0 && this.lng !== 0) {
    this.createMap();
  }
},
});
</script>
