<template>
  <div class="container">
    <h1 class="titulo">Bienvenido a SkyNet S.A.</h1>
    <p class="descripcion">
      En la ciudad de Guatemala en el año 2017, inicia sus actividades la Empresa SkyNet S. A., la cual se dedica a ofrecer
      Servicios Técnicos y Profesionales en Consultorías de Informática, abarcando las áreas de Infraestructura, Soporte y
      Mantenimiento de Equipos.
    </p>
    <div class="col-md-6 offset-3">
  <div class="card border border-dark">
    <div class="card-body">
      <Bar
        id="my-chart-id"
        :options="chartOptions"
        :data="chartData"
        v-if="chartData.labels"
      />
    </div>
  </div>
</div>
  </div>
</template>

<script>
import { Bar } from 'vue-chartjs';
import { getTasks } from '@/Services/TaskService';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

export default {
  name: 'BarChart',
  components: { Bar },
  props: {
    chartId: {
      type: String,
      default: 'bar-chart'
    }
  },
  data() {
    return {
      chartData: {},
      chartOptions: {
        responsive: true
      }
    }
  },
  async mounted() {
    const res = await getTasks();

    if (Array.isArray(res.data)) {
        const activos = res.data.filter((row) => row.Activo === 'Activo').length;
        const inactivos = res.data.filter((row) => row.Activo === 'Inactivo').length;


      // Crear la gráfica de barras con los valores contados
      this.chartData = {
        labels: ['Activos', 'Inactivos'],
        datasets: [
          {
            label: 'Estados Cliente',
            //data: [activos, inactivos],
            data: [2, 1],
            backgroundColor: ['#006400 ', '#FF6384']
          }
        ]
      };
    } else {
      console.error('Los datos en la respuesta son undefined o vacíos.');
    }
  }
}
</script>