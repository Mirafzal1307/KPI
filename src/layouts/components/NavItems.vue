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
  <!-- 👉 Struktura  -->
  <VerticalNavSectionTitle :item="{
    heading: 'Struktura',
  }" />

  <VerticalNavLink :item="{
    title: 'Filial',
    icon: 'ri-bar-chart-2-line',
    to: '/branch',
  }" />

  <VerticalNavLink :item="{
    title: 'Blok',
    icon: 'ri-bar-chart-2-line',
    to: '/block',
  }" />

  <VerticalNavLink :item="{
    title: 'Departament',
    icon: 'ri-bar-chart-2-line',
    to: '/department',
  }" />

  <VerticalNavLink :item="{
    title: 'Boshqarma',
    icon: 'ri-bar-chart-2-line',
    to: '/management',
  }" />

  <VerticalNavLink :item="{
    title: 'Bo\'lim',
    icon: 'ri-bar-chart-2-line',
    to: '/section',
  }" />

  <!-- 👉  Employees  -->
  <VerticalNavSectionTitle :item="{
    heading: 'Xodimlar',
  }" />

  <VerticalNavLink :item="{
    title: 'Xodimlar ro\'yxati',
    icon: 'ri-bar-chart-2-line',
    to: '/employee-list',
  }" />

  <VerticalNavLink :item="{
    title: 'Lavozimlar',
    icon: 'ri-bar-chart-2-line',
    to: '/positions',
  }" />

  <!-- 👉  KPI  -->
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
    icon: 'ri-line-chart-line',
    to: '/monitoring-statistics',
  }" />

  <VerticalNavLink :item="{
    title: 'Infographics',
    icon: 'ri-bar-chart-grouped-line',
    to: '/info-graphics',
  }" />

  <VerticalNavLink :item="{
    title: 'Account Settings',
    icon: 'ri-user-settings-line',
    to: '/account-settings',
  }" />

</template>
