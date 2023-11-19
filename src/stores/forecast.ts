import { defineStore } from 'pinia'
import axios from "axios";
import {normalizeData} from "@/utils";


interface IState {
  fetchStatus: 'init' | 'loading' | 'error' | 'success'
  forecast: Record<string, any>
}
export const useForecastStore = defineStore('forecast',  {
  state: (): IState  => {
    return {
      fetchStatus: 'init',
      forecast: {},
    }
  },

  actions: {
      async fetchForecast(body: {lat: number, lon: number, disease: string, start_datetime: string}) {
          try {

              body.start_datetime = body.start_datetime.split('.').reverse().join('-')

            const res = await axios.post('https://nine-brooms-fall.loca.lt/process_data', body)

            this.forecast = normalizeData(res.data)
          } catch (e: unknown) {
            this.fetchStatus = 'error'
            if (axios.isAxiosError(e)) {
              console.log(e)
              return {
                status: this.fetchStatus,
                code: e.response?.status
              }
            }
          } finally {
            this.fetchStatus = "init"
          }
      }
  }

})
