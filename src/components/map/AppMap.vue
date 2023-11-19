<template>
  <div class="map">
    <div class="map__container" id="map"></div>
    <div class="map__zoomButtons">
      <Button @click="zoomIn" icon="pi pi-plus" ></Button>
      <Button @click="zoomOut" icon="pi pi-minus"></Button>
    </div>

    <Button class="map__filters" @click="toggleFilters">
      <span>Настройки</span>
      <i class="pi pi-filter" />
    </Button>

    <OverlayPanel ref="overlayPanel" class="map__filters-overlay">
      <Calendar v-model="date" date-format="dd.mm.yy" placeholder="Выберите дату" />

      <Dropdown
          v-model="selectedVirus"
          :options="optionsVirus"
          optionLabel="name"
          placeholder="Выберите заболевание"
          style="width: 100%;"
      />

      <Button label="Применить" @click="getForecast"></Button>

      <Button class="map__filters-export" @click="exportMap">
        <span>Скриншот карты</span>
        <i class="pi pi-download" />
      </Button>
    </OverlayPanel>
  </div>
</template>
<script setup lang="ts">
import Button from 'primevue/button';
import Calendar from 'primevue/calendar';
import OverlayPanel from 'primevue/overlaypanel';
// @ts-ignore
import {Map as Maptalks, TileLayer} from 'maptalks'
// @ts-ignore
import { HeatLayer } from 'maptalks.heatmap';
import 'maptalks/dist/maptalks.css'

import {onMounted, ref, watch} from "vue";
import {storeToRefs} from "pinia";
import {useForecastStore} from "@/stores/forecast";
import Dropdown from "primevue/dropdown";


const {forecast} = storeToRefs(useForecastStore())
const {fetchForecast} = useForecastStore()

const overlayPanel = ref(null)
const date = ref(new Date());
const selectedVirus = ref({
  name: 'Милдью или ложная мучнистая роса',
  code: 'mild'
})
const optionsVirus = ref([
  {
    name: 'Милдью или ложная мучнистая роса',
    code: 'mild'
  },
  {
    name: 'Оидиум',
    code: 'oidium'
  },
  {
    name: 'Антракноз',
    code: 'antra'
  },
  {
    name: 'Серая гниль',
    code: 'gray'
  },
  {
    name: 'Чёрная пятнистость',
    code: 'blackDots'
  },
  {
    name: 'Чёрная гниль',
    code: 'black'
  },
  {
    name: 'Белая гниль',
    code: 'white'
  },
  {
    name: 'Вертициллезноеувядание (вилт)',
    code: 'vilt'
  },
  {
    name: 'Альтернариоз',
    code: 'alternarioz'
  },
  {
    name: 'Фузариоз',
    code: 'fuzarioz'
  },
  {
    name: 'Краснуха',
    code: 'krasnuha'
  },
  {
    name: 'Бактериальный рак',
    code: 'bakterial'
  },
]);

const map = ref(null);

onMounted(() => {
  map.value = new Maptalks('map', {
    center: [38.97603, 45.04484],
    zoom: 12,
    maxZoom : 14,
    minZoom : 5,
    attribution: false,
    baseLayer: new TileLayer('base', {
      urlTemplate: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
      subdomains: ["a","b","c","d"]
    })
  });

  // @ts-ignore
  const data = forecast.value.threat?.map(item => [forecast.value.lat, forecast.value.lon, item])
  new HeatLayer('heat', data).addTo(map.value);
})


watch(forecast, () => {
  // @ts-ignore
  const data = forecast.value.threat.map(item => [forecast.value.lat, forecast.value.lon, item])
  new HeatLayer(`heat${Math.random()}`, data).addTo(map.value);
})

const getForecast = async () => {
  await fetchForecast({
    lat: 38.97603,
    lon: 45.04484,
    disease: selectedVirus.value.code,
    start_datetime: date.value.toLocaleDateString()
  })
}


const zoomIn = () => {
  // @ts-ignore
  map.value?.zoomIn();
}

const zoomOut = () => {
  // @ts-ignore
  map.value?.zoomOut();
}

const exportMap = () => {
  // @ts-ignore
  map.value?.toDataURL({
    'mimeType' : 'image/jpeg',
    'save' : true,
    'fileName' : 'map'
  });
}

const toggleFilters = (event: any) => {
  // @ts-ignore
  overlayPanel.value.toggle(event);
}

</script>


<style lang="scss">
.map {
  &__container {
    width: 100vw;
    height: 100vh;
  }
  &__zoomButtons {
    position: absolute;
    top: 50%;
    left: 30px;
    display: flex;
    flex-direction: column;
    gap: .5rem;
  }
  &__filters {
    position: absolute;
    right: 15px;
    top: 15px;
    display: flex;
    gap: .5rem;
    &-export {
      display: flex;
      justify-content: space-between;
    }
    &-overlay {
      .p-overlaypanel-content {
        width: 300px;
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }
    }
  }
}
</style>