<template>
  <div class="statistics">
    <div class="statistics__filters">
      <Calendar v-model="date" date-format="dd.mm.yy" placeholder="Выберите дату" style="width: 100%;" />
      <Dropdown
          v-model="selectedVirus"
          :options="optionsVirus"
          optionLabel="name"
          placeholder="Выберите заболевание"
          style="width: 100%;"
      />
      <Button label="Применить" @click="getForecast"></Button>
    </div>
    <div class="statistics__chart">
      <h3>График вероятность заболеваний</h3>
      <Chart type="line" :data="chartData" :options="chartOptions" style="height: 60vh; width: fit-content; min-width: 60vw; margin: 0 auto; background-color: #FAFAF8; padding: 15px;" />
    </div>
  </div>
</template>

<script setup lang="ts">
import Chart from "primevue/chart";
import Button from "primevue/button";
import Calendar from "primevue/calendar";
import Dropdown from "primevue/dropdown";
import {onMounted, ref, watch} from "vue";
import {storeToRefs} from "pinia";
import {useForecastStore} from "@/stores/forecast";


const {forecast} = storeToRefs(useForecastStore())
const {fetchForecast} = useForecastStore()

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

const map = {
  'mild': 'Милдью или ложная мучнистая роса',
  'oidium': 'Оидиум',
  'antra': 'Антракноз',
  'gray': 'Серая гниль',
  'blackDots': 'Чёрная пятнистость',
  'black': 'Чёрная гниль',
  'white': 'Белая гниль',
  'vilt': 'Вертициллезноеувядание (вилт)',
  'alternarioz': 'Альтернариоз',
  'fuzarioz': 'Фузариоз',
  'krasnuha': 'Краснуха',
  'bakterial': 'Бактериальный рак'
}
const chartData = ref();
const chartOptions = ref();


const getForecast = async () => {
 await fetchForecast({
   lat: 38.97603,
   lon: 45.04484,
   disease: selectedVirus.value.code,
   start_datetime: date.value.toLocaleDateString()
 })
}

const getRandomColor = () => {
  return `#${Math.floor(Math.random()*16777215).toString(16)}`;
}


watch(forecast, () => {
  chartData.value = setChartData();
  chartOptions.value = setChartOptions();
})

onMounted(() => {
  chartData.value = setChartData();
  chartOptions.value = setChartOptions();
});

const setChartData = () => {
  return {
    labels: forecast.value.time,
    datasets: [{
      // @ts-ignore
      label: map[forecast.value.disease] || '',
      data: forecast.value.threat,
      fill: false,
      borderColor: getRandomColor(),
      tension: 0.4
    }]
  };
};

const setChartOptions = () => {
  return {
    plugins: {
      legend: {
        position: 'bottom'
      }
    },
    responsive: true,
  }
}
</script>


<style lang="scss">
.statistics {
  &__filters {
    padding: 15px;
    background-color: #333544;
    border-radius: .5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    @media (max-width: 768px) {
      flex-direction: column;
    }
  }
  &__chart {
    background-color: #333544;
    border-radius: .5rem;
    padding: 15px;
    margin-top: 2rem;
    display: flex;
    justify-content: center;
    flex-direction: column;
    h3 {
      text-align: center;
    }
  }
}
</style>