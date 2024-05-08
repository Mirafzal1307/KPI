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
      title: 'Calendar',
      icon: 'ri-calendar-line',
      href: '/',
    }"
    />
  <!-- 👉 Front Pages -->

    <VerticalNavLink
      :item="{
        title: 'Landing',
        href: '/',
        icon: 'ri-file-copy-line',

      }"
    />
    <VerticalNavLink
      :item="{
        title: 'Pricing',
        href: '#',
      }"
    />
    <VerticalNavLink
      :item="{
        title: 'Payment',
        href: '#',
      }"
    />
    <VerticalNavLink
      :item="{
        title: 'Checkout',
        href: '#',
      }"
    />
    <VerticalNavLink
      :item="{
        title: 'Help Center',
        href: '#',
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
      href: '/',
      target: '_blank',
    }"
  />
  <VerticalNavLink
    :item="{
      title: 'Email',
      icon: 'ri-mail-line',
      href: '/',
    }"
  />
  <VerticalNavLink
    :item="{
      title: 'Chat',
      icon: 'ri-wechat-line',
      href: '/',
    }"
  />
  <VerticalNavLink
    :item="{
      title: 'Calendar',
      icon: 'ri-calendar-line',
      href: '/',
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
      title: 'Login',
      icon: 'ri-login-box-line',
      to: '/login',
    }"
  />
  <VerticalNavLink
    :item="{
      title: 'Register',
      icon: 'ri-user-add-line',
      to: '/register',
    }"
  />
  <VerticalNavLink
    :item="{
      title: 'Error',
      icon: 'ri-information-line',
      to: '/no-existence',
    }"
  />

  <!-- 👉 User Interface -->
  <VerticalNavSectionTitle
    :item="{
      heading: 'User Interface',
    }"
  />
  <VerticalNavLink
    :item="{
      title: 'Typography',
      icon: 'ri-text',
      to: '/typography',
    }"
  />
  <VerticalNavLink
    :item="{
      title: 'Icons',
      icon: 'ri-remixicon-line',
      to: '/icons',
    }"
  />
  <VerticalNavLink
    :item="{
      title: 'Cards',
      icon: 'ri-bar-chart-box-line',
      to: '/cards',
    }"
  />

  <!-- 👉 Forms & Tables -->
  <VerticalNavSectionTitle
    :item="{
      heading: 'Forms & Tables',
    }"
  />
  <VerticalNavLink
    :item="{
      title: 'Form Layouts',
      icon: 'ri-layout-4-line',
      to: '/form-layouts',
    }"
  />
  <VerticalNavLink
    :item="{
      title: 'Form Validation',
      icon: 'ri-checkbox-multiple-line',
      href: '/',
    }"
  />
  <VerticalNavLink
    :item="{
      title: 'Form Wizard',
      icon: 'ri-git-commit-line',
      href: '/',
    }"
  />
  <VerticalNavLink
    :item="{
      title: 'Tables',
      icon: 'ri-table-alt-line',
      to: '/tables',
    }"
  />

  <!-- 👉 Others -->
  <VerticalNavSectionTitle
    :item="{
      heading: 'Others',
    }"
  />
  <VerticalNavLink
    :item="{
      title: 'Access Control',
      icon: 'ri-shield-line',
      href: '/',
    }"
  />
  <VerticalNavLink
    :item="{
      title: 'Documentation',
      icon: 'ri-article-line',
      href: '/',
    }"
  />
  <VerticalNavLink
    :item="{
      title: 'Raise Support',
      href: '/',
      icon: 'ri-lifebuoy-line',
    }"
  />
</template>
