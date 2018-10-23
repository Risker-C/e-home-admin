import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const components = {
  login: () => import('@/views/login'),
  layout: () => import('@/views/layout'),
  welcome: () => import('@/views/layout/welcome'),
  adminList: () => import('@/views/adminUser/adminList'),
  addAdmin: () => import('@/views/adminUser/addAdmin'),
  editPass: () => import('@/views/adminUser/editPass'),
  addNews: () => import('@/views/news/addNews'),
  newsList: () => import('@/views/news/newsList'),
  addCategory: () => import('@/views/category/addCategory'),
  categoryList: () => import('@/views/category/categoryList'),
  updateCategory: () => import('@/views/category/updateCategory')
}

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: components.login
    },
    {
      path: '/layout',
      name: 'login',
      component: components.layout,
      redirect: 'layout/welcome',
      children: [
        {
          path: 'welcome',
          name: 'welcome',
          component: components.welcome
        },
        {
          path: 'adminList',
          name: 'adminList',
          component: components.adminList
        },
        {
          path: 'addAdmin',
          name: 'addAdmin',
          component: components.addAdmin
        },
        {
          path: 'editPass',
          name: 'editPass',
          component: components.editPass
        },
        {
          path: 'addNews',
          name: 'addNews',
          component: components.addNews
        },
        {
          path: 'newsList',
          name: 'newsList',
          component: components.newsList
        },
        {
          path: 'addCategory',
          name: 'addCategory',
          component: components.addCategory
        },
        {
          path: 'categoryList',
          name: 'categoryList',
          component: components.categoryList
        },
        {
          path: 'updateCategory',
          name: 'updateCategory',
          component: components.updateCategory
        }
      ]
    }
  ]
})
