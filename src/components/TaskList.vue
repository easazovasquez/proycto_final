<template>
  <div class="container">
    <div class="py-5">
      <h1 class="display-4 text-center" style="font-family: 'Arial', sans-serif; color: #333; text-transform: uppercase; letter-spacing: 2px;">Listado Clientes</h1>

      <div class="form-group">
        <label for="filterEstadoCliente" class="h4">Filtrar por Estado Cliente:</label>
        <div class="input-group">
          <select id="filterEstadoCliente" class="custom-select" v-model="selectedEstadoCliente">
            <option value="Todos">Todos</option>
            <option value="Activo">Activo</option>
            <option value="Inactivo">Inactivo</option>
          </select>
          <div class="input-group-append">
            <button class="btn btn-primary" type="button" @click="filterTasks">Filtrar</button>
          </div>
        </div>
      </div>
      <div class="table-responsive">
        <table class="table table-bordered table-hover">
          <thead class="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nombres Cliente</th>
              <th scope="col">Apellidos Cliente</th>
              <th scope="col">Estado Cliente</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(task, index) in filteredTasks" :key="task._id">
              <th scope="row">{{ index + 1 }}</th>
              <td>{{ task.Nombre }}</td>
              <td>{{ task.title }}</td>
              <td :class="{'text-success': task.EstadoCliente === 'Activo', 'text-danger': task.EstadoCliente === 'Inactivo'}">{{ task.EstadoCliente }}</td>
              <td>
                <button class="btn btn-outline-primary btn-sm" @click="viewDetails(task._id)">Detalle Cliente</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Task } from '@/interfaces/Task';
import { getTasks } from '@/Services/TaskService';
import { defineComponent } from 'vue';

export default defineComponent({
  data() {
    return {
      tasks: [] as Task[],
      selectedEstadoCliente: 'Todos' as string,
    };
  },
  methods: {
    async loadTasks() {
      const res = await getTasks();
      this.tasks = res.data;
    },
    viewDetails(taskId: string) {
      this.$router.push('/tasks/' + taskId);
    },
    filterTasks() {
      // Filtrar las tareas en función del estado seleccionado
      if (this.selectedEstadoCliente === 'Todos') {
        // Si se selecciona "Todos", mostrar todas las tareas
        this.loadTasks();
      } else {
        // Filtrar las tareas por estado
        this.tasks = this.tasks.filter(task => task.EstadoCliente === this.selectedEstadoCliente);
      }
    },
  },
  computed: {
    filteredTasks() {
      return this.tasks; // Esta función ya no necesita filtrar de nuevo
    },
  },
  mounted() {
    this.loadTasks();
  },
});
</script>
