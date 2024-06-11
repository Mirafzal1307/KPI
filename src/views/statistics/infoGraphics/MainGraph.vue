<template>
  <VRow class="d-flex">
    <v-col cols="7">
      <Infographics v-if="formattedDatasetSource.length >= 0" :dataset-source="formattedDatasetSource" />
      <ChildGraph v-if="formattedBranchData.length >= 0" :data-set="formattedBranchData"
        :title-districts="kpiStore.currentRegion.name" class="mt-2" />
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
import { onMounted, ref, watch } from 'vue';

const kpiStore = useKpiStore();
const { period, regionKpi } = storeToRefs(kpiStore);

const formattedDatasetSource = ref([]);
const formattedBranchData = ref([])
const defaultRegionData = ref({});

const { kpiByBranches } = storeToRefs(kpiStore);

async function getChartData() {
  try {
    if (!period.value.length) {
      await kpiStore.fetchKpiPeriods();
    }

    const data = await kpiStore.fetchKpiByRegion({ user_type: kpiStore.currentUserType, period: kpiStore.currentPeriod });

    if (!data.length) {
      return formattedDatasetSource.value = [];
    }

    kpiStore.currentRegion = data[0];

    formatData(data);

    if (formattedDatasetSource.value.length > 0) {
      await getBranchesData();
    }
  } catch (error) {
    console.error(error);
  }
}

async function getBranchesData() {
  try {
    if (formattedDatasetSource.value.length > 0 && formattedDatasetSource.value[0]) {
      const branchData = await kpiStore.fetchKpiByBranches({ region_id: kpiStore.currentRegion?.id });

      if (!branchData[0]) return formattedBranchData.value = [];
      formatBranchData(branchData);
    }
  } catch (error) {
    console.error(error);
  }
}


function formatData(data) {
  formattedDatasetSource.value = data.map((item, index) => [item.name, item.average_kpi, item.id]);
}

function formatBranchData(data) {
  formattedBranchData.value = data.map((item) => {
    const formattedName = item.name
      .replace(/.*?viloyati\s*/, '')
      .replace(/.*?Respublikasi\s*/, '')
      .replace(/ bank xizmatlari markazi$/, '')
      .replace(/ Bank xizmatlari ofisi$/, '')
      .replace(/ bank xizmatlari ofisi$/, '')
      .replace(/ xizmatlari ofisi$/, '')
      .replace(/  ofisi$/, '')
      .replace(/  xizmatlari$/, '')
      .trim();
    return {
      name: formattedName,
      score: item.average_kpi,
      id: item.id
    };
  });
}


onMounted(() => {
  getChartData();
});

watch(() => kpiStore.currentPeriod, () => {
  getChartData();

});

watch(() => kpiStore.currentRegion, () => {
  getBranchesData();
});

watch(() => kpiStore.currentUserType, () => {
  getChartData();
  kpiStore.fetchBranchTableData({ user_type: kpiStore.currentUserType, period: kpiStore.currentPeriod });
  getBranchesData();

});

watch(() => formattedDatasetSource, (newValue) => {
  if (!newValue.length) {
    return formattedBranchData.value = [];
  }
});
</script>
