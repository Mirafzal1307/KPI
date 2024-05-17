<script setup>
import RegionFilter from '@/views/dashboard/RegionFilter.vue'
import DateCard from '@/views/dashboard/DateCard.vue'
import TeamTable from '@/views/dashboard/TeamTable.vue'
import UserInfoTable from '@/views/dashboard/UserInfoTable.vue'
import UserProfileCard from '@/views/dashboard/UserProfileCard.vue'

</script>

<template>
  <VRow class="match-height">
    <VCol
      cols="12"
      md="9"
    >

      <RegionFilter />
    </VCol>

    <VCol
      cols="12"
      md="3"
    >
      <DateCard />
    </VCol>

    <VCol cols="12" md="9" >
      <UserInfoTable />
    </VCol>
    <VCol
      cols="12"
      md="3"
    >
      <UserProfileCard />
    </VCol>
    <VCol cols="12">
      <TeamTable />
    </VCol>
  </VRow>
</template>
