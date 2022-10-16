<template>
  <q-page class="column items-center justify-center">

    <div class="q-pa-md reg-form">

      <q-form @submit="onSubmit" class="q-gutter-md column items-center justify-center">

        <h1 class="reg-form__title">Регистрация</h1>

        <q-input rounded outlined no-error-icon type="email" v-model="email" label="Email" lazy-rules
          :rules="[ val => val && val.length > 0 || 'Введите email']" class="full-width" />

        <q-input rounded outlined no-error-icon type="password" v-model="password" label="Пароль" lazy-rules
          :rules="[val => val && val.length > 0 || 'Введите пароль']" class="full-width" />

        <q-btn label="Зарегистрироваться" type="submit" color="primary" class="full-width" />

        <p class="reg-form__error">{{errMes}}</p>

      </q-form>

    </div>
  </q-page>
</template>
  
<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { baseURL } from 'assets/constants'

const axios = require('axios').default;
const axios_instance = axios.create({
  baseURL: baseURL
});
axios_instance.defaults.headers.post['Content-Type'] = 'application/json'

const email = ref(null)
const password = ref(null)
const errMes = ref();

const router = useRouter();

function onSubmit() {
  axios_instance.post('/auth/register', {
    login: email.value,
    password: password.value
  })
    .then(function (resp: any) {
      //нужно залогиниться еще 
      router.push({path: 'user'})
    })
    .catch(function (error: any) {
      errMes.value = error.response.data.message;
    });
}
</script>
  
<style lang="scss">
.reg-form {
  width: $width;

  &__title {
    color: $primary;
    font-size: x-large;
    font-weight: 700;
    margin: 0;
  }

  &__error {
    color: $negative;
  }
}
</style>
  
  
  