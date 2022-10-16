<template>
    <q-page class="column items-center justify-center">
      <div class="menu-wrapper">
      <q-btn color="primary" class="q-my-lg full-width" label="Войти" @click="$router.push('/login')"/>
      <q-btn color="primary" label="Зарегистрироваться" class="full-width" @click="$router.push('/registration')"/>
    </div>
  
    </q-page>
  </template>
  
  <script setup lang="ts">
  import { ref} from 'vue'
  

  </script>
  
  <style lang="scss">
  
  .menu-wrapper {
    width: 350px;
  }
  
  </style>
  
  
  