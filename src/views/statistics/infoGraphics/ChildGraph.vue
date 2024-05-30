<template>

  <VCard class="border">
    <template #title>
      {{ props.titleDistricts }} filiallari bo'yicha KPI ko'rsatkichlari (foizda)
    </template>
    <div id="chart" style="block-size: 310px; " class="mx-auto"></div>
  </VCard>


</template>

<script setup>
import * as echarts from 'echarts';
import { onMounted } from 'vue';




const props = defineProps({
  titleDistricts: {
    type: [
      String,
    ]
  },
  dataSet: {
    type: Array,
    default: () => []

  }
})
onMounted(() => {

  var chartDom = document.getElementById('chart');
  var myChart = echarts.init(chartDom);
  var option;

  option = {
    dataset: [
      {
        dimensions: ['name', 'age', 'profession', 'score', 'date'],
        source: props.dataSet
      },
      {
        transform: {
          type: 'sort',
          config: { dimension: 'score', order: 'desc' }
        }
      }
    ],
    xAxis: {
      type: 'category',
      axisLabel: { interval: 0, rotate: 30 }
    },
    yAxis: {},
    series: {
      type: 'bar',
      encode: { x: 'name', y: 'score' },
      datasetIndex: 1
    }
  };

  option && myChart.setOption(option);

});
</script>
