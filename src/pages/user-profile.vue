<template>
  <VRow class="match-height">
    <VCol
      cols="12"
      md="8"
    >
      <Indicator />
      <Chart />

    </VCol>
    <VCol
      cols="12"
      md="4"
    >
      <InfoTable/>
    </VCol>
  </VRow>
</template>

<script setup>
import Chart from '@/views/pages/user-profile/Chart.vue'
import Indicator from '@/views/pages/user-profile/Indicator.vue'
import InfoTable from '@/views/pages/user-profile/InfoTable.vue'
</script>

<!-- <style lang="scss" scoped>

</style> -->
