<template>
  <div class="form-container">
    <form class="form" @submit.prevent="loginUser()">
      <h1 class="form-title">Iniciar Sesión</h1>
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

      <button class="submit-button">Iniciar Sesión</button>
      <div class="popup">
        <p v-if="isUserLoggedIn" class="success-message">¡Inicio de sesión exitoso!</p>
        <p v-else-if="loginError" class="error-message">{{ loginError }}</p>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { User } from '@/interfaces/User';
import { loginUser } from '@/Services/UserService';
import Swal from 'sweetalert2';

export default defineComponent({
  data() {
    return {
      user: {} as User,
      isUserLoggedIn: false,
      loginError: null as string | null, 
    userRole: null as string | null,
    };
  },
  methods: {
    async loginUser() {
      try {
        const response = await loginUser(this.user);

        if (response.data.message === 'Inicio de sesión exitoso') {
          this.isUserLoggedIn = true;
          this.userRole = response.data.role;

          // Mostrar notificación de éxito
          Swal.fire({
            icon: 'success',
            title: 'Inicio de Sesión Exitoso',
            text: '¡Has iniciado sesión con éxito!',
          }).then(() => {
            this.$router.push({ name: 'Pagina-Principal' });
          });
        } else {
          this.loginError = 'Error al iniciar sesión. Verifica tus credenciales.';
        }
      } catch (error) {
        console.error('Error al iniciar sesión:', error);
        this.loginError = 'Error al iniciar sesión. Verifica tus credenciales.';
      }
    },
  },
});
</script>

<style scoped>
.form-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f0f0f0;
}

.form {
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.1);
  padding: 30px;
  width: 300px;
  margin: 0 auto;
}

.form-title {
  font-size: 24px;
  text-align: center;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 20px;
}

.input-field {
  width: 100%;
  padding: 12px;
  border: 2px solid #ccc;
  border-radius: 6px;
  transition: box-shadow 0.3s;
}

.input-field:focus {
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
}

.submit-button {
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 12px 15px;
  cursor: pointer;
  width: 100%;
  transition: background-color 0.2s;
  margin-top: 20px;
}

.submit-button:hover {
  background-color: #0056b3;
}

.popup {
  text-align: center;
  margin-top: 20px;
}

.success-message {
  color: #00a000;
}

.error-message {
  color: #ff0000;
}
</style>
