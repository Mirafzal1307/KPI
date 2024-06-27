<template>
  <VCard class="border">
    <VRow class="px-4">
      <VCol cols="12" md="5">
        <VSelect v-model="dataParams.type" item-title="name" item-value="value"
          :items="[{ name: 'Rahbariyat', value: 1 }, { name: 'Tarkibiy bo\'linma', value: 2 }]"
          @update:model-value="getStatistics()" />
      </VCol>
      <VCol cols="12" md="2" />
      <VCol cols="12" md="5">
        <VSelect v-model="dataParams.period" :items="periodList" label="Davr bo'yicha" item-title="period"
          item-value="period" @update:model-value="getStatistics()" />
      </VCol>
    </VRow>
    <VCardItem class="text-right text-h5">
      <span class="font-weight-bold"> O'rtacha KPI natijasi: </span>
      <span :class="colorify(statistics.average_kpi)"> {{ statistics.average_kpi }} </span>
    </VCardItem>
    <template #title>
      Bosh ofis bo'yicha KPI ko'rsatkichlari boshqaruvchilar KPI ko'rsatkichlar (foizda)
    </template>
    <VContainer>
      <VRow>
        <VCol cols="12" md="12">
          <VCard v-show="dataParams.type === 1" class="border">
            <VSheet id="main" height="350" />
          </VCard>
        </VCol>
      </VRow>
    </VContainer>
    <template v-if="dataParams.type === 2">
      <VContainer>
        <VRow>
          <VCol cols="12" md="12" v-for="(item, index) in statistics.all_kpi" :key="index">
            <VCard class="border">
              <VCardText class="d-flex justify-between align-center">
                <h3 class="text-center mb-2">{{ item.name }}</h3>
                <span class="font-weight-bold">O'rtacha KPI: {{ item?.avg_kpi }}%</span>
              </VCardText>
              <VSheet :id="'chart-' + item.head" :height="getHeight(item)" />
            </VCard>
          </VCol>
        </VRow>
      </VContainer>
    </template>
    <VDialog v-model="dialog" transition="dialog-bottom-transition">
      <VCard>
        <VToolbar>
          <VToolbarTitle> {{ currentDepartment }}ning yillik KPI ko'rsatkichi </VToolbarTitle>
          <VSpacer />
          <VToolbarItems>
            <VBtn icon @click="dialog = false">
              <VIcon>ri-close-large-line</VIcon>
            </VBtn>
          </VToolbarItems>
        </VToolbar>
        <VWindow v-model="tab" class="fixed-height">
          <VWindowItem>
            <div id="departments-annual-chart" style="block-size: 400px;"></div>
          </VWindowItem>
        </VWindow>
      </VCard>
    </VDialog>
  </VCard>
</template>

<script setup>
import { fetchPeriodList, fetchStatistics } from '@/services/main.office.service';
import { useKpiStore } from '@/store/kpi';
import * as echarts from 'echarts';
import { nextTick, onMounted, ref, watch } from 'vue';
import { VContainer, VRow } from 'vuetify/lib/components/index.mjs';

const kpiStore = useKpiStore();
const { departmentChart } = storeToRefs(kpiStore);
const datasetSourceItem = ref([]);
const dialog = ref(false);
const departmentChartData = ref([]);
const tab = ref(0);
const currentDepartment = ref('null');
const filteredDepartments = ref([]);

const dataParams = ref({
  period: null,
  type: 2,
});
const getHeight = (arr) => {
  if (!arr.kpi) return 300;
  const itemCount = arr.kpi.length;
  if (itemCount >= 10) {
    return 500;
  } else if (itemCount >= 8) {
    return 390;
  } else if (itemCount >= 7) {
    return 350;
  }
  else if (itemCount >= 5) {
    return 290;
  }
  else if (itemCount >= 4) {
    return 240;
  } else if (itemCount >= 2) {
    return 150;
  }
  else {
    return 300;
  }
};
const cardHeight = computed(() => {
  const itemCount = statistics.value.all_kpi.length;
  if (itemCount > 9) {
    console.log('itemCount', itemCount);
    return 600; // Set a larger height if there are more than 7 items
  } else {
    return 300; // Default height for fewer than or equal to 7 items
  }
});

const periodList = ref([]);
async function getPeriodList() {
  periodList.value = await fetchPeriodList();
  dataParams.value.period = periodList.value[0]?.period;
  await getStatistics();
}

const statistics = ref({
  average_kpi: null,
  all_kpi: [],
});
const rahbariyatOrder = [
  'Butayev',
  'Hamidov',
  'Sulaymonov',
  'Allaniyazov',
  'Mamadjanov',
  'Djumaniyozov',
  'Muxammadiyev',
  'Mustafayev'
];
function reorderKpiData(data) {
  const orderedNames = {
    "Butayev": "Butaev Orif Aliboevich",
    "Hamidov": "Xamidov Akmal Akramovich",
    "Sulaymonov": "Sulaymonov Rustam Davutovich",
    "Allaniyazov": "Allaniyazov Baxadir Ubbiniyazovich",
    "Mamadjanov": "Mamadjanov Ibroximjon Abdushukurovich",
    "Djumaniyozov": "Djumaniyazov Ikram Karimbaevich",
    "Muxammadiyev": "Muxammadiyev Qosim Xoʻjayorvich",
    "Mustafayev": "Mustafayev Alisher Abdulloyevich"
  };
  const orderMap = new Map();
  rahbariyatOrder.forEach((name, index) => {
    orderMap.set(orderedNames[name], index);
  });

  const sortedKpiData = data.all_kpi.sort((a, b) => {
    const nameA = a.name.trim();
    const nameB = b.name.trim();
    return orderMap.get(nameA) - orderMap.get(nameB);
  });
  return {
    ...data,
    all_kpi: sortedKpiData
  };
}


async function getStatistics() {
  if (!dataParams.value.period) return;
  const result = await fetchStatistics(dataParams);
  statistics.value.average_kpi = result.average_kpi;
  statistics.value.all_kpi = result.all_kpi;
  if (dataParams.value.type === 2) {
    console.log(result.all_kpi);
    datasetSourceItem.value = result.all_kpi.map(head => ({
      head: head.head,
      kpi: head.kpi.map(item => ({ name: item.name.trim(), kpi: item.kpi, id: item.department_id })).reverse(),
    }));
  } else {
    datasetSourceItem.value = await reorderKpiData(result);
    datasetSourceItem.value = result.all_kpi.map(item => ({
      name: item.name,
      kpi: item.kpi,
      id: item.department_id
    })).reverse();
  }
  initializeCharts();
}

const initializeCharts = async () => {
  await nextTick();
  if (dataParams.value.type === 2) {
    datasetSourceItem.value.forEach(head => {
      const chartDom = document.getElementById('chart-' + head.head);
      if (!chartDom) return;
      const myChart = echarts.init(chartDom);
      const scores = head.kpi.map(item => item.kpi);
      const minScore = Math.min(...scores);
      const maxScore = Math.max(...scores);

      const getColor = score => {
        const ratio = (score - minScore) / (maxScore - minScore);
        let green = Math.round((1 - ratio) * 255);
        let red = Math.round(ratio * 255);
        if (score > 50) {
          red = 216;
        }
        return `rgb(${green}, ${red}, 0)`;
      };

      const option = {
        dataset: {
          dimensions: ['name', 'kpi', 'id'],
          source: head.kpi,
        },
        yAxis: {
          show: true,
          type: 'category',
          axisLabel: {
            interval: 0,
            fontSize: 15,
          },
        },
        xAxis: {
          type: 'value',
          max: 100,
        },
        series: {
          label: {
            show: true,
            fontSize: 15,
            fontWeight: 'bold',
            barGap: 50,
            position: 'right',
            formatter(value) {
              return ` ${value.value.kpi} %`;
            },
          },
          type: 'bar',
          barWidth: 22,
          barGap: 50,
          encode: { y: 'name', x: 'kpi' },
          itemStyle: {
            color: function (params) {
              const score = params.value.kpi;
              return getColor(score);
            },
          },
        },

        tooltip: {
          show: true,
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
        },
        grid: {
          left: '39%',
          right: '4%',
          bottom: '12%',
          containLabel: false,
        },
        legend: {
          data: ['Data'],
        },
      };
      myChart.setOption(option);
      myChart.on('click', function (params) {
        currentDepartment.value = params?.data?.name;
        getDepartmentChartData(params?.data?.id);
      });
    });
  }
  else {
    const chartDom = document.getElementById('main');
    if (!chartDom) return;
    const myChart = echarts.init(chartDom);
    const datasetSource = datasetSourceItem.value;

    if (!datasetSource.length) return;
    const scores = datasetSource.map(item => item.kpi);
    const minScore = Math.min(...scores);
    const maxScore = Math.max(...scores);

    const getColor = score => {
      const ratio = (score - minScore) / (maxScore - minScore);
      const green = Math.round((1 - ratio) * 255);
      let red = Math.round(ratio * 255);
      if (score > 50) {
        red = 216;
      }
      return `rgb(${green}, ${red}, 0)`;
    };

    const option = {
      dataset: {
        dimensions: ['name', 'kpi'],
        source: datasetSource,
      },
      yAxis: {
        type: 'category',
        axisLabel: {
          interval: 0, fontSize: 15, fontWeight: 'bold'
        },
      },
      xAxis: {
        type: 'value',
        max: 100,
      },
      series: {
        barWidth: 22,
        interval: 10,
        label: {
          show: true,
          fontSize: 14,
          position: 'right',
          formatter(value) {
            return `${value.value.kpi} %`;
          },
        },
        type: 'bar',
        encode: { y: 'name', x: 'kpi' },
        itemStyle: {
          color: function (params) {
            const score = params.value.kpi;
            return getColor(score);
          },
        },
      },
      tooltip: {
        show: true,
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      grid: {
        left: '10%',
        right: '5%',
        bottom: '0%',
        containLabel: true,
      },
      legend: {
        data: ['Data'],
      },
    };

    myChart.setOption(option);

    myChart.on('click', function (params) {
      currentDepartment.value = params?.data?.name;
      getDepartmentChartData(params?.data?.id);
    });
  }
};

const getDepartmentChartData = async (id) => {
  try {
    if (dataParams.value.type === 2) {
      const result = await kpiStore.getDepartmentBarData({ departmentId: id });
      departmentChartData.value = result;
      dialog.value = true;
      await nextTick();
      initializeDepartmentAnnualChart(result);
    }
  } catch (error) {
    console.log(error);
  }
};

const initializeDepartmentAnnualChart = (val) => {
  const chartDom = document.getElementById('departments-annual-chart');
  if (!chartDom) return;

  const myChart = echarts.init(chartDom);

  const months = [
    'Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'Iyun',
    'Iyul', 'Avgust', 'Sentabr', 'Oktabr', 'Noyabr', 'Dekabr'
  ];

  const filledData = months.map((month, index) => {
    const monthData = val.find(d => new Date(d.period).getMonth() === index);
    return monthData ? { period: month, originalPeriod: monthData.period, average_kpi: monthData.average_kpi } : { period: month, originalPeriod: null, average_kpi: 0 };
  });

  const kpiValues = filledData.map(item => item.average_kpi);

  const minKPI = Math.min(...kpiValues)
  const maxKPI = Math.max(...kpiValues)

  const getColor = value => {
    if (minKPI == maxKPI) {
      return 'rgb(0, 255, 0)'
    }
    const normalizedValue = (value - minKPI) / (maxKPI - minKPI)
    const green = Math.round(normalizedValue * 250)
    const red = 255 - green

    return `rgb(${red}, ${green}, 0)`
  }

  const option = {
    xAxis: {
      type: 'category',
      axisLabel: {
        fontSize: 14,
        fontWeight: 'bold',
      },
      data: filledData.map(item => item.period),
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: filledData.map(item => ({
          value: item.average_kpi,
          itemStyle: {
            color: getColor(item.average_kpi),
          },
          originalPeriod: item.originalPeriod,
        })),
        type: 'bar',
        smooth: true,
        label: {
          show: true,
          position: 'top',
          formatter: '{c}%',
          fontSize: 14,
        },
      },
    ],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
  };

  myChart.setOption(option);
};


// const initializeDepartmentAnnualChart = (val) => {
//   const chartDom = document.getElementById('departments-annual-chart');
//   if (!chartDom) return;

//   const myChart = echarts.init(chartDom);

//   const months = [
//     'Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'Iyun',
//     'Iyul', 'Avgust', 'Sentabr', 'Oktabr', 'Noyabr', 'Dekabr'
//   ];

//   const filledData = months.map((month, index) => {
//     const monthData = departmentChart.value.find(d => new Date(d.period).getMonth() === index);
//     return monthData ? { period: month, originalPeriod: monthData.period, average_kpi: monthData.average_kpi } : { period: month, originalPeriod: null, average_kpi: 0 };
//   });

//   const kpiValues = filledData.map(item => item.average_kpi);
//   const minKPI = Math.min(...val)
//   const maxKPI = Math.max(...val)

//   const getColor = value => {
//     console.log(minKPI);
//     if (minKPI == maxKPI) {
//       return 'rgb(0, 255, 0)'
//     }
//     const normalizedValue = (value - minKPI) / (maxKPI - minKPI)
//     const green = Math.round(normalizedValue * 255)
//     const red = 255 - green

//     return `rgb(${green}, ${red}, 0)`
//   }

//   const option = {
//     xAxis: {
//       type: 'category',
//       data: filledData.map(item => item.period),
//       axisLabel: {
//         fontSize: 14,
//         fontWeight: 'bold',
//       },
//     },
//     yAxis: {
//       type: 'value',
//       max: 100,
//     },
//     series: [
//       {
//         data: filledData.map(item => ({
//           value: item.average_kpi,
//           itemStyle: {
//             color: getColor(item.average_kpi),
//             normal: {
//               label: {
//                 show: true,
//                 fontSize: 10,
//               },
//             },
//           },
//           originalPeriod: item.originalPeriod
//         })),
//         type: 'bar',
//         label: {
//           show: true,
//           position: 'top',
//           fontSize: 14,
//           formatter: '{c}%',
//         },
//       },
//     ],
//     tooltip: {
//       show: true,
//       trigger: 'axis',
//       axisPointer: {
//         type: 'shadow',
//       },
//     },
//     grid: {
//       left: '3%',
//       right: '4%',
//       bottom: '3%',
//       containLabel: true,
//     },
//   };

//   myChart.setOption(option);

//   myChart.on('click', function (params) {
//     const originalPeriod = params.data.originalPeriod;
//     if (originalPeriod) {
//       getDepartmentMonthlyData(originalPeriod);
//     }
//   });
// };

const getDepartmentMonthlyData = async (period) => {
  try {
    const result = await kpiStore.getDepartmentMonthlyData({ period });
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
  getPeriodList();
});

watch(datasetSourceItem, () => {
  initializeCharts();
});

function colorify(kpiResult) {
  if (kpiResult > 85) return 'font-weight-bold text-success';
  return 'font-weight-bold text-error';
}
</script>
<style scoped>
.text-center {
  font-size: 18px;
  text-align: center;
}

.mb-2 {
  margin-block-end: 1rem;

  /* Adjust margin bottom as needed */
}

.font-weight-bold {
  font-weight: bold;

  /* Adjust font weight as needed */
}

.d-flex {
  display: flex;
}

.justify-between {
  justify-content: space-between;

}

.align-center {
  align-items: center;

}
</style>
