<template>
  <VCard class="border">
    <template #title>
      {{ titleDistricts }} filiallari bo'yicha KPI ko'rsatkichlari (foizda)
    </template>
    <div
      v-show="!dataSet.length"
      class="text-center"
    >
      Ma'lumot yo'q
    </div>
    <div
      id="chart"
      style="block-size: 310px;"
      class="mx-auto"
    />
    <div class="text-center pa-4">
      <VDialog
        v-model="dialog"
        transition="dialog-bottom-transition"
      >
        <VCard>
          <VToolbar>
            <VToolbarTitle>KPI ko'rsatkichlari (foizda) </VToolbarTitle>
            <VSpacer />
            <VToolbarItems>
              <VBtn
                icon
                @click="dialog = false"
              >
                <VIcon>ri-close-line</VIcon>
              </VBtn>
            </VToolbarItems>
          </VToolbar>
          <VDataTable
            :items-per-page="-1"
            :items="kpiByBranchesDetails"
            :headers="headers"
            dense
          >
            <template #item="{ item }">
              <tr>
                <td>{{ item.id }}</td>
                <td>{{ item.category }}</td>
                <td>{{ item.indicator }}</td>
                <td>{{ formatAndMultiply(item.branch_kpi) }}</td>
                <td>{{ item.plan }}</td>
                <td>{{ (item.fact) }}</td>
                <td>{{ item.done_percent }}</td>
                <td>{{ formatAndMultiply(item.weight) }}</td>
                <td>{{ formatAndMultiply(item.kpi_percent) }}</td>
                <td>{{ formatAndMultiply(item.min_percent) }}</td>
                <td>{{ formatAndMultiply(item.max_percent) }}</td>
              </tr>
            </template>
            <template #bottom />
          </VDataTable>
        </VCard>
      </VDialog>
    </div>
  </VCard>
</template>

<script setup>
import { useKpiStore } from '@/store/kpi'
import * as echarts from 'echarts'
import { storeToRefs } from 'pinia'
import { onMounted, ref, watch } from 'vue'

const props = defineProps({
  titleDistricts: {
    type: String,
    required: true,
  },
  dataSet: {
    type: Array,
    default: () => [],
  },
})

const kpiStore = useKpiStore()

const { kpiByBranchesDetails } = storeToRefs(kpiStore)
function formatAndMultiply(number) {


  const formattedNum = Math.floor(number * 100) / 100

  return formattedNum * 100
}


const dialog = ref(false)
const selectedBarId = ref(null)

let myChart

const formatNumber = value => {
  return parseFloat(value) * 100
}

const headers = [
  { title: 'ID', value: 'id' },
  { title: 'Ko\'rsatkich turi' },
  { title: 'KPI - asosiy ko\'rsatkichlar(bank uchun muhim va yuqori ahamiyatga ega)', value: 'indicator' },
  { title: 'Filial KPI', value: 'branch_kpi' },
  { title: 'Reja', value: 'plan' },
  { title: 'Fakt', value: 'fact' },
  { title: 'Reja bajarilishi', value: 'done_percent' },
  { title: 'Ko\'rsatkich ulushi' },
  { title: 'Samaradorlik bajarilishi', value: 'kpi_percent' },
  { title: 'Minimum', value: 'min_percent' },
  { title: 'Maksimum', value: 'max_percent' },
]

const handleChartClick = async params => {
  try {
    selectedBarId.value = params.data.id
    if (selectedBarId.value) {
      const data = await kpiStore.fetchKpiByBranchesDetails({ user_type: kpiStore.currentUserType, period: kpiStore.currentPeriod, branch_id: selectedBarId.value })

      if (data) {
        dialog.value = true
      }
    }
  } catch (error) {
    console.error(error)
  }
}

const initializeChart = () => {
  const chartDom = document.getElementById('chart')

  myChart = echarts.init(chartDom)
  updateChart()

  myChart.on('click', handleChartClick) // Set up the click event listener
}

const updateChart = () => {
  if (!myChart) return

  const option = {
    dataset: [
      {
        dimensions: ['name', 'score', 'id'],
        source: props.dataSet,
      },
      {
        transform: {
          type: 'sort',
          config: { dimension: 'score', order: 'desc' },
        },
      },
    ],
    xAxis: {
      type: 'category',
      axisLabel: { interval: 0, rotate: 30 },
    },
    yAxis: {},
    series: {
      type: 'bar',
      encode: { x: 'name', y: 'score' },
      datasetIndex: 1,
      label: {
        show: true,
        fontSize: 10,
        position: 'top',
        formatter(value) {
          return `${value.value.score} %`
        },
      },
      itemStyle: {
        color: 'blue',
      },
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
  }

  myChart.setOption(option)
}

onMounted(() => {
  initializeChart()
})

watch(() => props.dataSet, () => {
  updateChart()
})
</script>
