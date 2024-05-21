<template>
  <DefaultLayoutWithVerticalNav>
    <v-col cols="12 mx-auto mt-4">
      <v-card class="border">
        <v-col cols="12" class="text-center text-h2">
          <span class="font-weight-black">Monitoring</span>
        </v-col>
        <v-row class="flex justify-center mb-4">
          <v-col cols="2">
            <v-autocomplete label="Viloyat"
              :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']" class="mt-4" />
          </v-col>
          <v-col cols="2">
            <v-autocomplete label="Filial/BXM/BXO"
              :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']" class="mt-4" />
          </v-col>
          <v-col cols="2">
            <v-autocomplete label="Bo'lim" :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
              class="mt-4" />
          </v-col>
          <v-col cols="2">
            <v-autocomplete label="Xodim" :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
              class="mt-4" />
          </v-col>
          <v-col cols="2">
            <v-autocomplete label="Ko'rsatkich"
              :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']" class="mt-4" />
          </v-col>
        </v-row>
        <v-card-actions>
          <div id="chart" style="block-size: 400px; inline-size: 100%" class="mx-auto"></div>
        </v-card-actions>
      </v-card>
    </v-col>
  </DefaultLayoutWithVerticalNav>
</template>

<script setup>
import DefaultLayoutWithVerticalNav from '@/layouts/components/DefaultLayoutWithVerticalNav.vue';
import * as echarts from 'echarts';
import { onMounted } from 'vue';

const option = onMounted(() => {
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
