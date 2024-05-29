<template>
  <VRow class="d-flex">
    <v-col cols="7">
      <MainChartFilter />
      <Infographics :dataset-source="datasetSource" />
      <ChildGraph :title-districts="'Samarqand'" class="mt-4" />
    </v-col>
    <v-col cols="5">
      <InfoTable />
    </v-col>
  </VRow>


</template>
<script setup>
import { useChartStore } from '@/store/chartStore';
import ChildGraph from '@/views/statistics/infoGraphics/ChildGraph.vue';
import Infographics from '@/views/statistics/infoGraphics/InfoGraphics.vue';
import InfoTable from '@/views/statistics/infoGraphics/InfoTable.vue';
import MainChartFilter from '@/views/statistics/infoGraphics/MainChartFilter.vue';
import { onMounted } from 'vue';



const datasetSource = [
  ['Samarqand', 120, 1],
  ['Toshkent', 100, 2],
  ['Navoiy', 99, 3],
  ['Sirdaryo', 110, 4],
  ['Buxoro', 87, 5],
  ['Namangan', 74, 6],
  ['Fargona', 83, 7],
  ['Andijon', 92, 8],
  ['Surxondaryo', 54, 9],
  ['Qashqadaryo', 75, 10],
  ['Xorazm', 88, 11],
  ['Qoraqalpogiston Res', 59, 12]
];

async function getChartData() {
  try {
    await chartStore.getChartData();
  } catch (error) {
    console.log(error);
  }
}


const chartStore = useChartStore()
// const getChartData = async () => {
//   try {
//     await chartStore.getChartData()
//   } catch (error) {
//     console.log(error)
//   }
// }

onMounted(() => {
  console.log('here')
})
</script>
