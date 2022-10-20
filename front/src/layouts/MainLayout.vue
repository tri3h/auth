<template>
  <q-layout view="hHh lpR fFf">

    <q-page-container>
      <transition enter-active-class="animated fadeIn" appear>
        <router-view />
      </transition>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">

</script>
