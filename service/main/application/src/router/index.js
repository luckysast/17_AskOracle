import Vue from 'vue'
import Router from 'vue-router'
import * as Auth from '@/components/pages/Authentication'
// Pages
import Home from '@/components/pages/Home'
import Authentication from '@/components/pages/Authentication/Authentication'
import Users from '@/components/pages/Users/Users'
import Answers from '@/components/pages/Answers/Answers'

// Global components
import Header from '@/components/Header'
import QuestList from '@/components/Quest/QuestList'
import UserList from '@/components/pages/Users/UserList'

// Register components
Vue.component('app-header', Header)
Vue.component('quest-list', QuestList)
Vue.component('user-list', UserList)

Vue.use(Router)
const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      components: {
        default: Home,
        header: Header,
        questList: QuestList
      },
      meta: {
        requiredAuth: true
      }
    },
    {
      path: '/login',
      name: 'Authentication',
      component: Authentication
    },
    {
      path: '/users',
      name: 'Users',
      component: Users
    },
    {
      path: '/answers',
      name: 'Answers',
      components: {
        default: Answers,
        questList: QuestList
      }
    }
  ]
})
router.beforeEach((to, from, next) => {
  if (to.path !== '/login') {
    if (Auth.default.user.authenticated) {
      next()
    } else {
      router.push('/login')
    }
  } else {
    next()
  }
})
export default router
