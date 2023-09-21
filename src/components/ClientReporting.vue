<template>
  <div class="container p-5">
    <h1 class="mb-4">Reporteria Cliente</h1>
    <div class="field-selector">
      <label class="mb-2">Campos:</label>
      <div class="form-check" v-for="field in availableFields" :key="field">
        <input
          type="checkbox"
          :id="field"
          :value="field"
          v-model="selectedFields"
          class="form-check-input"
        />
        <label :for="field" class="form-check-label">
          {{ getFieldLabel(field) }}
        </label>
      </div>
    </div>
    <table class="table mt-4" ref="table">
      <!-- Encabezados de la tabla -->
      <thead>
        <tr>
          <th>#</th>
          <th v-for="(field, index) in selectedFields" :key="index">
            {{ getFieldLabel(field) }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(task, index) in tasks" :key="index">
          <td>{{ index + 1 }}</td>
          <td v-for="(field, fIndex) in selectedFields" :key="fIndex">
            <span v-if="field === 'EstadoPlanificacion' && !task[field]" class="text-danger">No planificado</span>
            <span v-else>{{ task[field] }}</span>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="button-container mt-4">
      <button @click="exportToPDF" class="btn btn-danger">
        <i class="fas fa-file-pdf mr-2"></i>Exportar a PDF</button>
        <div style="margin-top: 10px;"></div>
      <button @click="clearSelectedFields" class="btn btn-primary ml-3">
        Limpiar Selección
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Task } from '@/interfaces/Task';
import { getTasks } from '@/Services/TaskService';
import { defineComponent } from 'vue';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default defineComponent({
  data() {
    return {
      tasks: [] as Task[],
      availableFields: [
        'title', 'Nombre', 'email', 'Nit', 'telefono', 'direccion', 'NombreEmpresa',
        'FechaPlanificacion', 'HoraPlanificacion', 'EstadoPlanificacion', 'SupervisorAsignado',
        'FechaIngreso', 'HoraIngreso', 'FechaEgreso', 'HoraEgreso', 'DetalleVisita',
        'TecnicoAsignado', 'EstadoVisita', 'EstadoCliente'
      ],
      selectedFields: [],
    };
  },
  methods: {
    async loadTasks() {
      const res = await getTasks();
      this.tasks = res.data;
    },
    async exportToPDF() {
      const table = this.$refs.table as HTMLTableElement;

      if (!table) {
        console.error("No se pudo encontrar la tabla.");
        return;
      }

      const canvas = await html2canvas(table);
      const pdf = new jsPDF('p', 'mm', 'a4');
      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 10, 10, 190, 0);
      pdf.save('reporte.pdf');
    },
    clearSelectedFields() {
      this.selectedFields = [];
    },
    getFieldLabel(field: string) {
      switch (field) {
        case 'Nombre':
          return 'Nombres';
        case 'title':
          return 'Apellidos';
        case 'email':
          return 'Correo Electrónico';
        case 'Nit':
          return 'Nit';
        case 'telefono':
          return 'Telefono';
        case 'direccion':
          return 'Direccion';
        case 'NombreEmpresa':
          return 'Nombre Empresa';
        case 'FechaPlanificacion':
          return 'Fecha de Planificación';
        case 'HoraPlanificacion':
          return 'Hora de Planificación';
        case 'EstadoPlanificacion':
          return 'Estado de Planificación';
        case 'SupervisorAsignado':
          return 'Supervisor Asignado';
        case 'FechaIngreso':
          return 'Fecha Ingreso Visita';
        case 'HoraIngreso':
          return 'Hora Ingreso Visita';
        case 'FechaEgreso':
          return 'Fecha Egreso Visita';
        case 'HoraEgreso':
          return 'Hora Egreso Visita';
        case 'DetalleVisita':
          return 'Detalle Visita';
        case 'TecnicoAsignado':
          return 'Tecnico Asignado';
        case 'EstadoVisita':
          return 'Estado Visita';
        case 'EstadoCliente':
          return 'Estado Cliente';
        default:
          return field;
      }
    },
  },
  mounted() {
    this.loadTasks();
  },
});
</script>

<style scoped>
.field-selector {
  border: 1px solid #ccc;
  padding: 15px;
  border-radius: 5px;
  background-color: #f7f7f7;
}

.field-selector label {
  font-weight: bold;
}

.form-check-label {
  margin-left: 5px;
}

.button-container {
  display: flex;
  align-items: center;
  margin-top: 20px;
}

.btn-danger {
  background-color: #d9534f;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-danger:hover {
  background-color: #c9302c;
}

.btn-primary {
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.text-danger {
  color: red;
}
</style>
