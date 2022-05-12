<template>
  <div class="small">
    <h1>都道府県人口比較グラフ</h1>
    <div class="prefecture-con">
      <div class="prefecture" v-for="prefecture in prefectures" :key="prefecture.prefCode">
        <input type="checkbox" v-model="prefecture.select" @change="selectPrefecture()"/>
        <label>{{prefecture.prefName}}</label>
      </div>
    </div>
    <line-chart class="line-chart" :chart-data="datacollection"></line-chart>
  </div>
</template>

<script>
  import LineChart from './LineChart.js'
  import dataService from '../api/data'
  const { decycle } = require('json-cyclic')

  export default {
    components: {
      LineChart
    },
    data () {
      return {
        datacollection: null,
        data:{
          labels: [1960,1965,1970,1975,1980,1985,1990,1995,2000,2005,2010,2015,2020,2025,2030,2035,2040,2045],
          datasets:[]
        },
        prefectures:[],
      }
    },
    mounted () {
      this.getPrefectures()
      this.selectPrefecture()
    },
    methods: {
      async selectPrefecture() {
        this.data.datasets = []
        for(let prefecture of this.prefectures){
          if(prefecture.select){
            let populations = await dataService.getPopulation(prefecture.prefCode)
            let populationValue = []
            for(let population of populations.data.result.data[0].data){
              populationValue.push(population.value)
            }
            this.data.datasets.push({
              label: prefecture.prefName,
              data: populationValue,
            })
          }
        }
        this.datacollection = decycle(this.data)
      },
      async getPrefectures() {
        const prefectures = await dataService.getPregectures()
        this.prefectures = prefectures.data.result
      },
    }
  }
</script>

<style>
h1{
  text-align: center;
}
.prefecture-con{
  display:flex;
  flex-wrap: wrap;
}
.prefecture{
  width:calc(100% / 8);
}
.line-chart{
  width:50%;
  margin:0 auto;
}
</style>