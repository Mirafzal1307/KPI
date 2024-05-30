<template>
  <VCard class="border">
    <VCol cols="12 mx-auto mt-4">
      <VCol
        cols="12"
        class="text-center text-h2"
      >
        <span class="font-weight-black">Monitoring</span>
      </VCol>
      <VRow class="flex justify-center mb-4">
        <VCol cols="6">
          <VAutocomplete
            v-model="branchId"
            label="Filial"
            item-title="name"
            clearable
            item-value="id"
            :items="branchList"
            class="mt-4"
            @update:model-value="getDivisionByBranch"
          />
        </VCol>
        <VCol cols="6">
          <VAutocomplete
            label="Blok"
            class="mt-4"
          />
        </VCol>
        <VCol cols="6">
          <VAutocomplete
            label="Departament"
            class="mt-4"
          />
        </VCol>
        <VCol cols="6">
          <VAutocomplete
            label="Boshqarma"
            class="mt-4"
          />
        </VCol>
        <VCol cols="6">
          <VAutocomplete
            label="Bo'lim"
            class="mt-4"
          />
        </VCol>
        <VCol cols="6">
          <VAutocomplete
            label="KPI ko'rsatkichi"
            class="mt-4"
          />
        </VCol>
      </VRow>
      <VCardActions>
        <div
          id="chart"
          style="block-size: 400px; inline-size: 100%"
          class="mx-auto"
        />
      </VCardActions>
    </VCol>
  </VCard>
</template>

<script setup>
import * as echarts from 'echarts'
import { onMounted } from 'vue'
import { fetchBranchList } from '@/services/main.office.service'

const branchId=ref(null)
const branchList = ref ([])
async function getBranchList() {
  branchList.value = await fetchBranchList()
}

const divisionsList= ref([])
const indicatorsList= ref([])
const indicatorDetailsList= ref([])
const managementsList= ref([])

async function getDivisionByBranch() {
  if (!branchId.value) {
    divisionsList.value = []
    indicatorsList.value = []
    indicatorDetailsList.value = []
    managementsList.value = []
  }
  this.divisionId = null
  this.cell = 'branch'
  this.cellId = this.branch_id
  if (this.branch_id) {
    // const data = await this.$store.dispatch('kpiIndicator/getDataByBranch', branchId.value)
    // this.divisionsList = data.divisions
    // this.managementsList = data.managements
    // this.departmentsList = data.departments
    // this.blocksList = await this.$store.dispatch('kpiIndicator/getBlockByBranch',branchId.value)
    // // await this.getIndicatorsList()
    // // await this.getIndicatorDetails()
  }
}


onMounted(() => {
  getBranchList()

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
        data: [22, 32, 62, 68, 72, 87, 92, 98, 89, 85, 90, 93],
        type: 'line',
        areaStyle: {},
      },
    ],
  })
})
</script>
