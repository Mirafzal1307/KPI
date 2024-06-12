<template>
  <VCard>
    <VAutocomplete v-model="periodInput" item-title="period" :items="period" class="my-2" label="Davrni tanlang"
      @change="onChangePeriod" />
  </VCard>
  <VCard class="border">
    <template #title>
      Respublika bo'yicha o'rtacha KPI reytingi: {{ formatKPI(branchTableData.average_kpi) }}
    </template>
    <VDataTable height="665" :headers="headers" :items="branchTableData.branches" :items-per-page="-1">
      <template #item.id="{ item, index }">
        <VChip color="primary" dark>
          {{ index + 1 }}
        </VChip>
      </template>
      <template #item.average_kpi="{ item }">
        {{ formatKPI(item.average_kpi) }}
      </template>
      <template #bottom />
      <template #no-data>
        <span>Ma'lumot yo'q</span>
      </template>
    </VDataTable>
  </VCard>
</template>

<script setup>
import { useKpiStore } from '@/store/kpi';
import { storeToRefs } from 'pinia';
import { onMounted, ref, watch } from 'vue';

const kpiStore = useKpiStore()
const { branchTableData, period } = storeToRefs(kpiStore)


const periodInput = ref('2024-04-30')
const user_type = ref(1)

kpiStore.currentPeriod = periodInput.value

function formatKPI(value) {
  if (!value) return '0.00'
  return parseFloat(value).toFixed(2)
}

const headers = [
  { title: '№', value: 'id' },
  { title: 'Filial nomi', value: 'name' },
  { title: 'KPI', value: 'average_kpi' },
]

async function getPeriods() {
  try {
    const res = await kpiStore.fetchKpiPeriods()
    if (res && period.value.length > 0) {
      periodInput.value = period.value[0].period
      await kpiStore.fetchBranchTableData({ user_type: user_type.value, period: periodInput.value })
      await kpiStore.fetchKpiByRegion({ user_type: kpiStore.currentUserType, period: kpiStore.currentPeriod })
    }
  } catch (error) {
    console.error(error)
  }
}

async function onChangePeriod() {
  try {
    if (periodInput.value) {
      kpiStore.currentPeriod = periodInput.value
      await kpiStore.fetchBranchTableData({ user_type: user_type.value, period: periodInput.value })
      await kpiStore.fetchKpiByRegion({ user_type: kpiStore.currentUserType, period: kpiStore.currentPeriod })
    }
  } catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  getPeriods()
})

watch(periodInput, newPeriod => {
  if (newPeriod) {
    onChangePeriod()
  }
})
</script>
