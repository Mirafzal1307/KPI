<template>
  <VCard class="border">
    <VCol cols="12 mx-auto mt-4">
      <VCol cols="12" class="text-center text-h2 mb-8">
        <span class="font-weight-black pb-10">Ishchilarning shaxsiy monitoringgi</span>
      </VCol>
      <VRow class="flex justify-center mb-4">
        <VCol cols="6" class="py-1" >
          <VAutocomplete v-model="statistic.branchId" return-object label="Filial" item-title="name" clearable
            item-value="id" :items="allBranches" />
        </VCol>
        <VCol cols="6" class="py-1">
          <div v-if="blocks.blocks">
            <VAutocomplete v-model="statistic.blockId" return-object :items="blocks.blocks" item-title="block_name"
              item-value="id" label="Blok"  clearable />
          </div>
        </VCol>

        <VCol cols="6" class="py-1">
          <div v-if="blocks.departments">
            <VAutocomplete v-model="statistic.departmentId" label="Departament"  return-object
              item-value="id" :items="blocks.departments" item-title="department_name" clearable />
          </div>
        </VCol>
        <VCol cols="6" class="py-1">
          <div v-if="blocks?.managements">
            <VAutocomplete v-model="statistic.managementId" label="Boshqarma"  return-object item-value="id"
              :items="blocks.managements" item-title="management_name" clearable />
          </div>
        </VCol>
        <VCol cols="6" class="py-1">
          <div v-if="blocks?.divisions">
            <VAutocomplete v-model="statistic.divisionId" label="Bo'lim" return-object item-value="id"
              :items="blocks.divisions" item-title="division_name" clearable />
          </div>
        </VCol>
        <VCol cols="6" class="py-1">
          <div v-if="empList.length !== 0 && statistic.branchId">
            <VAutocomplete v-model="empId" label="Ishchilar ro'yhati"  :items="empList"
              item-title="full_name" item-value="id" clearable @update:model-value="empIdChange" />
          </div>
        </VCol>
      </VRow>

      <VCardActions>
        <div id="chart" style="block-size: 400px; inline-size: 100%" class="mx-auto" />
      </VCardActions>
    </VCol>
  </VCard>
</template>

<script setup>
import { useStaticsStore } from '@/store/statistics';
import * as echarts from 'echarts';
import { storeToRefs } from 'pinia';
import { onMounted, ref, watch } from 'vue';


const statistics = useStaticsStore()
const { getBranches, getAllDepartaments, getAllBlocks, getEmpList, getEmpStatistics } = useStaticsStore()
const { allBranches, blocks, empList, empStatistic } = storeToRefs(statistics)


const statistic = ref({
  branchId: null,
  blockId: null,
  departmentId: null,
  managementId: null,
  divisionId: null,
})

const empId = ref(null)

function formatNumberRoundDown(num) {
  const n = Math.floor(num * 100) / 100

  return n.toFixed(2)
}



const lineChart = () => {
  const empsts = empStatistic.value.map(item => item.kpi)
  const empStsValue = empsts.map(item => Math.round(item * 100))
  console.log(empStsValue);
  const months = ['yanvar', 'fevral', 'mart', 'aprel', 'may', 'iyun', 'iyul', 'avgust', 'sentabr', 'oktabr', 'noyabr', 'dekabr']

  const pureArr = ref([])

  empStsValue.forEach((value) => {
    if (value > 0) {
      pureArr.value.push(value)
    }
  })

  const chartDom = document.getElementById('chart')
  const myChart = echarts.init(chartDom)

  const scores = empStsValue.map((value, index) => [months[index], value]);
  const minKPI = Math.min(...pureArr.value)
  const maxKPI = Math.max(...pureArr.value)

  const getColor = value => {
    if (pureArr.value.length == 1) {
      return `rgb(144, 238, 144)`
    }
    const normalizedValue = (value - minKPI) / (maxKPI - minKPI)
    const green = Math.round(normalizedValue * 255)
    const red = 255 - green

    return `rgb(${red}, ${green}, 0)`
  }




  var option = {
    dataset: [
      {
        dimensions: ['name', 'score', 'id'],
        source: scores,
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
        fontSize: 12,
        position: 'top',
        formatter(value) {
          return `${value.value[1]}%`
        },
      },
      itemStyle: {
        color: function (params) {
          const score = params.value[1]
          console.log(params.value.length);
          return getColor(score)
        },
      },
    },
    legend: {
      data: ['Data'],
    },
  }

  myChart.setOption(option)

}



onMounted(() => {
  getBranches()
  lineChart()
})

watch(statistic.value, (newValue, oldValue) => {
  const param = {
    branch_id: statistic.value.branchId?.id,
    block_id: statistic.value.blockId?.id,
    department_id: statistic.value.departmentId?.id,
    management_id: statistic.value.managementId?.id,
    division_id: statistic.value.divisionId?.id,
  }

  getAllDepartaments(statistic.value.branchId?.id)
  getAllBlocks(statistic.value.branchId?.id)
  getEmpList(param)
})

const empIdChange = async () => {
  await getEmpStatistics(empId.value)
  lineChart()
}
</script>
