<template>
  <login-component title='Регистрация' buttonLabel='Зарегистрироваться' :errMes="errMes" @userData="register">
  </login-component>
  <q-dialog v-model="alert">
    <q-card>
      <q-card-section class="q-ma-lg">
        <div class="text-h6">Пользователь успешно зарегистрирован</div>
      </q-card-section>

      <q-card-actions align="center" class="q-ma-lg">
        <q-btn flat label="Войти" class="text-h6 full-width" color="primary" v-close-popup @click="onLogin" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import LoginComponent from 'components/LoginComponent.vue'
import { useRouter } from 'vue-router';

const axios = require('axios').default.create({
  baseURL: process.env.BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

const alert = ref(false);
const errMes = ref();

const router = useRouter();

function register(user) {
  errMes.value = '';
  axios.post('/auth/register', {
    login: user.email,
    password: user.password
  }).then( () => {
    alert.value = true;
  })
    .catch((error) => {
      errMes.value = error.response.data.message;
    });
}

function onLogin() {
  router.push({ path: 'login' });
}

</script>