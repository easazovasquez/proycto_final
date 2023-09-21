<template>
  <div class="container">
    <div class="py-5">
      <h1 class="display-4 text-center">Planificaciones Por Realizar</h1>
      <div class="form-group">
        <label for="filterSupervisor" class="h4">Filtrar por Supervisor:</label>
        <div class="input-group">
          <select id="filterSupervisor" class="custom-select" v-model="supervisorFiltrado">
            <option value="">Todos</option>
            <option value="Supervisor1">Supervisor1</option>
            <option value="Supervisor2">Supervisor2</option>
            <option value="Supervisor3">Supervisor3</option>
            <option value="Supervisor4">Supervisor4</option>
            <!-- Agrega más opciones según tus necesidades -->
          </select>
          <div class="input-group-append">
            <button class="btn btn-primary" type="button">Filtrar</button>
          </div>
        </div>
      </div>

      <!-- Agregar el filtro de Estado de Planificación 
      <div class="form-group">
        <label for="filterEstado" class="h4">Filtrar por Estado de Planificación:</label>
        <div class="input-group">
          <select id="filterEstado" class="custom-select" v-model="estadoFiltrado">
            <option value="">Todos</option>
            <option value="Planificada">Planificada</option>
            <option value="Pendiente">Pendiente</option>
            <option value="Cancelada">Cancelada</option>
            <option value="No Planificada">No Planificado</option>
          </select>
          <div class="input-group-append">
            <button class="btn btn-primary" type="button">Filtrar</button>
          </div>
        </div>
      </div>
-->
      <div class="table-responsive">
        <table class="table table-bordered table-hover">
          <thead class="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nombres Cliente</th>
              <th scope="col">Apellidos Cliente</th>
              <th scope="col">Estado Planificación</th>
              <th scope="col">Supervisor Asignado</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(task, index) in filteredTasks" :key="task._id">
              <th scope="row">{{ index + 1 }}</th>
              <td>{{ task.Nombre }}</td>
              <td>{{ task.title }}</td>
              <td>
                <span :class="{'text-success': task.EstadoPlanificacion === 'Planificado', 'text-warning': task.EstadoPlanificacion === 'Pendiente', 'text-danger': task.EstadoPlanificacion === 'Cancelada'}">{{ task.EstadoPlanificacion || 'No planificado' }}</span>
              </td>
              <td>
                <span :class="{'text-success': task.SupervisorAsignado, 'text-danger': !task.SupervisorAsignado}">{{ task.SupervisorAsignado || 'Sin Supervisor Asignado' }}</span>
              </td>
              <td>
                <button class="btn btn-outline-primary btn-sm" @click="viewDetails(task._id)">Registrar Planificación</button>
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
      supervisorFiltrado: '',
      estadoFiltrado: '', // Agregado el estado de planificación
    };
  },

  methods: {
    async loadTasks() {
      const res = await getTasks();
      this.tasks = res.data;
    },
    viewDetails(taskId: string) {
      this.$router.push('/visitPlanificacion/' + taskId);
    },
  },
  computed: {
    filteredTasks() {
      if (this.supervisorFiltrado === '' && this.estadoFiltrado === '') {
        return this.tasks; // Mostrar todas las tareas si no se selecciona un supervisor ni un estado
      } else if (this.supervisorFiltrado === '') {
        return this.tasks.filter(task => task.EstadoPlanificacion === this.estadoFiltrado);
      } else if (this.estadoFiltrado === '') {
        return this.tasks.filter(task => task.SupervisorAsignado === this.supervisorFiltrado);
      } else {
        return this.tasks.filter(task => task.SupervisorAsignado === this.supervisorFiltrado && task.EstadoPlanificacion === this.estadoFiltrado);
      }
    },
  },
  mounted() {
    this.loadTasks();
  },
});
</script>
