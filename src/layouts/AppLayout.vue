<template>
  <div class="app-layout">
    <AppHeader class="app-layout__header" />
    <slot />
  </div>
</template>

<script setup lang="ts">
import AppHeader from "@/components/UI/AppHeader.vue";
</script>


<style lang="scss">
.app-layout {
  position: relative;
  &__header {
    z-index: 10;
    position: absolute;
    top: 15px;
    left: 15px;
  }
}
</style>