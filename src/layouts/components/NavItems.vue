<script setup>
import VerticalNavSectionTitle from '@/@layouts/components/VerticalNavSectionTitle.vue';
import VerticalNavLink from '@layouts/components/VerticalNavLink.vue';
</script>

<template>
  <!-- 👉 Dashboards -->

  <VerticalNavSectionTitle :item="{
    heading: 'Dashboards',
  }" />
  <VerticalNavLink :item="{
    title: 'Dashboards',
    icon: 'ri-dashboard-line',
    to: '/dashboard',
  }" />

  <!-- thumb -> KPI  -->
  <VerticalNavSectionTitle :item="{
    heading: 'KPI',
  }" />

  <VerticalNavLink :item="{
    title: 'KPI ko\'rsatkichlari',
    icon: 'ri-bar-chart-2-line',
    to: '/kpi-indicator',
  }" />

<VerticalNavLink :item="{
    title: 'KPI hisob-kitobi',
    icon: 'ri-file-copy-2-line',
    to: '/kpi-indicator-details',
  }" />


  <!-- 👉 Apps & Pages -->
  <VerticalNavSectionTitle :item="{
    heading: 'Apps & Pages',
  }" />

  <VerticalNavLink :item="{
    title: 'Monitoring Statisatikasi',
    icon: 'ri-datamoney-dollar-box-line',
    to: '/monitoring-statistics',
  }" />

  <VerticalNavLink :item="{
    title: 'Infographics',
    icon: 'ri-mail-line',
    to: '/info-graphics',
  }" />

  <VerticalNavLink :item="{
    title: 'Account Settings',
    icon: 'ri-user-settings-line',
    to: '/account-settings',
  }" />

</template>
