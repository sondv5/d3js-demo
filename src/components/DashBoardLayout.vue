<template>
  <div class="w-[100%] bg-stone-300">
    <div class="flex flex-wrap justify-center">
      <div v-for="(chart, i) in charts" :key="i" class="bg-white mx-2 my-3">
        <div ref="chartHolder" class="w-[250px] h-[200px]">

        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import {
  Chart, BarChart, PointChart, HorizontalBarChart, LineChart, EmptyChart, StackAreaChart
} from '@/scripts/ChartHelper';

@Options({
  name: 'DashBoardLayout'
})
export default class DashBoardLayout extends Vue {
  charts: Chart[] = [];
  mounted() {
    this.$nextTick(() => {
      this.charts.forEach((chart, i) => {
        chart.create((this.$refs.chartHolder as any)[i])
      })
      setInterval(() => {
        this.charts.forEach((chart, i) => {
          chart.refresh();
        })
      }, Chart.RANDOM_TIME)
    })
    for (let i = 0; i < 15; i++) {
      switch (i) {
        case 0:
          this.charts.push(new BarChart())
          break;
        case 1:
          this.charts.push(new PointChart())
          break;
        case 2:
          this.charts.push(new HorizontalBarChart())
          break;
        case 3:
          this.charts.push(new LineChart())
          break;
        case 4:
          this.charts.push(new StackAreaChart())
          break;
        default:
          this.charts.push(new EmptyChart())
          break;
      }
    }
  }
}
</script>

<style scoped>
</style>
