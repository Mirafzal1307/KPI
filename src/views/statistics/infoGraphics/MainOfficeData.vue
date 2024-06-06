<template>
  <VCard class="border">
    <VRow class="px-4">
      <VCol cols="12" md="5">
        <VSelect v-model="dataParams.type" item-title="name" item-value="value"
          :items="[{ name: 'Rahbariyat', value: 1 }, { name: 'Tarkibiy bo`linma', value: 2 }]"
          @update:model-value="getStatistics" />
      </VCol>
      <VCol cols="12" md="2" />
      <VCol cols="12" md="5">
        <VSelect v-model="dataParams.period" :items="periodList" label="Davr bo'yicha" item-title="period"
          item-value="period" @update:model-value="getStatistics" />
      </VCol>
    </VRow>
    <VCardItem class="text-right text-h5">
      <span class="font-weight-bold"> O'rtacha KPI natijasi: </span> <span :class="colorify(statistics.all_kpi)"> {{
        statistics.average_kpi }} </span>
    </VCardItem>
    <template #title>
      Bosh ofis bo'yicha KPI ko'rsatkichlari boshqaruvchilar KPI ko'rsatkichlar (foizda)
    </template>
    <VSheet v-show="dataParams.type === 1" id="main" height="300" />
    <VSheet v-show="dataParams.type === 2" id="second" height="1000" />
  </VCard>
</template>

<script setup>
import * as echarts from 'echarts';
import { onMounted, watch } from 'vue';

import { fetchPeriodList, fetchStatistics } from '@/services/main.office.service';

const datasetSourceItem = ref([])

const initializeChart = () => {
  const chartDom = dataParams.value.type === 1 ? document.getElementById('main') : document.getElementById('second')
  const myChart = echarts.init(chartDom)
  const datasetSource = datasetSourceItem.value

  if (!datasetSource.length) return
  const scores = datasetSource.map(item => item.kpi)
  const minScore = Math.min(...scores)
  const maxScore = Math.max(...scores)

  const getColor = score => {
    console.log(score)
    const ratio = (score - minScore) / (maxScore - minScore)
    const green = Math.round((1 - ratio) * 255)
    const red = Math.round(ratio * 255)
    return `rgb(${green}, ${red}, 0)`
  }

  const option = {
    dataset: [
      {
        dimensions: ['name', 'kpi', 'id'],
        source: datasetSource,
      },
      {
        transform: {
          type: 'sort',
          config: { dimension: 'kpi', order: 'asc' },
        },
      },
    ],
    yAxis: {
      type: 'category',
      axisLabel: { interval: 0 },
    },
    xAxis: {
      type: 'value',
      max: 100,
    },
    series: {
      label: {
        show: true,
        fontSize: 14,
        position: 'right',
        formatter(value) {
          return `${value.value.kpi} %`
        },
      },
      type: 'bar',
      encode: { y: 'name', x: 'kpi' },
      datasetIndex: 1,
      itemStyle: {
        color: function (params) {
          const score = params.value.kpi
          return getColor(score)
        },
      },
    },
    tooltip: {
      show: true,
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    legend: {
      data: ['Data'],
    },
  }

  myChart.setOption(option)

  myChart.on('click', function (params) {
    const id = params.value[2]
    console.log('Clicked item ID:', id)
  })
}

watch(datasetSourceItem, () => {
  initializeChart()
})

const dataParams = ref({
  period: null,
  type: 1,
})

const periodList = ref([])
async function getPeriodList() {
  periodList.value = await fetchPeriodList()
  dataParams.value.period = periodList.value[0]?.period
  await getStatistics()
}

const statistics = ref({
  average_kpi: null,
  all_kpi: [],
})

async function getStatistics() {
  if (!dataParams.value.period) return
  const result = await fetchStatistics(dataParams)
  if (result) {
    statistics.value.all_kpi = result.all_kpi
    statistics.value.average_kpi = result.average_kpi
    datasetSourceItem.value = statistics.value.all_kpi.map(item => ({
      name: item.name,
      kpi: item.Kpi_by_department.kpi,
      id: item.Kpi_by_department.id,
    }))
  }
}

onMounted(() => {
  getPeriodList()
})

function colorify(kpiResult) {
  if (kpiResult > 85) return 'font-weight-bold text-success'
  console.log(kpiResult)

  return 'font-weight-bold text-error'
}
</script>
