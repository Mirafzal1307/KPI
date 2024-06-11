<template>
  <VCard class="border">
    <VCol cols="12 mx-auto mt-4">
      <VCol cols="12" class="text-center text-h2">
        <span class="font-weight-black">Monitoring</span>
      </VCol>
      <VRow class="flex justify-center mb-4">
        <VCol cols="6">

          <VAutocomplete v-model="statistic.branchId" return-object label="Filial" item-title="name" clearable item-value="id"
            :items="allBranches" class="mt-4"  />

        </VCol>
        <VCol cols="6">
          <div v-if="blocks.blocks">
            <VAutocomplete v-model="statistic.blockId" return-object :items="blocks.blocks" item-title="block_name"
              item-value="id" label="Blok" class="mt-4" clearable />
          </div>

        </VCol>

        <VCol cols="6">

          <div v-if="blocks.departments">
            <VAutocomplete v-model="statistic.departmentId" label="Departament" class="mt-4" return-object
              item-value="id" :items="blocks.departments" item-title="department_name" clearable />

          </div>
        </VCol>
        <VCol cols="6">
          <div v-if="blocks?.managements">
            <VAutocomplete v-model="statistic.managementId" label="Boshqarma" class="mt-4" return-object item-value="id"
              :items="blocks.managements" item-title="management_name"  clearable />
          </div>
        </VCol>
        <VCol cols="6">
          <div v-if="blocks?.divisions">
            <VAutocomplete v-model="statistic.divisionId" label="Bo'lim" class="mt-4" return-object item-value="id"
              :items="blocks.divisions" item-title="division_name" clearable />
          </div>
        </VCol>
        <VCol cols="6">
          <div v-if="empList.length !== 0 && statistic.branchId ">
            <VAutocomplete v-model="empId" label="Ishchilar ro'yhati" class="mt-4" :items="empList"
              item-title="full_name" item-value="id" @update:model-value="empIdChange"  clearable/>
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
import * as echarts from 'echarts';
import { onMounted, watch } from 'vue';

import { useStaticsStore } from '@/store/statistics';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

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
  return Math.floor(num * 100) / 100
}



const lineChart = () => {
  const empsts = empStatistic.value.map(item => item.kpi)
  const empStsValue = empsts.map(item => formatNumberRoundDown(item) * 100)




  const chartDom = document.getElementById('chart')
  const myChart = echarts.init(chartDom)



  myChart.setOption({
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: [
        'December',
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'Octobet',
        'November',
      ],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: empStsValue,
        type: 'line',
        areaStyle: {},
      },
    ],
  })

}



onMounted(() => {
  getBranches()
  lineChart()
});

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
});

const empIdChange = async () => {
  await getEmpStatistics(empId.value)
  lineChart()
}

</script>
