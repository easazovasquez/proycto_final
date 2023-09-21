<template>
  <div class="form-container" style="margin-top: 18cqmax">
    <h3 class="form-title">Detalle Cliente</h3>
    <form class="form" @submit.prevent="handleUpdate()">
      <div class="form-group">
        <label for="nombre">Nombres:</label>
        <input type="text" id="nombre" class="input-field" v-model="currentTask.Nombre" />
      </div> 
      <div class="form-group">
        <label for="title">Apellidos:</label>
        <input type="text" id="title" class="input-field" v-model="currentTask.title" />
      </div>

      <div class="form-group">
        <label for="email">Email:</label>
        <input type="text" id="email" class="input-field" v-model="currentTask.email" />
      </div>
      <div class="form-group">
        <label for="telefono">Teléfono:</label>
        <input type="text" id="telefono" class="input-field" v-model="currentTask.telefono" />
      </div>
      <div class="form-group">
        <label for="nombreEmpresa">Nombre de la Empresa:</label>
        <input type="text" id="nombreEmpresa" class="input-field" v-model="currentTask.NombreEmpresa" />
      </div>
      <div class="form-group">
        <label for="nit">NIT:</label>
        <input type="text" id="nit" class="input-field" v-model="currentTask.Nit" />
      </div>
      <div class="form-group">
        <label for="direccion">Dirección:</label>
        <textarea rows="3" id="direccion" class="textarea-field" v-model="currentTask.direccion"></textarea>
      </div>
      <div class="form-group">
        <label for="description">Notas o Comentarios:</label>
        <textarea rows="3" id="description" class="textarea-field" v-model="currentTask.description"></textarea>
      </div>
      <div class="form-group">
        <label for="estadoPlanificacion">Estado de Cliente:</label>
        <select id="estadoPlanificacion" class="input-field" v-model="currentTask.EstadoCliente" :class="{ 'campo-invalido': !currentTask.EstadoCliente }">
          <option value="Activo">Activo</option>
          <option value="Inactivo">Inactivo</option>
        </select>
      </div>

          <div class="button-container">
      <button class="submit-button" @click="handleUpdate()">Actualizar</button>
    </div> 
    <div style="margin-top: 10px;"></div> 
    <div class="button-container">
      <button class="delete-button" @click="confirmDelete()">Eliminar</button>
    </div>
    </form>
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
  width: 80%;
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

.delete-button {
  background-color: #ff0000;
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

   
        Swal.fire({
          icon: 'success',
          title: 'Cliente Actualizado',
          text: 'El cliente ha sido actualizado con éxito.',
        }).then(() => {
          this.$router.push("/tasks");
        });
      }
    },

    async handleDelete() {
      if (typeof this.$route.params.id === "string") {
        const res = await deleteTask(this.$route.params.id);
        this.$router.push("/tasks");
      }
    },

    confirmDelete() {
      if (window.confirm('¿Estás seguro de que deseas eliminar este elemento?')) {
        this.handleDelete(); 
      } else {
        // El usuario canceló la eliminación, no se hace nada.
      }
    },
  },
  mounted() {
    if (typeof this.$route.params.id === "string") {
      this.loadTask(this.$route.params.id);
    }
  },
});
</script>
