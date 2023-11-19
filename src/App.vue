<template>
  <AppLayout >
    <router-view />
  </AppLayout>
</template>

<script setup lang="ts">

import AppLayout from "@/layouts/AppLayout.vue";
</script>

<style lang="scss">
#app {
  width: 100vw;
  height: 100vh;
}
</style>
