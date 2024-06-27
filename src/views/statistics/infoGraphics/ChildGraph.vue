<template>
  <VCard class="border">
    <h3 class="text-center mt-1">{{ titleDistricts }} filiallari bo'yicha KPI ko'rsatkichlari (foizda)</h3>
    <div v-show="!dataSet.length" class="text-center">
      Ma'lumot yo'q
    </div>
    <div id="chart" style="block-size: 330px" class="mx-auto" />
    <div class="text-center">
      <VDialog v-model="dialog" transition="dialog-bottom-transition">
        <VCard>
          <VToolbar>
            <VToolbarTitle v-if="tab == 0"> Oylik KPI ko'rsatkichlari (foizda) </VToolbarTitle>
            <VToolbarTitle v-if="tab == 1"> {{ currentPeriod }} davridagi KPI ma'lumotlari </VToolbarTitle>
            <VSpacer />
            <VToolbarItems>
              <VBtn icon @click="close">
                <VIcon>ri-close-large-line</VIcon>
              </VBtn>
            </VToolbarItems>
          </VToolbar>
          <VTabs v-model="tab" class="d-flex w-full justify-center align-center">
            <VTab>Dinamika</VTab>
            <VTab v-if="kpiByBranchesDetails.length > 0"> Batafsil</VTab>
          </VTabs>
          <VWindow v-model="tab" class="fixed-height">
            <VWindowItem>
              <div id="branch-annual-chart" style="block-size: 400px" />
            </VWindowItem>
            <VWindowItem>

              <VDataTable :items-per-page="-1" :items="items" :headers="headers" dense>
                <template #item="{ item, index }">
                  <tr :class="{ 'bg-secondary': item.category === 'Jami' }">
                    <td v-if="item.category !== 'Jami'">{{ index + 1 }}</td>
                    <td v-else></td>
                    <td>{{ item.category || '' }}</td>
                    <td>{{ item.indicator || '' }}</td>
                    <td>{{ item.branch_kpi != null ? Math.round(item.branch_kpi * 100) : '' }}</td>
                    <td>{{ formatNumberWithSpaces(item.plan) }}</td>
                    <td>{{ formatNumberWithSpaces(item.fact) }}</td>
                    <td>{{ item.done_percent != null ? Math.round(item.done_percent * 100) + '%' : '' }}</td>
                    <td>{{ item.weight != null ? Math.round(item.weight * 100) + '%' : '' }}</td>
                    <td>{{ item.kpi_percent != null ? Math.round(item.kpi_percent * 100) + '%' : '' }}</td>
                  </tr>
                </template>
                <template #bottom></template>
              </VDataTable>
            </VWindowItem>
          </VWindow>
        </VCard>
      </VDialog>
    </div>
  </VCard>
</template>

<script setup>
import { useKpiStore } from '@/store/kpi';
import * as echarts from 'echarts';
import { storeToRefs } from 'pinia';
import { computed, nextTick, onMounted, ref, watch } from 'vue';

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

const items = computed(() => {
  const obj = {
    region_id: 5,
    source: null,
    kpi: null,
    id: null,
    plan: null,
    branch_kpi: null,
    branch_id: null,
    fact: null,
    average_kpi: null,
    user_type: null,
    done_percent: null,
    period: null,
    category: 'Jami',
    weight: null,
    some: null,
    created_at: null,
    indicator: null,
    kpi_percent: kpiByBranchesDetails.value[0].average_kpi,
    calculation: null,
    min_percent: null,
    max_percent: null,
  }
  kpiByBranchesDetails.value.push(obj)
  return kpiByBranchesDetails.value
})

function formatNumberWithSpaces(number) {
  if (number == null) return ""
  const [integerPart, decimalPart] = number.toFixed(2).toString().split('.')
  const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
  if (!decimalPart) return formattedIntegerPart
  const formattedDecimalPart = decimalPart.replace(/(\d{3})(?=\d)/g, '$1 ')

  return `${formattedIntegerPart}.${formattedDecimalPart}`
}

const close = () => {
  dialog.value = false
  tab.value = 0
}

const dialog = ref(false)
const tab = ref(0)
const selectedBarId = ref(null)
let myChart
let annualChart
const currentPeriod = ref(null)

const sumKpiPercent = computed(() => {
  return Math.round(kpiByBranchesDetails.value[0].average_kpi * 100)
})

const headers = [
  { title: '№', value: 'id' },
  { title: "Ko'rsatkich turi" },
  { title: "KPI - asosiy ko'rsatkichlar(bank uchun muhim va yuqori ahamiyatga ega)", value: 'indicator' },
  { title: 'Filial KPI (%)', value: 'branch_kpi' },
  { title: 'Reja', value: 'plan', width: 150 },
  { title: 'Fakt', value: 'fact', width: 150 },
  { title: 'Reja bajarilishi', value: 'done_percent' },
  { title: "Ko'rsatkich ulushi" },
  { title: 'Samaradorlik bajarilishi', value: 'kpi_percent' },
  // { title: 'Umumiy KPI natijasi', value: 'avg_kpi' },
]

const handleChartClick = async params => {
  try {
    selectedBarId.value = params.data.id
    if (selectedBarId.value) {
      const chartData = await kpiStore.getChildGraphAnnualData({
        user_type: kpiStore.currentUserType,
        branch_id: selectedBarId.value,
      })

      if (chartData) {
        currentPeriod.value = chartData[0].period
        await kpiStore.fetchKpiByBranchesDetails({
          user_type: kpiStore.currentUserType,
          period: chartData[0].period,
          branch_id: selectedBarId.value,
        })
        if (kpiByBranchesDetails.value.length > 0) {
          sumKpiPercent.value = 0
          for (let i = 0; i < kpiByBranchesDetails.value.length; i++) {
            sumKpiPercent.value == kpiByBranchesDetails.value[0].average_kpi
          }
        }
        dialog.value = true
        nextTick(() => {
          initializeAnnualChart(chartData)
        })
      }
    }
  } catch (error) {
    return error
  }
}

const initializeChart = () => {
  const chartDom = document.getElementById('chart')
  if (chartDom) {
    myChart = echarts.init(chartDom)
    updateChart(myChart, props.dataSet)
    myChart.on('click', handleChartClick)
  }
}

const initializeAnnualChart = data => {
  const chartDom = document.getElementById('branch-annual-chart')
  if (chartDom) {
    annualChart = echarts.init(chartDom)
    const months = [
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
    ]
    const filledData = months.map((month, index) => {
      const monthData = data.find(d => new Date(d.period).getMonth() === index)

      return monthData
        ? { period: month, originalPeriod: monthData.period, average_kpi: monthData.average_kpi }
        : { period: month, originalPeriod: null, average_kpi: 0 }
    })


    const kpiValues = filledData.map(item => item.average_kpi)
    const minKPI = Math.min(...kpiValues)
    const maxKPI = Math.max(...kpiValues)

    const getColor = value => {
      if (minKPI == maxKPI) {
        return 'rgb(0, 255, 0)'
      }
      const normalizedValue = (value - minKPI) / (maxKPI - minKPI)
      const green = Math.round(normalizedValue * 255)
      const red = 255 - green

      return `rgb(${red}, ${green}, 0)`
    }

    const option = {
      xAxis: {
        type: 'category',
        axisLabel: {
          fontSize: 14,
          fontWeight: 'bold',
        },
        data: filledData.map(item => item.period),
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: filledData.map(item => ({
            value: item.average_kpi,

            itemStyle: {
              color: getColor(item.average_kpi),
            },
            originalPeriod: item.originalPeriod,
          })),
          type: 'bar',
          smooth: true,
          label: {
            show: true,
            position: 'top',
            formatter: '{c}%',
            fontSize: 14,
          },
        },
      ],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
    }
    annualChart.setOption(option)
    annualChart.resize()
    annualChart.on('click', function (params) {
      const originalPeriod = params.data.originalPeriod
      if (originalPeriod) {
        currentPeriod.value = originalPeriod
        getTableData(originalPeriod)
      }
    })
  }
}

const updateChart = (chartInstance, data) => {
  if (!chartInstance) return
  const scores = data.map(item => item.score).sort((a, b) => a - b)
  const minScore = scores[0]
  const maxScore = scores[scores.length - 1]

  const getColor = score => {
    if (minScore === maxScore) {
      return 'rgb(0, 255, 0)'
    }
    const ratio = (score - minScore) / (maxScore - minScore)
    const green = Math.round((1 - ratio) * 255)
    const red = Math.round(ratio * 255)

    return `rgb(${green}, ${red}, 0)`
  }

  const option = {
    dataset: [
      {
        dimensions: ['name', 'score', 'id'],
        source: data,
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
      axisLabel: {
        interval: 0,
        fontSize: 14,
        rotate: 30,
      },
    },
    yAxis: {},
    series: {
      type: 'bar',
      encode: { x: 'name', y: 'score' },
      datasetIndex: 1,
      label: {
        show: true,
        fontSize: 14,
        position: 'top',
        formatter(value) {
          return `${value.value.score}%`
        },
      },
      itemStyle: {
        color: function (params) {
          const score = params.data.score

          return getColor(score)
        },
      },
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
  }

  chartInstance.setOption(option)
}

const getTableData = async period => {
  try {
    const data = await kpiStore.fetchKpiByBranchesDetails({
      user_type: kpiStore.currentUserType,
      period: period,
      branch_id: selectedBarId.value,
    })

    if (data && data.length > 0) {
      tab.value = 1
    }
  } catch (error) {
    return error
  }
}

onMounted(() => {
  nextTick(() => {
    initializeChart()
  })
})

watch(
  () => props.dataSet,
  () => {
    updateChart(myChart, props.dataSet)
  },
)
</script>

<style scoped>
.fixed-height {
  block-size: 600px;
}

.sum-row {
  background-color: #f0f0f0;
  font-size: 1.1em;
}

.text-right {
  text-align: end;
}

.font-weight-bold {
  font-weight: bold;
}
</style>
