<template>
  <div class="container">
    <div class="row">
      <!-- Columna izquierda para Información Visita Cliente -->
      <div class="col-md-6">
        <h3 class="form-title">Información Planificación Cliente</h3>
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
        </form>
      </div>
      <!-- Columna derecha para Registro Visita -->
      <div class="col-md-6">
        <h3 class="form-title">Registro Planificación</h3>
        <form class="form" @submit.prevent="handleUpdate()">
          <div class="form-group">
            <label for="fechaPlanificacion">Fecha de Planificación:</label>
            <input type="date" id="fechaPlanificacion" class="input-field" v-model="currentTask.FechaPlanificacion" />
          </div>
          <div class="form-group">
            <label for="horaPlanificacion">Hora de Planificación:</label>
            <input type="time" id="horaPlanificacion" class="input-field" v-model="currentTask.HoraPlanificacion" />
          </div>
          
          <div class="form-group">
            <label for="estadoPlanificacion">Estado de Planificación:</label>
            <select id="estadoPlanificacion" class="input-field" v-model="currentTask.EstadoPlanificacion">
              <option value="Planificada">Planificada</option>
              <option value="Pendiente">Pendiente</option>
              <option value="Cancelada">Cancelada</option>
            </select>
          </div>

          <div class="form-group">
            <label for="supervisorAsignado">Supervisor Asignado:</label>
            <select id="supervisorAsignado" class="input-field" v-model="currentTask.SupervisorAsignado">
              <option value="Supervisor1">Supervisor 1</option>
              <option value="Supervisor2">Supervisor 2</option>
              <option value="Supervisor3">Supervisor 3</option>
              <option value="Supervisor4">Supervisor 4</option>
            </select>
          </div>
          <div class="form-group">
            <label for="tecnicoAsignado">Técnico Asignado:</label>
            <select id="tecnicoAsignado" class="input-field" v-model="currentTask.TecnicoAsignado">
              <option value="Tecnico1">Técnico 1</option>
              <option value="Tecnico2">Técnico 2</option>
              <option value="Tecnico3">Técnico 3</option>
              <option value="Tecnico4">Técnico 4</option>
              <option value="Tecnico5">Técnico 5</option>
              <option value="Tecnico6">Técnico 6</option>
              <option value="Tecnico7">Técnico 7</option>
              <option value="Tecnico8">Técnico 8</option>
              <option value="Tecnico9">Técnico 9</option>
              <option value="Tecnico10">Técnico 10</option>
              <option value="Tecnico11">Técnico 11</option>
              <option value="Tecnico12">Técnico 12</option>
            </select>
          </div>
          <button class="submit-button">Registrar Planificación</button>
        </form>
      </div>
    </div>
  </div>
</template>

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
  max-width: 400px;
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
  background-color: #b31b00;
}

.button-container {
  display: flex;
  justify-content: center;
}

.input-field[readonly], .textarea-field[readonly] {
  background-color: #f0f0f0;
}
</style>

<script lang="ts">
import { Task } from "@/interfaces/Task";
import { getTask, updateTask, deleteTask } from "@/Services/TaskService";
import { defineComponent } from "@vue/runtime-core";
import Swal from 'sweetalert2';


export default defineComponent({
  data() {
    return {
      currentTask: {} as Task,
      isReadOnly: true, 
    };
  },
  methods: {
    async loadTask(id: string) {
      const res = await getTask(id);
      this.currentTask = res.data;
    },
    async handleUpdate() {
  if (typeof this.$route.params.id === "string") {
    const res = await updateTask(this.$route.params.id, this.currentTask);
    console.log(res);
    // Verificar si la actualización fue exitosa y mostrar una notificación
    if (res.status === 200) {
      Swal.fire({
        icon: 'success',
        title: 'Planificación registrada',
        text: 'La planificación ha sido registrada con éxito.',
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al registrar la planificación.',
      });
    }
    this.$router.push("/TaskListSupervisor");
  }
},

    async handleDelete() {
      if (typeof this.$route.params.id === "string") {
        const res = await deleteTask(this.$route.params.id);
        this.$router.push("/");
      }
    }
  },
  mounted() {
    if (typeof this.$route.params.id === "string") {
      this.loadTask(this.$route.params.id);
    }
  }
});
</script>
