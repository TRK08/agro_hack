<template>
<div class="weather-page">
 <span>123</span>
</div>
</template>
<script setup lang="ts">

import { fetchWeatherApi } from 'openmeteo';
import {onMounted} from "vue";

onMounted(async () => {
  const params = {
    "latitude": 52.52,
    "longitude": 13.41,
    "start_date": "2023-07-01",
    "end_date": "2023-07-02",
    "hourly": "temperature_2m",
    "daily": "sunrise",
    "timezone": "Europe/Moscow"
  };
  const url = "https://archive-api.open-meteo.com/v1/archive";
  const responses = await fetchWeatherApi(url, params);

// Helper function to form time ranges
  const range = (start: number, stop: number, step: number) =>
      Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

// Process first location. Add a for-loop for multiple locations or weather models
  const response = responses[0];

// Attributes for timezone and location
  const utcOffsetSeconds = response.utcOffsetSeconds();
  const timezone = response.timezone();
  const timezoneAbbreviation = response.timezoneAbbreviation();
  const latitude = response.latitude();
  const longitude = response.longitude();

  const hourly = response.hourly()!;
  const daily = response.daily()!;

// Note: The order of weather variables in the URL query and the indices below need to match!
  const weatherData = {

    hourly: {
      time: range(Number(hourly.time()), Number(hourly.timeEnd()), hourly.interval()).map(
          (t) => new Date((t + utcOffsetSeconds) * 1000)
      ),
      temperature2m: hourly.variables(0)!.valuesArray()!,
    },
    daily: {
      time: range(Number(daily.time()), Number(daily.timeEnd()), daily.interval()).map(
          (t) => new Date((t + utcOffsetSeconds) * 1000)
      )
    },

  };

// `weatherData` now contains a simple structure with arrays for datetime and weather data
  for (let i = 0; i < weatherData.hourly.time.length; i++) {
    console.log(
        weatherData.hourly.time[i].toISOString(),
        weatherData.hourly.temperature2m[i]
    );
  }
  for (let i = 0; i < weatherData.daily.time.length; i++) {
    console.log(
        weatherData.daily.time[i].toISOString()
    );
  }
})

</script>


<style lang="scss">
.weather-page {
  padding-top: 75px;
}
</style>