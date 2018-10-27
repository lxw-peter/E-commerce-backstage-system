import Vue from 'vue'
import Router from 'vue-router'
import Login from '../../views/Login'
import Home from '../../views/Home'
import Welcome from '../../views/Welcome/Welcome.vue'
import User from '../../views/User/User.vue'
import Roles from '../../views/Rights/Roles.vue'
import Rights from '../../views/Rights/Rights.vue'
import Category from '../../views/Goods/Category.vue'
import Goods from '../../views/Goods/Goods.vue'
import AddGoods from '../../views/Goods/AddGoods.vue'
import Params from '../../views/Goods/Params.vue'
import Orders from '../../views/Orders/Orders.vue'
import Reports from '../../views/Reports/Reports.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      name: 'Home',
      component: Home,
      redirect: {path: '/welcome'},
      children: [
        {
          path: 'welcome',
          name: 'Welcome',
          component: Welcome
        },
        {
          path: 'users',
          name: 'Users',
          component: User
        },
        {
          path: 'roles',
          name: 'Roles',
          component: Roles
        },
        {
          path: 'rights',
          name: 'Rights',
          component: Rights
        },
        {
          path: 'categories',
          name: 'Category',
          component: Category
        },
        {
          path: 'goods',
          name: 'Goods',
          component: Goods
        },
        {
          path: 'addGoods',
          name: 'AddGoods',
          component: AddGoods
        },
        {
          path: 'params',
          name: 'Params',
          component: Params
        },
        {
          path: 'reports',
          name: 'Reports',
          component: Reports
        },
        {
          path: 'orders',
          name: 'Orders',
          component: Orders
        }
      ]
    }
  ]
})
