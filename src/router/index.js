import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Appindex from '@/components/main/Appindex'
import BudgetFrom from '@/components/main/BudgetFrom'
import DataTable from '@/components/main/DataTable'
import Curve from '@/components/main/Curve'
import PieChart from '@/components/main/PieChart'
import UserTable from '@/components/main/user/UserTable'
import RegisterUser from '@/components/RegisterUser'
import Userindex from '../components/OrdinaryUser/Userindex'
import RootLogin from '@/components/RootLogin'
import OrdinaryTable from '../components/OrdinaryUser/OrdinaryDataTable'
import OfficeFreeTable from '../components/OrdinaryUser/Office/OfficeExpensesDataTable'
import LaboratoryTable from '../components/OrdinaryUser/LaboratoryFeeForm/Table'
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: '登录',
      hidden: true,
      component: Login
    },
    {
      path: '/userindex',
      component: Userindex,
      name: '主页面',
      meta:{
        requireAuth: true
      },
      children: [
        {
          path:'/ordinarytable',
          component:OrdinaryTable
        },
        {
          path:'/officeFreeTable',
          component:OfficeFreeTable
        },
        {
          path:'/laboratory',
          component:LaboratoryTable
        }
        ]
    },
    {
      path: '/index',
      component: Appindex,
      name: '主页面',
      meta:{
        requireAuth: true
      },
      children: [
        {
          path:'/budgetfrom',
          component:BudgetFrom
        },
        {
          path:'/datatable',
          component:DataTable

        },
        {
          path:'/curve',
          component:Curve
        },
        {
          path:'/pie',
          component:PieChart
        },
        {
          path:'/usertable',
          component:UserTable
        }
      ]
    },
    {
      path:'/registeruser',
      component:RegisterUser
    },
    {
      path:'/rootlogin',
      component:RootLogin
    }


  ]
});



export default router


router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
    if (sessionStorage.getItem("token") == 'true') { // 判断本地是否存在token
      next()
    } else {
      // 未登录,跳转到登陆页面
      next({
        path: '/'
      })
    }
  } else {
    if(sessionStorage.getItem("token") == 'true'){
      console.log("普通认证是否进入:"+sessionStorage.getItem("token"))
      next();
    }else{
      next();
    }
  }
});

