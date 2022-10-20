<template>
  <q-page class="column items-center justify-center">

    <div class="q-pa-md login-form">

      <q-form @submit="onSubmit" class="q-gutter-md column items-center justify-center">

        <h1 class="login-form__title">{{title}}</h1>

        <q-input rounded outlined no-error-icon type="text" v-model="email" label="Email" lazy-rules
          :rules="[ val => val && isValidEmail(val) || 'Введите email']" class="full-width" />

        <q-input rounded outlined no-error-icon type="password" v-model="password" label="Пароль" lazy-rules
          :rules="[val => val && val.length > 0 || 'Введите пароль']" class="full-width" />

        <q-btn :label=buttonLabel type="submit" color="primary" class="full-width" />

        <p class="login-form__error">{{errMes}}</p>

      </q-form>

    </div>
  </q-page>
</template>
      
<script setup lang="ts">
import { ref } from 'vue'

const email = ref();
const password = ref();

defineProps(['title', 'buttonLabel', 'errMes']);

const emits = defineEmits(['userData']);

function onSubmit() {
  emits('userData', { email: email.value, password: password.value });
}

function isValidEmail(email: string) {
  const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailPattern.test(email);
}
</script>
      
<style lang="scss">
.login-form {
  width: 350px;

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
      
      
      