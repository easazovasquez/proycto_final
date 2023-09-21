<template>
    <div class="form-container">
      <h3 class="form-title">Usuario</h3>
      <form class="form" @submit.prevent="handleUpdate()">
        <div class="form-group">
          <label for="nombre">Nombre Usuario:</label>
          <input type="text" id="nombre" class="input-field" v-model="currentUser.username" />
        </div>
       <!-- <div class="form-group">
          <label for="title">Contraseña:</label>
          <input type="text" id="title" class="input-field" v-model="currentUser.password" />
        </div>-->
  
        <div class="form-group">
          <label for="rolUsuario">Rol Usuario:</label>
          <select id="rolUsuario" class="input-field" v-model="currentUser.rol" :class="{ 'campo-invalido': !currentUser.rol }">
            <option value="administrador">Administrador</option>
            <option value="tecnico">Técnico</option>
            <option value="supervisor">Supervisor</option>
          </select>
        </div>
        <div class="button-container" style="display: flex; justify-content: space-between;">
       <!-- <button class="submit-button">Actualizar</button>-->
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
  import { User } from "@/interfaces/User";
  import { getUser, updateUser, deleteUser } from "@/Services/UserService";
  import { defineComponent } from "@vue/runtime-core";
  
  export default defineComponent({
      data() {
          return {
              currentUser: {} as User,
          };
      },
      methods: {
          async loadUser(id: string) {
              const res = await getUser(id);
              this.currentUser = res.data;
          },
          async handleUpdate() {
              if (typeof this.$route.params.id === "string") {
                  const res = await updateUser(this.$route.params.id, this.currentUser);
                  console.log(res);
                  this.$router.push({ name: 'users' });
              }
          },
          async handleDelete() {
              if (typeof this.$route.params.id === "string") {
                  const res = await deleteUser(this.$route.params.id);
                  this.$router.push({ name: 'users' });
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
              this.loadUser(this.$route.params.id);
          }
      },
  });
  </script>
  