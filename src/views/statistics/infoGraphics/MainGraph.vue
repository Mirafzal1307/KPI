<template>
  <VRow class="d-flex">
    <v-col cols="7">
      <Infographics v-if="formattedDatasetSource.length >= 0" :dataset-source="formattedDatasetSource" />
      <ChildGraph :title-districts="defaultRegionData.name" class="mt-4" />
    </v-col>
    <v-col cols="5">
      <InfoTable :items="period" />
    </v-col>
  </VRow>
</template>

<script setup>
import { useKpiStore } from '@/store/kpi';
import ChildGraph from '@/views/statistics/infoGraphics/ChildGraph.vue';
import Infographics from '@/views/statistics/infoGraphics/InfoGraphics.vue';
import InfoTable from '@/views/statistics/infoGraphics/InfoTable.vue';
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';

const kpiStore = useKpiStore();
const { period, regionKpi } = storeToRefs(kpiStore);

const formattedDatasetSource = ref([]);

async function getChartData() {
  try {
    if (!period.value.length) {
      await kpiStore.fetchKpiPeriods();
    }

    const data = await kpiStore.fetchKpiByRegion({ user_type: kpiStore.currentUserType, period: kpiStore.currentPeriod });
    return formatData(data);
  } catch (error) {
    console.log(error);
  }
}

const defaultRegionData = ref({});
function formatData(data) {
  formattedDatasetSource.value = data.map((item, index) => [item.name, item.average_kpi, item.id]);
  defaultRegionData.value = data[0];
  return formattedDatasetSource.value;
}


async function getBranchesData() {
  kpiStore.fetchKpiPeriods()
  const data = kpiStore.fetchKpiByBranches({ region_id: 13 });
}

onMounted(() => {
  getChartData();
  getBranchesData();
});
</script>
