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
      <VDialog v-model="dialog" transition="dialog-bottom-transition">
        <VCard>
          <VToolbar>
            <VToolbarTitle v-if="tab == 0">Yillik KPI ko'rsatkichlari (foizda)</VToolbarTitle>
            <VToolbarTitle v-if="tab == 1">{{ currentPeriod }} davridagi KPI ma'lumotlari </VToolbarTitle>

            <VSpacer />
            <VToolbarItems>
              <VBtn icon @click="dialog = false">
                <VIcon>ri-close-large-line</VIcon>
              </VBtn>
            </VToolbarItems>
          </VToolbar>
          <VTabs v-model="tab" class="d-flex w-full justify-center align-center">
            <VTab>Grafik</VTab>
            <VTab v-if="kpiByBranchesDetails.length > 0">Jadval</VTab>

          </VTabs>


          <VWindow v-model="tab" class="fixed-height">
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
                <template #bottom>

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
let annualChart;
const currentPeriod = ref(null)

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
      const chartData = await kpiStore.getChildGraphAnnualData({
        user_type: kpiStore.currentUserType,
        branch_id: selectedBarId.value,
      });

      if (chartData) {
        currentPeriod.value = chartData[0].period;
        await kpiStore.fetchKpiByBranchesDetails({
          user_type: kpiStore.currentUserType,
          period: chartData[0].period,
          branch_id: selectedBarId.value,
        });
        dialog.value = true;
        nextTick(() => {
          initializeModalChart();
          initializeAnnualChart(chartData); // Initialize the annual chart
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
    updateChart(myChart, props.dataSet);
    myChart.on('click', handleChartClick); // Set up the click event listener
  }
};

const initializeModalChart = () => {
  const chartDom = document.getElementById('modal-chart');
  if (chartDom) {
    modalChart = echarts.init(chartDom);
    updateChart(modalChart, props.dataSet);
    modalChart.resize();
  }
};

const initializeAnnualChart = (data) => {
  const chartDom = document.getElementById('branch-annual-chart');
  if (chartDom) {
    annualChart = echarts.init(chartDom);
    const option = {
      xAxis: {
        type: 'category',
        data: data.map(item => item.period),
      },
      yAxis: {
        type: 'value',
      },
      series: [{
        data: data.map(item => item.average_kpi),
        type: 'bar',
        smooth: true,
        label: {
          show: true,
          position: 'top',
          formatter: '{c}%',
        },
      }],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
    };
    annualChart.setOption(option);
    annualChart.resize();
    annualChart.on('click', function (params) {
      currentPeriod.value = params.name;
      getTableData(params?.name);
    });


  }
};

const updateChart = (chartInstance, data) => {
  if (!chartInstance) return;

  const scores = data.map(item => item.score).sort((a, b) => a - b);
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
        source: data,
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

const getTableData = async (period) => {
  try {
    const data = await kpiStore.fetchKpiByBranchesDetails({
      user_type: kpiStore.currentUserType,
      period: period,
      branch_id: selectedBarId.value,
    });
    if (data && data.length > 0) {
      tab.value = 1;
    }
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
  nextTick(() => {
    initializeChart();
  });
});

watch(() => props.dataSet, () => {
  updateChart(myChart, props.dataSet);
});
</script>
<style scoped>
.fixed-height {
  block-size: 600px;
}
</style>
