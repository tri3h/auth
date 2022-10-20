<template>
  <login-component title="Вход" buttonLabel="Войти" :errMes="errMes" @userData="login"></login-component>
</template>
    
<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { baseURL } from 'src/utils/constants'
import LoginComponent from 'components/LoginComponent.vue'

const axios = require('axios').default.create({
  baseURL: baseURL,
  headers: { 'Content-Type': 'application/json' }
});

const errMes = ref();

const router = useRouter();

function login(user) {
  errMes.value = '';
  axios.post('auth/login', {
    login: user.email,
    password: user.password
  })
    .then((resp) => {
      localStorage.setItem('access_token', resp.data.access_token);
      router.replace({ path: 'user' });
    })
    .catch((error) => {
      errMes.value = error.response.data.message;
    });
}

</script>

    
    