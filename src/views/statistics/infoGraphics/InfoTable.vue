<template>
  <v-card>
    <v-autocomplete v-model="periodInput" item-title="period" :items="period" class="my-2" label="Davrni tanlang"
      @change="onChangePeriod" />
  </v-card>
  <v-card class="border">
    <template #title>Respublika bo'yicha o'rtacha KPI reytingi: {{ formatKPI(branchTableData.average_kpi) }}</template>
    <v-data-table height="665" :headers="headers" :items="branchTableData.branches" hide-default-footer>
      <template #item.id="{ item }">
        <v-chip color="primary" dark>{{ item.id }}</v-chip>
      </template>
      <template #item.average_kpi="{ item }">
        {{ formatKPI(item.average_kpi) }}
      </template>
    </v-data-table>

  </v-card>
</template>

<script setup>
import { useKpiStore } from '@/store/kpi';
import { storeToRefs } from 'pinia';
import { onMounted, ref, watch } from 'vue';

const kpiStore = useKpiStore();
const { branchTableData, period } = storeToRefs(kpiStore);


// const period = ref([
//   { period: '2021-01-01' },
//   { period: '2021-02-01' },
//   { period: '2021-03-01' },
//   { period: '2021-04-01' },
//   { period: '2021-05-01' },
//   { period: '2021-06-01' },
//   { period: '2021-07-01' },
//   { period: '2021-08-01' },
//   { period: '2021-09-01' },
//   { period: '2021-10-01' },
//   { period: '2021-11-01' },
//   { period: '2021-12-01' },
// ]);
const periodInput = ref('2024-04-30');
const user_type = ref(1);
const itemsPerPage = ref(10);
kpiStore.currentPeriod = periodInput.value;

function formatKPI(value) {
  return parseFloat(value).toFixed(2);
}

const headers = [
  { title: 'id', value: 'id' },
  { title: 'Filial nomi', value: 'name' },
  { title: 'KPI', value: 'average_kpi' },
];

async function getPeriods() {
  try {
    const res = await kpiStore.fetchKpiPeriods();
    if (res && period.value.length > 0) {
      periodInput.value = period.value[0].period;
      await kpiStore.fetchBranchTableData({ user_type: user_type.value, period: periodInput.value });
      await kpiStore.fetchKpiByRegion({ user_type: kpiStore.currentUserType, period: kpiStore.currentPeriod })

    }
  } catch (error) {
    console.error(error);
  }
}

async function onChangePeriod() {
  try {
    if (periodInput.value) {
      kpiStore.currentPeriod = periodInput.value;
      await kpiStore.fetchBranchTableData({ user_type: user_type.value, period: periodInput.value });
    }
  } catch (error) {
    console.error(error);
  }
}

onMounted(() => {
  getPeriods();
});

watch(periodInput, (newPeriod) => {
  if (newPeriod) {
    onChangePeriod();
  }
});
</script>
