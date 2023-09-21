<template>
    <div class="container p-5">
      <router-link :to="{ name: 'user-create' }">
        <button class="btn btn-primary mb-3">Crear Usuario</button>
      </router-link>
  
      <h1 class="mb-4">Lista de Usuarios</h1>
  
      <table class="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre Usuario</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in users" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ user.username }}</td>
            <td>{{ user.rol }}</td>
            <td>
              <button class="btn btn-success btn-sm" @click="viewDetails(user._id)">Gestionar Usuario</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script lang="ts">
  import { User } from '@/interfaces/User';
  import { getUsers } from '@/Services/UserService';
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    data() {
      return {
        users: [] as User[],
      };
    },
    methods: {
      async loadUsers() {
        const res = await getUsers();
        this.users = res.data;
      },
      viewDetails(userId: string) {
        this.$router.push('/users/' + userId);
      },
    },
    mounted() {
      this.loadUsers();
    },
  });
  </script>
  
  <style scoped>
  /* Estilos personalizados para la página */
  .container {
    background-color: #f8f9fa;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  }
  
  h1 {
    font-size: 24px;
  }
  
  .btn-primary {
    background-color: #007bff;
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  /* Estilos para la tabla */
  .table {
    border-collapse: collapse;
    width: 100%;
    margin-bottom: 20px;
  }
  
  .table th,
  .table td {
    padding: 10px;
    text-align: left;
  }
  
  .table th {
    background-color: #007bff;
    color: #fff;
  }
  
  .btn-success {
    background-color: #28a745;
    color: #fff;
    border: none;
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .btn-success:hover {
    background-color: #218838;
  }
  </style>
  