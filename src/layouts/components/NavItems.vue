<script setup>
import VerticalNavGroup from '@/@layouts/components/VerticalNavGroup.vue';
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
  <!-- <VerticalNavSectionTitle :item="{
    heading: 'Struktura',
  }" />

  <VerticalNavGroup :item="{
    title: 'Struktura',
    icon: 'ri-bar-chart-2-line',
  }"> -->
  <!-- <VerticalNavLink :item="{
      title: 'Filial',
      icon: 'ri-bar-chart-2-line',
      to: '/branch',
    }" />

    <VerticalNavLink :item="{
      title: 'Blok',
      icon: 'ri-bar-chart-2-line',
      to: '/block',
    }" /> -->

  <!-- <VerticalNavLink :item="{
      title: 'Departament',
      icon: 'ri-bar-chart-2-line',
      to: '/department',
    }" />

    <VerticalNavLink :item="{
      title: 'Boshqarma',
      icon: 'ri-bar-chart-2-line',
      to: '/menagment',
    }" />

    <VerticalNavLink :item="{
      title: 'Bo\'lim',
      icon: 'ri-bar-chart-2-line',
      to: '/section',
    }" /> -->

  <!-- </VerticalNavGroup> -->




  <!-- 👉  Employees  -->
  <!-- <VerticalNavSectionTitle :item="{
    heading: 'Xodimlar',
  }" /> -->


  <!-- <VerticalNavLink :item="{
    title: 'Foydalanuvchilar ro\'yxati',
    icon: 'ri-user-3-line',
    to: '/user-list',
  }" /> -->

  <!-- <VerticalNavLink :item="{
    title: 'Lavozimlar',
    icon: 'ri-bar-chart-2-line',
    to: '/positions-list',
  }" /> -->

  <!-- 👉  KPI 
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
  }" /> -->


  <!-- 👉 Apps & Pages -->
  <VerticalNavSectionTitle :item="{
    heading: 'Apps & Pages',
  }" />

  <!-- <VerticalNavLink :item="{
    title: 'Monitoring Statisatikasi',
    icon: 'ri-line-chart-line',
    to: '/monitoring-statistics',
  }" /> -->



  <VerticalNavGroup :item="{
    title: 'Info Grafika',
    icon: 'ri-bar-chart-2-line',
  }">
    <VerticalNavLink :item="{
      title: 'Umumiy statistika',
      icon: 'ri-bar-chart-grouped-line',
      to: '/general-data',
    }" />
    <VerticalNavLink :item="{
      title: 'Bosh ofis statistikasi',
      icon: 'ri-bar-chart-grouped-line',
      to: '/main-office-data',
    }" />

  </VerticalNavGroup>
  <!-- 
  <VerticalNavLink :item="{
    title: 'Account Settings',
    icon: 'ri-user-settings-line',
    to: '/account-settings',
  }" /> -->

</template>
