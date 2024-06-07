<template>
  <VCard class="border">
    <h3 class="text-center mt-1">
      {{ titleDistricts }} filiallari bo'yicha KPI ko'rsatkichlari (foizda)
    </h3>
    <div v-show="!dataSet.length" class="text-center">
      Ma'lumot yo'q
    </div>
    <div id="chart" style="block-size: 330px;" class="mx-auto"></div>
    <div class="text-center">
      <VDialog v-model="dialog" transition="dialog-bottom-transition" max-width="90%">
        <VCard>
          <VToolbar>
            <VToolbarTitle>KPI ko'rsatkichlari (foizda)</VToolbarTitle>
            <VSpacer />
            <VToolbarItems>
              <VBtn icon @click="dialog = false">
                <VIcon>mdi-close</VIcon>
              </VBtn>
            </VToolbarItems>
          </VToolbar>
          <VTabs v-model="tab">
            <VTab>Chart</VTab>
            <VTab>Table</VTab>
          </VTabs>
          <VWindow v-model="tab">
            <VWindowItem>
              <div id="branch-annual-chart" style="block-size: 400px;"></div>
            </VWindowItem>
            <VWindowItem>
              <VDataTable :items-per-page="-1" :items="kpiByBranchesDetails" :headers="headers" dense>
                <template #item="{ item }">
                  <tr>
                    <td>{{ item.id }}</td>
                    <td>{{ item.category }}</td>
                    <td>{{ item.indicator }}</td>
                    <td>{{ formatAndMultiply(item.branch_kpi) }}</td>
                    <td>{{ item.plan }}</td>
                    <td>{{ item.fact }}</td>
                    <td>{{ item.done_percent }}</td>
                    <td>{{ formatAndMultiply(item.weight) }}</td>
                    <td>{{ formatAndMultiply(item.kpi_percent) }}</td>
                    <td>{{ formatAndMultiply(item.min_percent) }}</td>
                    <td>{{ formatAndMultiply(item.max_percent) }}</td>
                  </tr>
                </template>
              </VDataTable>
            </VWindowItem>
          </VWindow>
        </VCard>
      </VDialog>
    </div>
  </VCard>
</template>

<script setup>
import { useKpiStore } from '@/store/kpi';
import * as echarts from 'echarts';
import { storeToRefs } from 'pinia';
import { nextTick, onMounted, ref, watch } from 'vue';

const props = defineProps({
  titleDistricts: {
    type: String,
    required: true,
  },
  dataSet: {
    type: Array,
    default: () => [],
  },
});

const kpiStore = useKpiStore();
const { kpiByBranchesDetails } = storeToRefs(kpiStore);

const formatAndMultiply = number => {
  const formattedNum = Math.floor(number * 100) / 100;
  return formattedNum * 100;
};

const dialog = ref(false);
const tab = ref(0);
const selectedBarId = ref(null);
let myChart;
let modalChart;

const headers = [
  { title: 'ID', value: 'id' },
  { title: 'Ko\'rsatkich turi' },
  { title: 'KPI - asosiy ko\'rsatkichlar(bank uchun muhim va yuqori ahamiyatga ega)', value: 'indicator' },
  { title: 'Filial KPI', value: 'branch_kpi' },
  { title: 'Reja', value: 'plan' },
  { title: 'Fakt', value: 'fact' },
  { title: 'Reja bajarilishi', value: 'done_percent' },
  { title: 'Ko\'rsatkich ulushi' },
  { title: 'Samaradorlik bajarilishi', value: 'kpi_percent' },
  { title: 'Minimum', value: 'min_percent' },
  { title: 'Maksimum', value: 'max_percent' },
];

const handleChartClick = async params => {
  try {
    selectedBarId.value = params.data.id;
    if (selectedBarId.value) {
      const data = await kpiStore.fetchKpiByBranchesDetails({
        user_type: kpiStore.currentUserType,
        period: kpiStore.currentPeriod,
        branch_id: selectedBarId.value,
      });
      const chartData = kpiStore.getChildGraphAnnualData(
        {
          user_type: kpiStore.currentUserType,
          branch_id: selectedBarId.value,
        }
      );


      if (data && chartData) {
        dialog.value = true;
        nextTick(() => {
          initializeModalChart(); // Initialize the modal chart after the dialog opens
        });
      }
    }
  } catch (error) {
    console.error(error);
  }
};

const initializeChart = () => {
  const chartDom = document.getElementById('chart');
  if (chartDom) {
    myChart = echarts.init(chartDom);
    updateChart(myChart);
    myChart.on('click', handleChartClick); // Set up the click event listener
  }
};

const initializeModalChart = () => {
  const chartDom = document.getElementById('modal-chart');
  if (chartDom) {
    modalChart = echarts.init(chartDom);
    updateChart(modalChart);
    modalChart.resize();
  }
};

const updateChart = chartInstance => {
  if (!chartInstance) return;

  const scores = props.dataSet.map(item => item.score).sort((a, b) => a - b);
  const minScore = scores[0];
  const maxScore = scores[scores.length - 1];

  const getColor = score => {
    const ratio = (score - minScore) / (maxScore - minScore);
    const green = Math.round((1 - ratio) * 255);
    const red = Math.round(ratio * 255);
    return `rgb(${green}, ${red}, 0)`;
  };

  const option = {
    dataset: [
      {
        dimensions: ['name', 'score', 'id'],
        source: props.dataSet,
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
      axisLabel: { interval: 0, rotate: 30 },
    },
    yAxis: {},
    series: {
      type: 'bar',
      encode: { x: 'name', y: 'score' },
      datasetIndex: 1,
      label: {
        show: true,
        fontSize: 12,
        position: 'top',
        formatter(value) {
          return `${value.value.score}%`;
        },
      },
      itemStyle: {
        color: function (params) {
          const score = params.data.score;
          return getColor(score);
        },
      },
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
  };

  chartInstance.setOption(option);
};

onMounted(() => {
  nextTick(() => {
    initializeChart();
  });
});

watch(() => props.dataSet, () => {
  updateChart(myChart);
});
</script>
