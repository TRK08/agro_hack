<template>
  <AppLayout >
    <router-view />
  </AppLayout>
</template>

<script setup lang="ts">

import AppLayout from "@/layouts/AppLayout.vue";
import {onBeforeMount} from "vue";
import {useForecastStore} from "@/stores/forecast";

const {fetchForecast} = useForecastStore()

onBeforeMount(() => {
  fetchForecast({
    lat: 38.97603,
    lon: 45.04484,
    disease: 'mild',
    start_datetime: new Date().toLocaleDateString()})
})
</script>

<style lang="scss">
#app {
  width: 100vw;
  height: 100vh;
}
</style>
