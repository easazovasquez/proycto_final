<template>
  <div class="container">
    <div class="py-5">
      <h1 class="display-4 text-center">Visitas Planificadas Para Hoy</h1>
      <div class="form-group">
  <label for="filterTecnico" class="h4">Filtrar por Técnico Asignado:</label>
  <div class="input-group">
    <select id="filterTecnico" class="custom-select" v-model="tecnicoFiltrado">
      <option value="">Todos</option>
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
      <!-- Agrega más opciones según tus necesidades -->
    </select>
    <div class="input-group-append">
      <button class="btn btn-primary" type="button">Filtrar</button>
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
              <th scope="col">Estado Visita</th>
              <th scope="col">Técnico Asignado</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(task, index) in filteredTasks" :key="task._id">
              <th scope="row">{{ index + 1 }}</th>
              <td>{{ task.Nombre }}</td>
              <td>{{ task.title }}</td>
              <td>
                <span :class="{'text-danger': !task.EstadoVisita, 'text-success': task.EstadoVisita}">{{ task.EstadoVisita || 'Pendiente Realizar' }}</span>
              </td>
              <td>
              
                <span :class="{'text-danger': !task.TecnicoAsignado, 'text-success': task.TecnicoAsignado}">{{ task.TecnicoAsignado || 'Sin Técnico Asignado' }}</span>
              </td>

              <td>
                <button class="btn btn-outline-primary btn-sm" @click="viewDetails(task._id)">Registrar Visita</button>
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
      tecnicoFiltrado: '',
    };
  },
  methods: {
    async loadTasks() {
      const res = await getTasks();
      this.tasks = res.data;
    },
    viewDetails(taskId: string) {
      this.$router.push('/visit/' + taskId);
    },
  },
  computed: {
    filteredTasks() {
      if (this.tecnicoFiltrado === '') {
        return this.tasks; // Mostrar todas las tareas si no se selecciona un técnico
      } else {
        return this.tasks.filter(task => task.TecnicoAsignado === this.tecnicoFiltrado);
      }
    },
  },
  mounted() {
    this.loadTasks();
  },
});
</script>
