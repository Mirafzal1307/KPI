export const routes = [
  { path: '/', redirect: '/dashboard' },
  {
    path: '/',
    // name: 'home',
    component: () => import('@/layouts/default.vue'),
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('@/pages/dashboard.vue'),
      },
      {
        path:'kpi-indicator',
        component: () => import('@/pages/kpi/kpi-indicator.vue')
      },{
        path:'kpi-indicator-details',
        component: () => import('@/pages/kpi/kpi-indicator-details.vue')
      },
      {
        path: 'account-settings',
        component: () => import('@/pages/account-settings.vue'),
      },
      {
        path: 'user-profile',
        name: 'user-profile',
        component: () => import('@/pages/user-profile.vue'),
      },
    ],
  },
  {
    path: '/',
    component: () => import('@/layouts/blank.vue'),
    children: [
      {
        path: 'login',
        component: () => import('@/pages/login.vue'),
      },

      {
        path: '/:pathMatch(.*)*',
        component: () => import('@/pages/[...error].vue'),
      },
    ],
  },
  {
    path: '/',
    component: () => import('@/layouts/default.vue'),
    children: [
      {
        path: 'monitoring-statistics',
        component: () => import('@/views/statistics/KpiMonitoring.vue'),
      },
    ],
  },
  {
    path: '/',
    component: () => import('@/layouts/default.vue'),
    children: [
      {
        path: 'info-graphics',
        component: () => import('@/views/statistics/infoGraphics/MainGraph.vue'),
      },
    ],
  },
]
