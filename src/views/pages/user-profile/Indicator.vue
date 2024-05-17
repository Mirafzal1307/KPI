

<template>
  <div>
    <VCard class="border d-flex pa-8 justify-content-between ga-3">
      <div class="w-50 my-auto pr-2">
        <div class="d-flex justify-content-between mb-10">
          <img
            width="150px"
            height="150px"
            src="../../../assets/images/avatars/userImg.png"
            alt="img"
          />
          <div class="d-flex flex-column ga-4">
            <h2>Oromjonov Shaxriyor Oromjon o'g'li</h2>
            <h2>Bosh mutaxasis</h2>
          </div>
        </div>

        <VSelect
          class="w-100 mt-16"
          clearable
          label="Davrni tanlang"
          :items="['2024-03-30', '2025-03-30', '2026-03-30', '2027-03-30', '2028-03-30', '2029-03-30', '2030-03-30']"
          variant="outlined"
        
          ></VSelect>
      </div>
      <div class="w-50 d-flex flex-column  justify-center pl-10 ">
        <div
          ref="chart"
          class="d-flex justify-center align-center"
          :style="{ width:'450px',  height: '380px'  }"
        ></div>
        <h4 class="text-h4" >Filial KPI natijasi: <span style="color: red;">0%</span></h4>
        <h4 class="text-h5" >Jami individual KPI filial natijasidan keyin: <span style="color: red;">0 %</span></h4>
      </div>
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
              [0.3, '#FF0000'],
              [0.5, '#FF7F50'],
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
              return "A'lo"
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
