<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <div class="container">
        <router-link to="/Principal" class="navbar-brand" style="font-size: 30px;">SkyNet</router-link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <router-link class="nav-link" to="/tasks/new" style="font-size: 20px;">Registro Cliente</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/tasks" style="font-size: 20px;">Lista Clientes</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/TaskListSupervisor" style="font-size: 20px;">Planificación Visitas</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/TaskListTecnico" style="font-size: 20px;">Visitas Hoy</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/PlanningBoard" style="font-size: 20px;">Tablero Planificación</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/ClientReporting" style="font-size: 20px;">Reporteria</router-link>
            </li>
           <!-- <li class="nav-item">
              <router-link class="nav-link" to="/GoogleMap" style="font-size: 20px;">Map</router-link>
            </li>-->
            <li class="nav-item">
            <router-link class="nav-link" to="/user" style="font-size: 25px;">
              <i class="fas fa-user" title="Administración Usuarios"></i> 
            </router-link>
            </li>

            <li class="nav-item">
              <router-link class="nav-link" to="/login" style="font-size: 25px;" @click="confirmLogout">
                <i class="fas fa-sign-out-alt" title="Cerrar Sesión"></i>
              </router-link>
            </li>
            <li class="nav-item" v-if="userRole">
              <span class="nav-link" style="font-size: 25px;">Rol: {{ userRole }}</span>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>



<script lang="ts">
import { defineComponent } from 'vue';
import Swal from 'sweetalert2';

export default defineComponent({
  name: 'AppNavbar',
  props: {
    userRole: String,
  },
  methods: {
    confirmLogout() {
      Swal.fire({
        icon: 'warning',
        title: '¿Cerrar Sesión?',
        text: '¿Estás seguro de que deseas cerrar sesión?',
        showCancelButton: true,
        confirmButtonText: 'Sí, cerrar sesión',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
          this.$router.push("/login");
        }
      });
    },
  },
});
</script>
