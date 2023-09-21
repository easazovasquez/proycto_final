<template>
  <div class="container">
    <div class="py-5">
      <h3 class="display-4 text-center">Tablero Planificación</h3>
      <div class="table-responsive">
        <table class="table table-bordered table-hover">
          <thead class="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nombres Cliente</th>
              <th scope="col">Apellidos Cliente</th>
              <th scope="col">Fecha Planificación</th>
              <th scope="col">Técnico Asignado</th>
              <th scope="col">Supervisor Asignado</th>
              <th scope="col">Estado Planificación</th>
              <th scope="col">Estado Visita</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(task, index) in tasks" :key="task._id">
              <th scope="row">{{ index + 1 }}</th>
              <td>{{ task.Nombre }}</td>
              <td>{{ task.title }}</td>
              <td>{{ task.FechaPlanificacion }}</td>
              <td>
                <span :class="{'text-success': task.TecnicoAsignado, 'text-danger': !task.TecnicoAsignado}">{{ task.TecnicoAsignado || 'Sin Técnico Asignado' }}</span>
              </td>
              <td>
                <span :class="{'text-danger': !task.SupervisorAsignado, 'text-success': task.SupervisorAsignado}">{{ task.SupervisorAsignado || 'Sin Supervisor Asignado' }}</span>
              </td>
              <td>
                <span :class="{'text-success': task.EstadoPlanificacion === 'Completado', 'text-danger': !task.EstadoPlanificacion}">{{ task.EstadoPlanificacion || 'No planificado' }}</span>
              </td>
              <td>
                <span :class="{'text-success': task.EstadoVisita === 'Realizado', 'text-danger': !task.EstadoVisita}">{{ task.EstadoVisita || 'Pendiente Realizar' }}</span>
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
import { format } from 'date-fns';

export default defineComponent({
  data() {
    return {
      tasks: [] as Task[],
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
    formatDate(dateString: string) {
      // Convierte la cadena de fecha en un objeto de fecha
      const date = new Date(dateString);
      
      // Formatea la fecha a tu formato deseado (por ejemplo, 'dd/MM/yyyy')
      const formattedDate = format(date, 'dd/MM/yyyy');
      
      return formattedDate;
    },
  },
  mounted() {
    this.loadTasks();
  },
});
</script>
