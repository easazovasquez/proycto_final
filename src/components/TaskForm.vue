<template>
  <div class="form-container" style="margin-top: 30cqmax;">
    <form class="form" @submit.prevent="saveTask()">
      <h1 class="form-title">Registro Cliente</h1>
      <div class="form-row">
    <!--    <div class="form-group">
    <label for="NumeroIncidente">Número de Incidente:</label>
    <input
      type="text"
      id="NumeroIncidente"
      class="input-field"
        v-model="task.NumeroIncidente"
      />
      </div>-->
        <div class="form-group">
          <label for="nombre">Nombres:</label>
          <input
            type="text" 
            id="nombre"
            class="input-field"
            placeholder="Escriba Nombres"
            v-model="task.Nombre"
            @input="validarNombre"
            :class="{ 'campo-invalido': !nombreValido }"
          />
          <span v-if="!nombreValido" class="error-message">Formato inválido</span>
          <span v-if="!task.Nombre" class="error-message">Nombres Requeridos</span>
        </div>
        <div class="form-group">
          <label for="title">Apellidos:</label>
          <input
            type="text"
            id="title"
            class="input-field"
            placeholder="Escriba Apellidos"
            v-model="task.title"
            @input="validarApellidos"
            :class="{ 'campo-invalido': !apellidosValidos }"
          />
          <span v-if="!apellidosValidos" class="error-message">Tiene formato inválido</span>
          <span v-if="!task.title" class="error-message">Apellidos Requeridos</span>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label for="email">Email:</label>
          <input
            type="text"
            id="email"
            class="input-field"
            placeholder="Escriba un email"
            v-model="task.email"
            :class="{ 'campo-invalido': !esCorreoValido(task.email) }"
            required
          />
          <span v-if="!task.email" class="error-message">Email Requerido</span>
          <span v-if="task.email && !esCorreoValido(task.email)" class="error-message">Formato de Email no válido</span>
        </div>
        <div class="form-group">
          <label for="telefono">Teléfono:</label>
          <input
            type="text"
            id="telefono"
            class="input-field"
            placeholder="Escriba un teléfono"
            v-model="task.telefono"
            :class="{ 'campo-invalido': !task.telefono }"
          />
          <span v-if="!task.telefono" class="error-message">Teléfono Requerido</span>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label for="nombreEmpresa">Nombre de la Empresa:</label>
          <input
            type="text"
            id="nombreEmpresa"
            class="input-field"
            placeholder="Escriba el nombre de la empresa"
            v-model="task.NombreEmpresa"
            :class="{ 'campo-invalido': !task.NombreEmpresa }"
          />
          <span v-if="!task.NombreEmpresa" class="error-message">Nombre de la Empresa Requerido</span>
        </div>
        <div class="form-group">
          <label for="nit">NIT:</label>
          <input
            type="text"
            id="nit"
            class="input-field"
            placeholder="Escriba un NIT"
            v-model="task.Nit"
            :class="{ 'campo-invalido': !task.Nit }"
          />
          <span v-if="!task.Nit" class="error-message">NIT Requerido</span>
        </div>
      </div>
      <div class="form-group">
        <label for="direccion">Dirección:</label>
        <textarea
          rows="3"
          id="direccion"
          class="textarea-field"
          placeholder="Escriba una dirección"
          v-model="task.direccion"
          :class="{ 'campo-invalido': !task.direccion }"
        ></textarea>
        <span v-if="!task.direccion" class="error-message">Dirección Requerida</span>
      </div>
      <div class="form-group">
        <label for="description">Notas o Comentarios:</label>
        <textarea
          rows="3"
          id="description"
          class="textarea-field"
          placeholder="Escriba notas o comentarios"
          v-model="task.description"
          :class="{ 'campo-invalido': !task.description }"
        ></textarea>
        <span v-if="!task.description" class="error-message">Notas o Comentarios Requeridos</span>
      </div>
      <div class="form-group">
        <label for="estadoPlanificacion">Estado de Cliente:</label>
        <select id="estadoPlanificacion" class="input-field" v-model="task.EstadoCliente" :class="{ 'campo-invalido': !task.EstadoCliente }">
          <option value="Activo">Activo</option>
          <option value="Inactivo">Inactivo</option>
        </select>
        <span v-if="!task.EstadoCliente" class="error-message">Estado Requerido</span>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label for="latitud">Latitud:</label>
          <input
            type="numeric"
            id="latitud"
            class="input-field"
            v-model="task.latitud"
            readonly
          />
        </div>
        <div class="form-group">
          <label for="longitud">Longitud:</label>
          <input
            type="numeric"
            id="longitud"
            class="input-field"
            v-model="task.longitud"
            readonly
          />
        </div>
      </div>

      <button class="submit-button">Registrar Cliente</button>


    </form>
    
 <div class="container" style="margin-top: 71cqmax;" >
  <h1 class="form-title">Mapa Ubicación Cliente</h1>
    <div id="map" class="map-container"></div>
    <button @click="getLocation" class="custom-button">Obtener Ubicación</button>
   </div>   
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { Task } from '@/interfaces/Task';
import { createTask } from '@/Services/TaskService';
import Swal from 'sweetalert2'
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';


export default defineComponent({
  data() {
    return {
      task: { } as Task,
      nombreValido: true,
      apellidosValidos: true,
      lat: ref(0),
      lng: ref(0),
      map: null as L.Map | null, 
      latitud: 0,
      longitud: 0,
      
    }; 
  },
  
  methods: {
    async saveTask() {
  try {
    this.task.latitud = this.latitud;
    this.task.longitud = this.longitud;
    this.task.NumeroIncidente
    const res = await createTask(this.task);
    console.log(res);

    if (res) { 
      Swal.fire({
        icon: 'success',
        title: 'Cliente Registrado',
        text: 'El cliente se ha registrado correctamente.',
      });
      
      this.$router.push({ name: 'tasks' });
    } else {

      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un error al registrar al cliente. Por favor, inténtelo de nuevo.',
      });
    }
  } catch (error) {

    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Hubo un error inesperado al registrar al cliente. Por favor, inténtelo de nuevo más tarde.',
    });
    console.error(error);
  }
},
    esCorreoValido(email: string) {
      const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      return regex.test(email);
    },
    validarNombre() {
      const regex = /^[A-Za-z\s]+$/;
      this.nombreValido = regex.test(this.task.Nombre);
    },
    validarApellidos() { 
      const regex = /^[A-Za-z\s]+$/;
      this.apellidosValidos = regex.test(this.task.title);
    },
    getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;

          this.latitud = this.lat;
          this.longitud = this.lng;

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

    generarNumeroIncidente() {
      return Math.floor(100000 + Math.random() * 900000);
    },
    created() {
    this.task.NumeroIncidente = this.generarNumeroIncidente();
  },
  },



  mounted() {
  if (this.lat !== 0 && this.lng !== 0) {
    this.createMap();
  }
  },
});
</script>

<style scoped>
.form-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.form {
  width: 80%;
  max-width: 400px;
  padding: 20px;
  background-color: #f7f7f7;
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
}

.input-field,
.textarea-field {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.submit-button {
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.submit-button:hover {
  background-color: #0056b3;
}

.popup {
  display: none;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
}

.submit-button:focus + .popup {
  display: block;
}

.campo-invalido {
  border-color: red;
}

.error-message {
  color: red;
  font-size: 12px;
}
</style>

<style>
.map-container {
  width: 70%;
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
