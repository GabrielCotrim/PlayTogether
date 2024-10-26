<template>
  <v-app id="inspire">
    <!-- Header com Navigation Drawer -->
    <AppBarDrawer />

    <v-main class="bg-white">
      <RouterView/>
    </v-main>
  </v-app>
</template>

<script setup>
import AppBarDrawer from '@/components/AppBarDrawer.vue';
</script>
