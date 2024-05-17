<template>
  <div>
    <VCard class="border d-flex justify-center align-center">
      <div
        ref="chart"
        class="d-flex justify-center align-center"
        :style="{ width: '100%', height: '380px' }"
      ></div>
    </VCard>
  </div>
</template>

<script setup>
import * as echarts from 'echarts'

const chart = ref(null)

onMounted(() => {
  const myChart = echarts.init(chart.value)
  const option = {
    tooltip: {
      trigger: 'axis',
    },
    xAxis: {
      type: 'category',
      data: [
        'Yanvar',
        'Fevral',
        'Mart',
        'Aprel',
        'May',
        'Iyun',
        'Iyul',
        'Avgust',
        'Sentabr',
        'Oktabr',
        'Noyabr',
        'Dekabr',
      ],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [70, 88, 120, 80, 90, 95, 100, 70, 69, 130, 140, 150],
        type: 'line',
      },
    ],
  }
  myChart.setOption(option)
})
</script>
