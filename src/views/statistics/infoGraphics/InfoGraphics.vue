<template>

  <VCard class="border">
    <template #title>
      Hududlar bo'yicha boshqaruvchilar KPI ko'rsatkichlar (foizda)
    </template>
    <div id="main" style="block-size: 330px; " class="mx-auto"></div>
  </VCard>

</template>

<script setup>
import * as echarts from 'echarts';
import { onMounted } from 'vue';


const props = defineProps({
  datasetSource: {
    type: [
      Array
    ]
  }
})
onMounted(() => {
  var chartDom = document.getElementById('main');

  var myChart = echarts.init(chartDom);

  const scores = props.datasetSource.map(item => item[1]).sort((a, b) => a - b);

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
        source: props.datasetSource
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
        color: function (params) {
          const score = params.value[1];
          return getColor(score);
        }
      }
    }
  };

  myChart.setOption(option);

  myChart.on('click', function (params) {
    const id = params.value[2];
    console.log('Clicked item ID:', id);
  });
});
</script>
