<template>
  <VRow class="match-height">
    <VCol cols="12" md="8">
      <div class="mb-7">

        <VCard class="border d-flex pa-8 justify-content-between ga-3">
          <div class="w-50 my-auto pr-2">
            <div class="d-flex justify-content-between mb-10">
              <img width="150px" height="150px" src="../assets/images/avatars/userImg.png" alt="img">
              <div class="d-flex flex-column ga-4">
                <h2>{{ personalData?.user_data?.full_name }}</h2>
                <h2>{{ personalData?.user_data?.position }}</h2>
              </div>
            </div>

            <div v-if="period.length">
              <VAutocomplete v-model="newPeriod" :items="period" item-title="period" item-value="id" label="Davr" />
            </div>
          </div>

          <div class="w-50 d-flex flex-column  justify-center pl-10 ">
            <div ref="indicator" class="d-flex justify-center align-center"
              :style="{ width: '450px', height: '380px' }" />
            <h4 class="text-h4">
              Filial KPI natijasi: <span style="color: red;"> {{ isNaN(personalData?.branch_kpi) ? 0 :
                formatNumberRoundDown(personalData?.branch_kpi) }} %</span>
            </h4>
            <h4 class="text-h5">
              Jami individual KPI filial natijasidan keyin: <span style="color: red;">

                {{
                  isNaN(personalData?.average_kpi) ? 0 : formatNumberRoundDown(personalData?.average_kpi) }} %</span>

            </h4>
          </div>
        </VCard>
      </div>

      <div>
        <VCard class="border d-flex justify-center align-center">
          <div ref="chart" class="d-flex justify-center align-center" :style="{ width: '100%', height: '380px' }" />
        </VCard>
      </div>
    </VCol>
    <VCol cols="12" md="4">
      <VCard class="pa-6 border">
        <h2 class="pt-4 pb-8">
          Shaxsiy ma'lumotlar
        </h2>

        <VTable>
          <thead>
            <tr>
              <th class="text-left">
                Ma'lumotlar
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <span class="font-weight-bold">
                  F.I.SH:
                </span> {{ personalData?.user_data?.full_name }}
              </td>
            </tr>
            <tr>
              <td>
                <span class="font-weight-bold">
                  Boshqarma:
                </span>{{ personalData?.user_data?.governance }}
              </td>
            </tr>
            <tr>
              <td>
                <span class="font-weight-bold">
                  Blok:
                </span>{{ personalData?.user_data?.block }}
              </td>
            </tr>
            <tr>
              <td>
                <span class="font-weight-bold">
                  Departament:
                </span>{{ personalData?.user_data?.department }}
              </td>
            </tr>
            <tr>
              <td>
                <span class="font-weight-bold">
                  Boshqarma:
                </span> {{ personalData?.user_data?.management }}
              </td>
            </tr>
            <tr>
              <td>
                <span class="font-weight-bold">
                  Lavozim:
                </span> {{ personalData?.user_data?.position }}
              </td>
            </tr>
            <tr>
              <td>
                <span class="font-weight-bold">
                  Rahbar:
                </span> {{ personalData?.user_data?.head }}
              </td>
            </tr>
            <tr>
              <td>
                <span class="font-weight-bold">
                  Tel raqami:
                </span>{{ personalData?.user_data?.phone_number }}
              </td>
            </tr>
          </tbody>
        </VTable>
      </VCard>
    </VCol>
  </VRow>
</template>

<script setup>
import { useEmployeeStore } from '@/store/employee'
import * as echarts from 'echarts'
import debounce from 'lodash/debounce'
import { storeToRefs } from 'pinia'
import { computed, onMounted, ref, watch } from 'vue'

const emit = defineEmits(['indicator'])
const useEmployee = useEmployeeStore()
const { personalData, period } = storeToRefs(useEmployee)
const { getPersonalDataByPeriod, getPeriodList } = useEmployeeStore()

const newPeriod = ref('2024-03-30')

const chart = ref(null)
const indicator = ref(null)


function formatNumberRoundDown(num) {
  return Math.floor(num * 100) / 100
}



const KPI = ref(0)



const initGaugeChart = () => {
  const myChart2 = ref(echarts.init(indicator.value))

  const option = {
    series: [
      {
        type: 'gauge',
        startAngle: 180,
        endAngle: 0,
        center: ['50%', '75%'],
        radius: '90%',
        min: 0,
        max: 1,
        splitNumber: 8,
        axisLine: {
          lineStyle: {
            width: 6,
            color: [
              [0.3, '#FF0000'],
              [0.5, '#FF7F50'],
              [0.63, '#FFD700'],
              [0.75, '#ADFF2F'],
              [1, '#008000'],
            ],
          },
        },
        pointer: {
          icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
          length: '12%',
          width: 20,
          offsetCenter: [0, '-60%'],
          itemStyle: {
            color: 'auto',
          },
        },
        axisTick: {
          length: 12,
          lineStyle: {
            color: 'auto',
            width: 2,
          },
        },
        splitLine: {
          length: 20,
          lineStyle: {
            color: 'auto',
            width: 5,
          },
        },
        axisLabel: {
          color: '#464646',
          fontSize: 20,
          distance: -60,
          rotate: 'tangential',
          formatter: function (value) {
            if (value === 0.875) {
              return "A'lo"
            } else if (value === 0.625) {
              return 'Yaxshi'
            } else if (value === 0.375) {
              return 'Qoniqarli'
            } else if (value === 0.125) {
              return ' Yomon'
            }

            return ''
          },
        },
        title: {
          offsetCenter: [0, '-10%'],
          fontSize: 20,
        },
        detail: {
          fontSize: 30,
          offsetCenter: [0, '-35%'],
          valueAnimation: true,
          formatter: function (value) {
            return Math.round(value * 100) + ''
          },
          color: 'inherit',
        },
        data: [
          {
            value: personalData.value?.average_kpi / 100,
            name: 'KPI natijasi',
          },
        ],
      },
    ],
  }

  myChart2.value.setOption(option)
}

const lineChart = () => {
  if (chart.value && personalData.value && personalData.value.kpi_compare) {
    const myChart = echarts.init(chart.value)
    const kpiCompareData = personalData.value.kpi_compare.emp_data
    const kpiValues = kpiCompareData.map(item => item.kpi) || []

    const KPIValue = kpiValues.map(item => formatNumberRoundDown(item) * 100)


    const option = {
      tooltip: {
        trigger: 'axis',
      },
      xAxis: {
        type: 'category',
        data: [
          'Yanvar',
          'Fevral',
          'Mart',
          'Aprel',
          'May',
          'Iyun',
          'Iyul',
          'Avgust',
          'Sentabr',
          'Oktabr',
          'Noyabr',
          'Dekabr',
        ],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: KPIValue,
          type: 'line',
          label: {
            show: true,
            position: 'top',
            color: 'black',
            formatter: '{c} %'
          }
        },

      ],
    }

    myChart.setOption(option)
  }
}

onMounted(async () => {
  await getPeriodList()

  await getPersonalDataByPeriod('2024-03-30')

  lineChart()

  initGaugeChart()
})

const debouncedFetchPersonalData = debounce(getPersonalDataByPeriod, 300)

watch(newPeriod, async newValue => {
  if (newValue) {
    await debouncedFetchPersonalData(newValue)
    initGaugeChart()
    lineChart()
  }
})

watch(KPI, newValue => {
  initGaugeChart()
})
</script>
