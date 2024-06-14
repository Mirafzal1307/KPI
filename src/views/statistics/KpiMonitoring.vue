<template>
  <VCard class="border">
    <VCol cols="12 mx-auto mt-4">
      <VCol cols="12" class="text-center text-h2 mb-8">
        <span class="font-weight-black pb-10">Ishchilarning shaxsiy monitoringgi</span>
      </VCol>
      <VRow class="flex justify-center mb-4">
        <VCol cols="6" class="py-1">
          <VAutocomplete @update:model-value="getData" v-model="statistic.branchId" return-object label="Filial"
            item-title="name" clearable item-value="id" :items="allBranches" />
        </VCol>
        <VCol cols="6" class="py-1">
          <div v-if="blocks" >
            <VAutocomplete @update:model-value="getBlock" v-model="statistic.blockId" return-object
              item-title="block_name" clearable item-value="id" :items="blocks" label="Blok" />
          </div>
        </VCol>

        <VCol cols="6" class="py-1">
          <div v-if="departments" >
            <VAutocomplete @update:model-value="getManagment" v-model="statistic.departmentId" label="Departament"
              return-object item-value="id" :items="departments" item-title="department_name" clearable />
          </div>
        </VCol>

        <VCol cols="6" class="py-1">
          <div v-if="management" >
            <VAutocomplete @update:model-value="getDivisions" v-model="statistic.managementId" label="Boshqarma"
              return-object item-value="id" :items="management" item-title="management_name" clearable />
          </div>
        </VCol>
        <VCol cols="6" class="py-1">
          <div v-if="divisions" >
            <VAutocomplete @update:model-value="getEmployeeList" v-model="statistic.divisionId" label="Bo'lim"
              return-object item-value="id" :items="divisions" item-title="division_name" clearable />
          </div>
        </VCol>
        <VCol cols="6" class="py-1">
          <div>
            <VAutocomplete @update:model-value="empIdChange" v-model="empId" label="Ishchilar ro'yhati" :items="empList"
              item-title="full_name" item-value="id" clearable />
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
import { onMounted, ref, } from 'vue';

const statistics = useStaticsStore()

const {
  getBranches,
  getAllDepartaments,
  getAllBlocks,
  getEmpList,
  getEmpStatistics,
  getAllByBlocks ,
  getManagmentByDepartments,
  getDivisionsByManagments,
} = useStaticsStore()


const {
  allBranches,
  blocks,
  empList,
  empStatistic,
  departments,
  management,
  allData,
  divisions
} = storeToRefs(statistics)

const newDepartament = ref([])
const newBlock = ref([])

const updateDepartament = () => {

  // if (blocks.value.departments == null) {
  //   newDepartament.value = departments.value.departments
  // } else if (blocks.value.departments.length != 0) {
  //   newDepartament.value = blocks.value.departments
  // }
}
const updateBlocks = () => {
  console.log(blocks);
  console.log(allData);
}

const statistic = ref({
  branchId: null,
  blockId: null,
  departmentId: null,
  managementId: null,
  divisionId: null,
})

const empId = ref(null)

const lineChart = () => {
  const empsts = empStatistic.value.map(item => item.kpi)
  const empStsValue = empsts.map(item => Math.round(item * 100))
  const months = ['yanvar', 'fevral', 'mart', 'aprel', 'may', 'iyun', 'iyul', 'avgust', 'sentabr', 'oktabr', 'noyabr', 'dekabr']


  let filledData = []
  months.forEach((month, index) => {
    let kpi = empStsValue[index % empStsValue.length];
    filledData.push({ period: month, average_kpi: kpi });
  });;

  const kpiValues = filledData.map(item => item.average_kpi)

  const chartDom = document.getElementById('chart')
  const myChart = echarts.init(chartDom)

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

  var option = {

    xAxis: {
      type: 'category',
      data: filledData.map(item => item.period)
    },
    yAxis: {
      type: 'value',
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },

    series: [
      {
        data: filledData.map(item => ({
          value: item.average_kpi,

          itemStyle: {
            color: getColor(item.average_kpi),
          },

        })),
        type: 'bar',
        smooth: true,
        label: {
          show: true,
          position: 'top',
          formatter: '{c}%',
        },
      },
    ],

  }

  myChart.setOption(option)

}

onMounted(() => {
  getBranches()
  lineChart()
})

const getBlock = async (newValue) => {
  await getAllByBlocks(newValue?.id)
  getEmployeeList()

}

const getManagment = async (newValue) => {
  console.log(newValue);
  await getManagmentByDepartments(newValue?.id)
  getEmployeeList()

}

const getDivisions = async (newValue) => {
  await getDivisionsByManagments(newValue?.id)
  getEmployeeList()
}

const getData = async (newValue) => {
  await getAllDepartaments(newValue?.id)
  await getAllBlocks(newValue?.id)
  updateDepartament()
  getEmployeeList()
  updateBlocks()
  getBlock()

}

const getEmployeeList = async () => {
  const param = {
    branch_id: statistic.value.branchId?.id,
    block_id: statistic.value.blockId?.id,
    department_id: statistic.value.departmentId?.id,
    management_id: statistic.value.managementId?.id,
    division_id: statistic.value.divisionId?.id,
  }


  await getEmpList(param)
}


const empIdChange = async (empId) => {
  await getEmpStatistics(empId)
  lineChart()
}
</script>
