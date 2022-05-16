<template>
  <div class="small">
    <h1>都道府県人口比較グラフ</h1>
    <div class="prefecture-con">
      <div
        class="prefecture"
        v-for="prefecture in prefectures"
        :key="prefecture.prefCode"
      >
        <input
          type="checkbox"
          v-model="prefecture.select"
          @change="selectPrefecture()"
        />
        <label>{{ prefecture.prefName }}</label>
      </div>
    </div>
    <button class="resetButton" @click="chartReset">リセット</button>
    <line-chart
      class="line-chart"
      :chart-data="datacollection"
      :options="options"
    ></line-chart>
  </div>
</template>

<script>
import LineChart from "./LineChart.js";
import dataService from "../api/data";
const { decycle } = require("json-cyclic");

export default {
  name: "BasePage",
  components: {
    LineChart,
  },
  data() {
    return {
      datacollection: null,
      data: {
        labels: [
          1960, 1965, 1970, 1975, 1980, 1985, 1990, 1995, 2000, 2005, 2010,
          2015, 2020, 2025, 2030, 2035, 2040, 2045,
        ],
        datasets: [],
      },
      prefectures: [],
      options: {
        scales: {
          xAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: "年度",
              },
            },
          ],
          yAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: "人口",
              },
            },
          ],
        },
      },
    };
  },
  mounted() {
    this.getPrefectures();
    this.selectPrefecture();
  },
  methods: {
    /** チェックのついた都道府県の人口を取得し、チャート用にデータを形成 */
    async selectPrefecture() {
      this.data.datasets = [];
      for (let prefecture of this.prefectures) {
        if (prefecture.select) {
          let populations = await dataService.getPopulation(
            prefecture.prefCode
          );
          let populationValue = [];
          for (let population of populations.data.result.data[0].data) {
            populationValue.push(population.value);
          }
          this.data.datasets.push({
            label: prefecture.prefName,
            data: populationValue,
          });
        }
      }
      this.datacollection = decycle(this.data);
    },
    /** 当道府県のデータを取得しリスト表示 */
    async getPrefectures() {
      const prefectures = await dataService.getPregectures();
      this.prefectures = prefectures.data.result;
    },
    chartReset() {
      this.data.datasets = [];
      for (let prefecture of this.prefectures) {
        prefecture.select = false;
      }
      this.datacollection = this.data;
    },
  },
};
</script>

<style>
h1 {
  text-align: center;
  margin: 0;
  padding: 20px 0;
  margin-bottom: 20px;
  background-color: #c4c4c4;
}
.prefecture-con {
  display: flex;
  flex-wrap: wrap;
  width: 90%;
  margin: 0 auto;
}
.prefecture {
  width: calc(100% / 8 - 20px);
  margin: 0 10px;
  text-align: left;
}
.line-chart {
  width: 50%;
  margin: 0 auto;
}
.resetButton {
  width: 240px;
  border: none;
  color: #fff;
  background-color: #31475b;
  border-radius: 20px;
  padding: 10px 0;
  margin: 10px 0;
  cursor: pointer;
}
@media screen and (max-width: 1080px) {
  .prefecture {
    width: calc(100% / 6 - 20px);
    margin: 0 10px;
  }
  .line-chart {
    width: 70%;
    margin: 0 auto;
  }
}
@media screen and (max-width: 840px) {
  .prefecture-con {
    width: 100%;
  }
  .prefecture {
    width: calc(100% / 4);
    margin: 0;
  }
  .line-chart {
    width: 90%;
    margin: 0 auto;
  }
}
</style>
