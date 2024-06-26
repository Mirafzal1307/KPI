<script setup>
import VerticalNavLink from '@layouts/components/VerticalNavLink.vue';
</script>


<template>
  <VerticalNavLink :item="{
    title: 'Shaxsiy monitoring',
    icon: 'ri-align-item-bottom-line',
    to: '/user-profile',
    query: { id: '1' }
  }" />
  <VerticalNavLink :item="{
    title: 'Xodimlarning monitoringi',
    icon: 'ri-dashboard-line',
    to: '/dashboard',
  }" />

<VerticalNavLink :item="{
    title: 'Rahbar monitoringi',
    icon: 'ri-voiceprint-line',
    to: '/employer-profile',
  }" />

  <VerticalNavLink :item="{
    title: 'Individual natija',
    icon: 'ri-line-chart-line',
    to: '/monitoring-statistics',
  }" />

  <VerticalNavLink :item="{
    title: 'Bosh ofis statistikasi',
    icon: 'ri-bar-chart-grouped-line',
    to: '/main-office-data',
  }" />
  <VerticalNavLink :item="{
    title: 'Hududiy bo\'linma statistika',
    icon: 'ri-map-2-line',
    to: '/general-data',
  }" />


</template>
