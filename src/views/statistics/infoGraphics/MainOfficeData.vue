<template>
  <v-card class="border">
    <template #title>
      Bosh ofis bo'yicha KPI ko'rsatkichlari boshqaruvchilar KPI ko'rsatkichlar (foizda)
    </template>
    <div id="main" style="block-size: 1050px;" class="mx-auto"></div>
  </v-card>
</template>

<script setup>
import * as echarts from 'echarts';
import { onMounted, watch } from 'vue';

const props = defineProps({
  datasetSource: {
    type: Array,
    default: () => []
  }
});

const initializeChart = () => {
  var chartDom = document.getElementById('main');
  var myChart = echarts.init(chartDom);

  const datasetSource = [
    { name: 'Region A', score: 85, id: 1 },
    { name: 'Region B', score: 72, id: 2 },
    { name: 'Region C', score: 91, id: 3 },
    { name: 'Region D', score: 68, id: 4 },
    { name: 'Region E', score: 79, id: 5 },
    { name: 'Region F', score: 83, id: 6 },
    { name: 'Region G', score: 67, id: 7 },
    { name: 'Region H', score: 89, id: 8 },
    { name: 'Region I', score: 75, id: 9 },
    { name: 'Region J', score: 78, id: 10 },
    { name: 'Region K', score: 88, id: 11 },
    { name: 'Region L', score: 82, id: 12 },
    { name: 'Region M', score: 73, id: 13 },
    { name: 'Region N', score: 90, id: 14 },
    { name: 'Region O', score: 77, id: 15 },
    { name: 'Region P', score: 81, id: 16 },
    { name: 'Region Q', score: 87, id: 17 },
    { name: 'Region R', score: 74, id: 18 },
    { name: 'Region S', score: 86, id: 19 },
    { name: 'Region T', score: 76, id: 20 },
    { name: 'Region U', score: 80, id: 21 },
    { name: 'Region V', score: 71, id: 22 },
    { name: 'Region W', score: 84, id: 23 },
    { name: 'Region X', score: 92, id: 24 },
    { name: 'Region Y', score: 69, id: 25 },
    { name: 'Region Z', score: 93, id: 26 },
    { name: 'Region AA', score: 94, id: 27 },
    { name: 'Region AB', score: 95, id: 28 },
    { name: 'Region AC', score: 96, id: 29 },
    { name: 'Region AD', score: 97, id: 30 },
  ];

  const scores = datasetSource.map(item => item.score).sort((a, b) => a - b);
  const minScore = scores[0];
  const maxScore = scores[scores.length - 1];

  const getColor = (score) => {
    const ratio = (score - minScore) / (maxScore - minScore);
    const green = Math.round((1 - ratio) * 255);
    const red = Math.round(ratio * 255);
    return `rgb(${green}, ${red}, 0)`;
  };

  var option = {
    dataset: [
      {
        dimensions: ['name', 'score', 'id'],
        source: datasetSource
      },
      {
        transform: {
          type: 'sort',
          config: { dimension: 'score', order: 'desc' }
        }
      }
    ],
    yAxis: {
      type: 'category',
      axisLabel: { interval: 0 }
    },
    xAxis: {
      type: 'value'
    },
    series: {
      type: 'bar',
      encode: { y: 'name', x: 'score' },
      datasetIndex: 1,
      itemStyle: {
        color: function (params) {
          const score = params.value[1];
          return getColor(score);
        }
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    legend: {
      data: ['Data']
    }
  };

  myChart.setOption(option);

  myChart.on('click', function (params) {
    const id = params.value[2];
    console.log('Clicked item ID:', id);
  });
};

watch(() => props.datasetSource, (newSource) => {
  if (newSource.length > 0) {
    initializeChart(); // Re-initialize chart when data changes
  }
});

onMounted(() => {
  initializeChart();
});
</script>
