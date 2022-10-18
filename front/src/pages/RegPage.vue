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

        <q-dialog v-model="alert" >
          <q-card>
            <q-card-section class="q-ma-lg">
              <div class="text-h6">Пользователь успешно зарегистрирован</div>
            </q-card-section>

            <q-card-actions align="center" class="q-ma-lg">
              <q-btn flat label="Войти" class="text-h6 full-width" color="primary" v-close-popup @click="onLogin" />
            </q-card-actions>
          </q-card>
        </q-dialog>

      </q-form>

    </div>
  </q-page>
</template>
  
<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { baseURL } from 'assets/constants'

const axios = require('axios').default.create({
    baseURL: baseURL,
    headers: {'Content-Type' : 'application/json'}
  });

const email = ref(null)
const password = ref(null)
const errMes = ref();
const alert = ref(false);

const router = useRouter();

function onSubmit() {
  axios.post('/auth/register', {
    login: email.value,
    password: password.value
  })
    .then(function (resp: any) {
      alert.value = true;
    })
    .catch(function (error: any) {
      errMes.value = error.response.data.message;
    });
}

function onLogin() {
  router.push({path: 'login'});
}
</script>
  
<style lang="scss">
.reg-form {
  width: $width;

  &__title {
    color: $primary;
    font-size: x-large;
    font-weight: bold;
    margin: 0;
  }

  &__error {
    color: $negative;
  }
}
</style>
  
  
  