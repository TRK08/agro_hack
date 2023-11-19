<template>
  <Menubar :model="items">
    <template #item="{ item, props, hasSubmenu }">
      <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
        <a  :href="href" v-bind="props.action" @click="navigate">
          <span :class="item.icon" />
          <span class="ml-2">{{ item.label }}</span>
        </a>
      </router-link>
      <a v-else :href="item.url" :target="item.target" v-bind="props.action">
        <span :class="item.icon" />
        <span class="ml-2">{{ item.label }}</span>
        <span v-if="hasSubmenu" class="pi pi-fw pi-angle-down ml-2" />
      </a>
    </template>
  </Menubar>
</template>
<script setup lang="ts">

import Menubar from "primevue/menubar";
import {ref} from "vue";
import {useRouter} from "vue-router";

const router = useRouter();

const items = ref([
  {
    icon: 'pi pi-map',
    command: () => {
      router.push('/');
    }
  },
  {
    icon: 'pi pi-chart-bar',
    command: () => {
      router.push('/statistics');
    }
  },
]);

</script>


<style lang="scss">

</style>