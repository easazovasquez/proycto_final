<template>
  <div class="form-container">
    <form class="form" @submit.prevent="saveUser()">
      <h1 class="form-title">Registro Usuario</h1>
      <div class="form-row">

        <div class="form-group">
        <label for="username">Usuario:</label>
        <input
          type="text"
          id="username"
          class="input-field"
          placeholder="Escriba el Usuario"
          v-model="user.username"
        /> 
        <span v-if="!user.username" class="error-message">Username Requerido</span>
      </div>

      <div class="form-group">
        <label for="password">Contraseña:</label>
        <input
          type="password"
          id="password"
          class="input-field"
          placeholder="Escriba contraseña"
          v-model="user.password"
        />
        <span v-if="!user.password" class="error-message">Password Requerido</span>
      </div>
    </div>

    <div class="form-group">
          <label for="estadoPlanificacion">Rol Usuario:</label>
          <select id="estadoPlanificacion" class="input-field" v-model="user.rol" :class="{ 'campo-invalido': !user.rol }">
            <option value="administrador">Administrador</option>
            <option value="tecnico">Tecnico</option>
            <option value="supervisor">Supervisor</option>
          </select>
          <span v-if="!user.rol" class="error-message">Rol Requerido</span>
        </div>



      <button class="submit-button">Registrar Usuario</button>
     <!-- <div class="popup">
        <p>¡Usuario Registrado!</p>
      </div> -->
    </form>
  </div>
</template>
 

  <script lang="ts">
  import { defineComponent } from 'vue';
  import { User } from '@/interfaces/User';
  import { createUser } from '@/Services/UserService';
  import Swal from 'sweetalert2';
  
  export default defineComponent({
    data() {
      return {
        user: {} as User,
      };
    },
    methods: {
      async saveUser() {
  try {
    const res = await createUser(this.user);
    console.log(res);

    if (res.status === 201) {
      // Mostrar notificación de éxito
      Swal.fire({
        icon: 'success',
        title: 'Usuario registrado',
        text: 'El usuario ha sido registrado con éxito.',
      });

      // Limpiar los campos del formulario o hacer cualquier otra acción necesaria
      this.user = {} as User;

      // Redirigir al usuario a la página de usuarios u otra página según tus necesidades
      this.$router.push({ name: 'users' });
    } else {
      // Mostrar notificación de error si la creación del usuario falló
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al registrar el usuario.',
      });
    }
  } catch (error) {
    console.error('Error al registrar el usuario:', error);
    // Puedes manejar el error o mostrar una notificación adicional si es necesario
  }
},

    }
    
  });
  </script>



    <style>
        .campo-invalido {
            border-color: red;
        }

        .error-message {
            color: red;
            font-size: 12px;
        }
    </style>


      <style>
      .submit-button {
          padding: 10px 20px;
          background-color: #007bff;
          color: #fff;
          border: none;
          cursor: pointer;
      }

      .popup {
          display: none;
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background-color: #fff;
          padding: 20px;
          box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
      }


      .submit-button:focus + .popup {
          display: block;
      }
  </style>
  
  <style scoped>
  .form-container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
  }
  
  .form {
      width: 80%;
      max-width: 400px;
      padding: 20px;
      background-color: #f7f7f7;
      border-radius: 8px;
      box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .input-field,
  .textarea-field {
      width: 100%;
      padding: 10px;
      margin-bottom: 10px;
      border: 1px solid #ccc;
      border-radius: 4px;
  }
  
  .submit-button {
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      padding: 10px 20px;
      cursor: pointer;
      transition: background-color 0.2s;
  }
  
  .submit-button:hover {
      background-color: #0056b3;
  }
  </style>
  