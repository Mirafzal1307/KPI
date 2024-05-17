<template>
  <div>
    <VCard class="border d-flex justify-center align-center">
      <div
        ref="chart"
        :style="{ width: '100%', height: '400px' }"
      ></div>
    </VCard>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import * as echarts from 'echarts'

const chart = ref(null)

onMounted(() => {
  const myChart = echarts.init(chart.value)
  const option = {
    series: [
      {
        type: 'gauge',
        startAngle: 180,
        endAngle: 0,
        center: ['50%', '75%'],
        radius: '90%',
        min: 0,
        max: 1,
        splitNumber: 8,
        axisLine: {
          lineStyle: {
            width: 6,
            color: [
              [0.30, '#FF0000'],
              [0.50, '#FF7F50'],
              [0.63, '#FFD700'],
              [0.75, '#ADFF2F'],
              [1, '#008000'],
            ],
          },
        },
        pointer: {
          icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
          length: '12%',
          width: 20,
          offsetCenter: [0, '-60%'],
          itemStyle: {
            color: 'auto',
          },
        },
        axisTick: {
          length: 12,
          lineStyle: {
            color: 'auto',
            width: 2,
          },
        },
        splitLine: {
          length: 20,
          lineStyle: {
            color: 'auto',
            width: 5,
          },
        },
        axisLabel: {
          color: '#464646',
          fontSize: 20,
          distance: -60,
          rotate: 'tangential',
          formatter: function (value) {
            if (value === 0.875) {
              return 'A\'lo'
            } else if (value === 0.625) {
              return 'Yaxshi'
            } else if (value === 0.375) {
              return 'Qoniqarli'
            } else if (value === 0.125) {
              return ' Yomon'
            }
            return ''
          },
        },
        title: {
          offsetCenter: [0, '-10%'],
          fontSize: 20,
        },
        detail: {
          fontSize: 30,
          offsetCenter: [0, '-35%'],
          valueAnimation: true,
          formatter: function (value) {
            return Math.round(value * 120) + ''
          },
          color: 'inherit',
        },
        data: [
          {
            value: 0.82,
            name: 'KPI natijasi',
          },
        ],
      },
    ],
  }
  myChart.setOption(option)
})
</script>
