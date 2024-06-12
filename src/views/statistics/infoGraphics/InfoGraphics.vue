<template>
  <VCard class="border px-4 py-2">
    <VRow justify="center" class="d-flex justify-center px-2">
      <VRow justify="center" class="d-flex justify-center px-2">
        <VCol cols="12 d-flex justify-center">
          <VCol cols="2 d-flex justify-center">
            <VBtn :color="kpiStore.currentUserType === 1 ? 'primary' : ''" color="secondary" :dark="true"
              :class="{ 'primary': kpiStore.currentUserType === 1 }" class="text-caption border"
              :style="{ boxShadow: kpiStore.currentUserType === 1 ? '0px 4px 4px rgba(0, 0, 0, 0.25)' : '' }"
              @click="kpiStore.currentUserType = 1">
              Boshqaruvchi
            </VBtn>
          </VCol>
          <VCol cols="2 d-flex justify-center">
            <VBtn :style="{ boxShadow: kpiStore.currentUserType === 2 ? '0px 4px 4px rgba(0, 0, 0, 0.25)' : '' }"
              :color="kpiStore.currentUserType === 2 ? 'primary' : ''" class="text-caption border"
              @click="kpiStore.currentUserType = 2">
              Bosh buxgalter
            </VBtn>
          </VCol>
          <VCol class="d-flex justify-center" cols="3">
            <VBtn :style="{ boxShadow: kpiStore.currentUserType === 3 ? '0px 4px 4px rgba(0, 0, 0, 0.25)' : '' }"
              :color="kpiStore.currentUserType === 3 ? 'primary' : ''" class="text-caption border"
              @click="kpiStore.currentUserType = 3">
              Davlat dasturlari blok
            </VBtn>
          </VCol>
          <VCol cols="3 d-flex justify-center">
            <VBtn :style="{ boxShadow: kpiStore.currentUserType === 4 ? '0px 4px 4px rgba(0, 0, 0, 0.25)' : '' }"
              :color="kpiStore.currentUserType === 4 ? 'primary' : ''" class="text-caption border"
              @click="kpiStore.currentUserType = 4">
              Biznes va operatsion blok
            </VBtn>
          </VCol>
          <VCol cols="2 d-flex justify-center">
            <VBtn :style="{ boxShadow: kpiStore.currentUserType === 5 ? '0px 4px 4px rgba(0, 0, 0, 0.25)' : '' }"
              :color="kpiStore.currentUserType === 5 ? 'primary' : ''" class="text-caption border"
              @click="kpiStore.currentUserType = 5">
              Kredit blok
            </VBtn>
          </VCol>
        </VCol>
      </VRow>
    </VRow>
  </VCard>
  <VCard class="border">

    <h2 class="text-center mt-1"> Hududlar bo'yicha boshqaruvchilar KPI ko'rsatkichlar (foizda)
    </h2>

    <div v-show="!datasetSource.length" class="text-center">
      Ma'lumot yo'q
    </div>
    <div id="main" style="block-size: 330px;" class="mx-auto " />
  </VCard>
</template>

<script setup>
import { useKpiStore } from '@/store/kpi';
import * as echarts from 'echarts';
import { onMounted, ref, watch } from 'vue';


const props = defineProps({
  datasetSource: {
    type: Array,
    default: () => [],
  },
})

const loading = ref(false)
const filterItems = ref([{ title: 'Boshqaruvchi', value: 1 }, { title: 'Bosh buxgalter', value: 2 }, { title: 'Davlat dasturlari blok', value: 3 }, { title: 'Biznes va operatsion blok', value: 4 }, { title: 'Kredit blok', value: 5 }])

const kpiStore = useKpiStore()
const user_type = ref(1)

const items = ref([
  { text: 'Boshqaruvchi', value: 1 },
  { text: 'Bosh buxgalter', value: 2 },
  { text: 'Davlat dasturlari blok', value: 3 },
  { text: 'Biznes va operatsion blok', value: 4 },
  { text: 'Kredit blok', value: 5 },
])

const getChangedData = async () => {
  try {
    kpiStore.currentUserType = user_type.value
    await kpiStore.fetchKpiByRegion({ user_type: user_type.value, period: kpiStore.currentPeriod })
    initializeChart()
  } catch (error) {
    console.error(error)
  }
}

const initializeChart = () => {
  var chartDom = document.getElementById('main')
  var myChart = echarts.init(chartDom)

  const scores = props.datasetSource.map(item => item[1]).sort((a, b) => a - b)
  const minScore = scores[0]
  const maxScore = scores[scores.length - 1]

  const getColor = score => {
    const ratio = (score - minScore) / (maxScore - minScore)
    const green = Math.round((1 - ratio) * 255)
    const red = Math.round(ratio * 255)

    return `rgb(${green}, ${red}, 0)`
  }

  var option = {
    dataset: [
      {
        dimensions: ['name', 'score', 'id'],
        source: props.datasetSource,
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
        rotate: 30,
        margin: 6,
      },
    },
    yAxis: {
      // max: 120
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '1%',
      containLabel: true,
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },

    series: {
      type: 'bar',
      barWidth: 30,
      encode: { x: 'name', y: 'score' },
      datasetIndex: 1,
      label: {
        show: true,
        fontSize: 14,
        position: 'top',
        formatter(value) {
          return `${value.value[1]}%`
        },
      },
      itemStyle: {
        color: function (params) {
          const score = params.value[1]

          return getColor(score)
        },
        fontSize: 16,
      },
    },
    legend: {
      data: ['Data'],
    },
  }

  myChart.setOption(option)

  myChart.on('click', function (params) {
    const id = params.value[2]
    const name = params.name
    const average_kpi = params.value[1]

    kpiStore.currentRegion = {
      id: id,
      name: params.name,
    }
  })
}

watch(() => props.datasetSource, () => {
  initializeChart()
})

onMounted(() => {
  initializeChart()
})
</script>
