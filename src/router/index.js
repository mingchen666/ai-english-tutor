// router/index.js
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/pages/HomePage.vue')
  },
  {
    path: '/settings',
    component: () => import('@/views/pages/SettingPage.vue')
  },
  {
    path: '/english',
    redirect: '/english/translate',
    children: [
      {
        path: 'translate',
        component: () => import('@/views/pages/TranslatePage.vue')
      },
      {
        path: 'write',
        component: () => import('@/views/pages/WritePage.vue')
      },
      {
        path: 'correct',
        component: () => import('@/views/pages/CorrectPage.vue')
      }
    ]
  },
  { path: '/cs', component: () => import('@/views/cs/ParentCom.vue') },
  {
    path: '/404',
    name: 'NotFound',
    component: () => import('@/views/pages/NotFound.vue')
  },
  //404页面配置
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: () => import('@/views/pages/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
