<script setup>
import VerticalNavSectionTitle from '@/@layouts/components/VerticalNavSectionTitle.vue'
import VerticalNavLink from '@layouts/components/VerticalNavLink.vue'
</script>

<template>
  <!-- 👉 Dashboards -->

  <VerticalNavSectionTitle
    :item="{
      heading: 'Dashboards',
    }"
  />
  <VerticalNavLink
    :item="{
      title: 'Asosiy',
      icon: 'ri-mail-line',
      to: '/dashboard',
    }"
  />

  <!-- thumb -> KPI  -->
  <VerticalNavSectionTitle
    :item="{
      heading: 'KPI',
    }"
  />

  <VerticalNavLink
    :item="{
      title: 'KPI ko\'rsatkichlari',
      icon: 'ri-mail-line',
      to: '/kpi-indicator',
    }"
  />

  <!-- 👉 Apps & Pages -->
  <VerticalNavSectionTitle
    :item="{
      heading: 'Apps & Pages',
    }"
  />
  <VerticalNavLink
    :item="{
      title: 'Permissions',
      icon: 'ri-lock-2-line',
      to: '/',
      target: '_blank',
    }"
  />
  <VerticalNavLink
    :item="{
      title: 'Email',
      icon: 'ri-mail-line',
      to: '/',
    }"
  />
  <VerticalNavLink
    :item="{
      title: 'Monitoring Statisatikasi',
      icon: 'ri-mail-line',
      to: '/monitoring-statistics',
    }"
  />
  <VerticalNavLink
    :item="{
      title: 'Chat',
      icon: 'ri-wechat-line',
      to: '/',
    }"
  />
  <VerticalNavLink
    :item="{
      title: 'Calendar',
      icon: 'ri-calendar-line',
      to: '/',
    }"
  />

  <VerticalNavLink
    :item="{
      title: 'Account Settings',
      icon: 'ri-user-settings-line',
      to: '/account-settings',
    }"
  />
  <VerticalNavLink
    :item="{
      title: 'Error',
      icon: 'ri-information-line',
      to: '/no-existence',
    }"
  />
</template>
