import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// router.beforeEach((to, from, next) => {
//   const publicPages = ['/login']

//   const authRequired = !publicPages.includes(to.path)

//   const loggedIn = localStorage.getItem('access_token')

//   if (authRequired && !loggedIn) return next('login')

//   return next()
// })

export default function (app) {
  app.use(router)
}
export { router }
