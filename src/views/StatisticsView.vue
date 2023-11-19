<template>
  <div class="statistics-page">
    <AppStatistics />
  </div>
</template>

<script setup lang="ts">

import AppStatistics from "@/components/statistics/AppStatistics.vue";
</script>


<style lang="scss">
.statistics-page {
  width: 100vw;
  height: 100vh;
  padding: 100px 15px 30px;
}
</style>