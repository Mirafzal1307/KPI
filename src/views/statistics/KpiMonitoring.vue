<template>
  <VCard class="border">
    <VCol cols="12 mx-auto mt-4">
      <VCol cols="12" class="text-center text-h2">
        <span class="font-weight-black">Monitoring</span>
      </VCol>
      <VRow class="flex justify-center mb-4">
        <VCol cols="6">
          <!-- {{ allBranches }} -->
          <VAutocomplete v-model="branchId" label="Filial" item-title="name" clearable item-value="id"
            :items="allBranches" class="mt-4" return-object />
          <!-- <div v-if="allBranches">
       
          </div> -->
        </VCol>
        <VCol cols="6">
          {{ departments }}
          <VAutocomplete label="Blok" class="mt-4" />
        </VCol>
        <VCol cols="6">
          <VAutocomplete label="Departament" class="mt-4" />
        </VCol>
        <VCol cols="6">
          <VAutocomplete label="Boshqarma" class="mt-4" />
        </VCol>
        <VCol cols="6">
          <VAutocomplete label="Bo'lim" class="mt-4" />
        </VCol>
        <VCol cols="6">
          <VAutocomplete label="KPI ko'rsatkichi" class="mt-4" />
        </VCol>
      </VRow>
      <VCardActions>
        <div id="chart" style="block-size: 400px; inline-size: 100%" class="mx-auto" />
      </VCardActions>
    </VCol>
  </VCard>
</template>

<script setup>
import * as echarts from 'echarts'
import { onMounted, watch } from 'vue'

import { useStaticsStore } from '@/store/statistics';
import { storeToRefs } from 'pinia';

const statistics = useStaticsStore()
const { getBranches, getAllDepartaments } = useStaticsStore()
const { allBranches, departments } = storeToRefs(statistics)

const branchId = ref(null)
console.log(allBranches.value);



onMounted(() => {
  getBranches()

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
});
console.log(branchId.value);

watch(branchId, (newValue, oldValue) => {
  console.log(newValue, oldValue);
  getAllDepartaments(branchId.value?.id)
});
</script>
