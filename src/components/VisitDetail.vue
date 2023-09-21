<template>
  <div class="container">
    <div class="row">
      <!-- Columna izquierda para Información Visita Cliente -->
      <div class="col-md-6">
        <h3 class="form-title">Información Visita Cliente</h3>
        <form class="form">
          <div class="form-group">
            <label for="nombre">Nombres:</label>
            <input type="text" id="nombre" class="input-field" v-model="currentTask.Nombre" :readonly="isReadOnly" />
          </div>
          <div class="form-group">
            <label for="title">Apellidos:</label>
            <input type="text" id="title" class="input-field" v-model="currentTask.title" :readonly="isReadOnly" />
          </div>
          <div class="form-group">
            <label for="email">Email:</label>
            <input type="text" id="email" class="input-field" v-model="currentTask.email" :readonly="isReadOnly" />
          </div>
          <div class="form-group">
            <label for="telefono">Teléfono:</label>
            <input type="text" id="telefono" class="input-field" v-model="currentTask.telefono" :readonly="isReadOnly" />
          </div>
          <div class="form-group">
            <label for="direccion">Dirección:</label>
            <textarea class="textarea-field" id="direccion" rows="3" v-model="currentTask.direccion" :readonly="isReadOnly"></textarea>
          </div>
          <div class="form-group">
            <label for="description">Notas o Comentarios:</label>
            <textarea class="textarea-field" id="description" rows="3" v-model="currentTask.description" :readonly="isReadOnly"></textarea>
          </div>
          <div class="form-group">
            <label for="latitud">Latitud:</label>
            <input type="numeric" id="latitud" class="input-field" v-model="currentTask.latitud" :readonly="isReadOnly" />
          </div>
          <div class="form-group">
            <label for="longitud">Longitud:</label>
            <input type="numeric" id="longitud" class="input-field" v-model="currentTask.longitud" :readonly="isReadOnly" />
          </div>
        </form>
        <div id="map" style="height: 400px;"></div>
      </div>
      <!-- Columna derecha para Registro Visita -->
      <div class="col-md-6">
        <h3 class="form-title">Registro Visita</h3>
        <form class="form" @submit.prevent="handleUpdate()">
          <div class="form-group">
            <label for="fechaIngreso">Fecha de Ingreso:</label>
            <input type="date" id="fechaIngreso" class="input-field" v-model="currentTask.FechaIngreso" />
          </div>
          <div class="form-group">
            <label for="horaIngreso">Hora de Ingreso:</label>
            <input type="time" id="horaIngreso" class="input-field" v-model="currentTask.HoraIngreso" />
          </div>
          <div class="form-group">
            <label for="fechaEgreso">Fecha de Egreso:</label>
            <input type="date" id="fechaEgreso" class="input-field" v-model="currentTask.FechaEgreso" />
          </div>
          <div class="form-group">
            <label for="horaEgreso">Hora de Egreso:</label>
            <input type="time" id="horaEgreso" class="input-field" v-model="currentTask.HoraEgreso" />
          </div> 

          <div class="form-group">
            <label for="estadoVisita">Estado de Visita:</label>
            <select id="estadoVisita" class="input-field" v-model="currentTask.EstadoVisita">
              <option value="Completada">Completada</option>
              <option value="En Progreso">En Progreso</option>
              <option value="Cancelada">Cancelada</option>
              <option value="Reprogramada">Reprogramada</option>
              <option value="En Espera">En Espera</option>
              <option value="Sin Contacto">Sin Contacto</option>
              <option value="En Retraso">En Retraso</option>
              <option value="Suspendida">Suspendida</option>
            </select>
          </div>

          <div class="form-group">
            <label for="detalleVisita">Detalle de la Visita:</label>
            <textarea class="textarea-field" id="detalleVisita" rows="3" v-model="currentTask.DetalleVisita"></textarea>
          </div>
          <button class="submit-button">Registrar Visita</button>
          <div style="margin-top: 10px;"></div> 
          <button class="submit-button" @click="enviarCorreo">
            <i class="fas fa-envelope"></i> Enviar Correo
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Task } from "@/interfaces/Task";
import { getTask, updateTask, deleteTask, enviarMail } from "@/Services/TaskService";
import { defineComponent } from "@vue/runtime-core";
import Swal from 'sweetalert2';
import L from 'leaflet';

export default defineComponent({
    data() {
        return{
            currentTask: {} as Task,
            isReadOnly: true, 
        };
    },
    methods:{
        async loadTask(id: string){
          const res = await  getTask(id);
          this.currentTask = res.data;
        },
        async handleUpdate() {
  if (typeof this.$route.params.id === "string") {
    const res = await updateTask(this.$route.params.id, this.currentTask);
    console.log(res);
    if (res.status === 200) {
      Swal.fire({
        icon: 'success',
        title: 'Visita registrada',
        text: 'La visita ha sido registrada con éxito.',
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al registrar la visita.',
      });
    }
    this.$router.push("/TaskListTecnico");
  }
},

async enviarCorreo() {
  try {
    await this.handleUpdate(); // Primero, guarda la información en la base de datos

    // Formatea los campos del registro de visita en el cuerpo del correo
    const correoContenido = `
      Nombres: ${this.currentTask.Nombre}
      Apellidos: ${this.currentTask.title}
      Email: ${this.currentTask.email}
      Teléfono: ${this.currentTask.telefono}
      Dirección: ${this.currentTask.direccion}
      Notas o Comentarios: ${this.currentTask.description}
      Fecha de Ingreso: ${this.currentTask.FechaIngreso}
      Hora de Ingreso: ${this.currentTask.HoraIngreso}
      Fecha de Egreso: ${this.currentTask.FechaEgreso}
      Hora de Egreso: ${this.currentTask.HoraEgreso}
      Detalle de la Visita: ${this.currentTask.DetalleVisita}
    `;

    // Luego, envía el correo con la información del cliente
    await enviarMail(correoContenido);

    // Muestra una notificación de éxito al enviar el correo
    Swal.fire({
      icon: 'success',
      title: 'Correo enviado',
      text: 'El correo ha sido enviado al cliente con la información de la visita.',
    });
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Hubo un problema al enviar el correo.',
    });
  }
},
        async handleDelete(){
            if (typeof this.$route.params.id === "string"){
            const res = await deleteTask(this.$route.params.id);
            this.$router.push("/");
            }
        }
    },
    mounted() {
  if (typeof this.$route.params.id === "string") {
    this.loadTask(this.$route.params.id).then(() => {
      // Verificar si latitud y longitud son números válidos antes de crear el mapa
      if (typeof this.currentTask.latitud === "number" && typeof this.currentTask.longitud === "number") {
        // Crear un mapa en el elemento con ID "map"
        const map = L.map('map').setView([this.currentTask.latitud, this.currentTask.longitud], 15);

        // Agregar una capa de mapa (por ejemplo, OpenStreetMap)
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
        }).addTo(map);

        // Agregar un marcador en la ubicación de latitud y longitud
        L.marker([this.currentTask.latitud, this.currentTask.longitud]).addTo(map);
      } else {
        console.error("Latitud y/o longitud no válidas");
      }
    });
  }
},
});
</script>

<style scoped>
.form-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
}

.form-title {
    font-size: 24px;
    margin-bottom: 20px;
}

.form {
    width: 100%;
    max-width: 500px; /* Aumenté el ancho máximo del formulario */
    padding: 20px;
    background-color: #f7f7f7;
    border-radius: 8px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
}

.input-field,
.textarea-field {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.submit-button,
.delete-button {
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 10px 20px;
    cursor: pointer;
    transition: background-color 0.2s;
}

.submit-button:hover,
.delete-button:hover {
    background-color: #b31b00;
}

.button-container {
    display: flex;
    justify-content: center;
}
</style>
