<template>
  <VCard class="border">
    <VCol cols="12 mx-auto mt-4">
      <VCol cols="12" class="text-center text-h2 mb-8">
        <span class="font-weight-black pb-10">Ishchilarning shaxsiy monitoringgi</span>
      </VCol>
      <VRow class="flex justify-center mb-4">
        <VCol cols="6" class="py-1">
          <VAutocomplete @update:model-value="getAllBrnachByRegion" v-model="statistic.regionId" return-object
            label="Hudud" item-title="region_name_uz" clearable item-value="id" :items="allRegions" />
        </VCol>

        <VCol cols="6" class="py-1">
          <VAutocomplete @update:model-value="getBlocksByBranch" v-model="statistic.branchId" return-object
            label="Filial" item-title="branch_name" clearable item-value="id" :items="allBranches" />
        </VCol>
        <VCol cols="6" class="py-1">
          <div v-if="blocks?.length !== 0">
            <VAutocomplete @update:model-value="getDepartmentByBlock" v-model="statistic.blockId" return-object
              item-title="block_name" clearable item-value="id" :items="blocks" label="Blok" />
          </div>
        </VCol>
        <VCol cols="6" class="py-1">
          <div v-if="departments?.length !== 0">
            <VAutocomplete @update:model-value="getManagmentByDepartment" v-model="statistic.departmentId"
              label="Departament" return-object item-value="id" :items="departments" item-title="department_name"
              clearable />
          </div>
        </VCol>

        <VCol cols="6" class="py-1">
          <div v-if="management?.length !== 0">
            <VAutocomplete @update:model-value="getDivisionsByManagment" v-model="statistic.managementId"
              label="Boshqarma" return-object item-value="id" :items="management" item-title="management_name"
              clearable />
          </div>
        </VCol>
        <VCol cols="6" class="py-1">
          <div v-if="divisions?.length !== 0">
            <VAutocomplete @update:model-value="getEmployeeList" v-model="statistic.divisionId" label="Bo'lim"
              return-object item-value="id" :items="divisions" item-title="division_name" clearable />
          </div>
        </VCol>
        <VCol cols="6" class="py-1 text-left">
          <div v-if="empList?.length !== 0">
            <VAutocomplete @update:model-value="empIdChange" v-model="empId" label="Ishchilar ro'yhati" :items="empList"
              item-title="full_name" item-value="id" clearable />
          </div>
        </VCol>
        <VCol cols="6" class="py-1 text-left">
          <div v-if="false">
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
import { useBranchStore } from '@/store/branch';
import { useStaticsStore } from '@/store/statistics';
import * as echarts from 'echarts';
import { storeToRefs } from 'pinia';
import { onMounted, ref, } from 'vue';

const regions = useBranchStore()
const statistics = useStaticsStore()

const { getRegions } = useBranchStore()
const { allRegions } = storeToRefs(regions)

const {
  getBranches,
  getAllDataByDepartments,
  getAllDataByBlocks,
  getEmpList,
  getEmpStatistics,
  getDepartmentByBlocks,
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



const statistic = ref({
  regionId: null,
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
  const months = ['Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'Iyun', 'Iyul', 'Avgust', 'Sentabr', 'Oktabr', 'Noyabr', 'Dekabr']


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
      axisLabel: {
        fontSize: 16,
        fontWeight: 'bold',
      },
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
  getRegions()
  lineChart()
})

const getAllBrnachByRegion = async (newValue) => {
  if (!newValue) {
    allBranches.value = []
    statistic.value.branchId = null
    blocks.value = []
    statistic.value.blockId = null
    departments.value = []
    statistic.value.departmentId = null
    management.value = []
    statistic.value.managementId = null
    divisions.value = []
    statistic.value.divisionId = null
    empList.value = []
    empId.value = null
    return
  }
  await getBranches(newValue?.id)

  statistic.value.branchId = null;
  statistic.value.blockId = null;
  statistic.value.departmentId = null;
  statistic.value.managementId = null;
  statistic.value.divisionId = null;
  empId.value = null;

}
console.log(statistic.value.branchId);

const getBlocksByBranch = async (newValue) => {
  console.log('block', newValue);
  if (!newValue) {
    debugger
    console.log('block', newValue);
    blocks.value = []
    statistic.value.blockId = null
    departments.value = []
    statistic.value.departmentId = null
    management.value = []
    statistic.value.managementId = null
    divisions.value = []
    statistic.value.divisionId = null
    empList.value = []
    empId.value = null
    return
  }
  await getAllDataByDepartments(newValue?.id)
  await getAllDataByBlocks(newValue?.id)
  getEmployeeList()
  statistic.value.blockId = null;
  statistic.value.departmentId = null;
  statistic.value.managementId = null;
  statistic.value.divisionId = null;
  empId.value = null;

}

const getDepartmentByBlock = async (newValue) => {
  if (!newValue) {
    departments.value = []
    statistic.value.departmentId = null
    management.value = []
    statistic.value.managementId = null
    divisions.value = []
    statistic.value.divisionId = null
    // empList.value = []
    // empId.value = null
    return
  }
  await getDepartmentByBlocks(newValue?.id)
  getEmployeeList()
  statistic.value.departmentId = null;
  statistic.value.managementId = null;
  statistic.value.divisionId = null;
  empId.value = null;
}

const getManagmentByDepartment = async (newValue) => {
  if (!newValue) {
    management.value = []
    statistic.value.managementId = null
    divisions.value = []
    statistic.value.divisionId = null
    // empList.value = []
    // empId.value = null
    return
  }
  await getManagmentByDepartments(newValue?.id)
  getEmployeeList()
  statistic.value.managementId = null;
  statistic.value.divisionId = null;
  empId.value = null;

}

const getDivisionsByManagment = async (newValue) => {
  if (!newValue) {
    divisions.value = []
    statistic.value.divisionId = null
    // empList.value = []
    // empId.value = null
    return
  }
  await getDivisionsByManagments(newValue?.id)
  getEmployeeList()
  statistic.value.divisionId = null;
  empId.value = null;

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
