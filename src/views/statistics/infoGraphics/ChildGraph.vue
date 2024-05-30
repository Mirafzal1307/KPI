<template>
  <VCard class="border">
    <template #title>
      {{ titleDistricts }} filiallari bo'yicha KPI ko'rsatkichlari (foizda)
    </template>
    <div id="chart" style="block-size: 310px;" class="mx-auto"></div>
  </VCard>
</template>

<script setup>
import * as echarts from 'echarts';
import { onMounted, watch } from 'vue';

const props = defineProps({
  titleDistricts: {
    type: String,
    required: true
  },
  dataSet: {
    type: Array,
    default: () => []
  }
});

let myChart;

const initializeChart = () => {
  const chartDom = document.getElementById('chart');
  myChart = echarts.init(chartDom);
  updateChart();
};

const updateChart = () => {
  if (!myChart) return;

  const option = {
    dataset: [
      {
        dimensions: ['name', 'score', 'id'],
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
      datasetIndex: 1,
      itemStyle: {
        color: 'blue'
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    }
  };

  myChart.setOption(option);
};

onMounted(() => {
  initializeChart();
});

watch(() => props.dataSet, () => {
  updateChart();
});
</script>
