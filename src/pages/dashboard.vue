<script setup>
import RegionFilter from '@/views/dashboard/RegionFilter.vue'
import DateCard from '@/views/dashboard/DateCard.vue'
import TeamTable from '@/views/dashboard/TeamTable.vue'
import UserInfoTable from '@/views/dashboard/UserInfoTable.vue'
import AnalyticsTotalEarning from '@/views/dashboard/AnalyticsTotalEarning.vue'

</script>

<template>
  <VRow class="match-height">
    <VCol
      cols="12"
      md="8"
    >

      <RegionFilter />
    </VCol>

    <VCol
      cols="12"
      md="4"
    >
      <DateCard />
    </VCol>

    <VCol cols="12" md="8" >
      <UserInfoTable />
    </VCol>
    <VCol
      cols="12"
      md="4"
    >
      <AnalyticsTotalEarning />
    </VCol>
    <VCol cols="12">
      <TeamTable />
    </VCol>
  </VRow>
</template>
