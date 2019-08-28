import Vue from 'vue'
import Router from 'vue-router'
import Learning from './views/Learning'
import TodoList from './components/TodoList'
import Event from './components/Event'
import Info from './components/Info'
import Vmodel from './components/Vmodel'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: Learning
    },
    {
      path: '/model',
      component: Vmodel
    },
    {
      path: '/todolist',
      name: 'todolist',
      component: TodoList
    },
    {
      path: '/event',
      name: 'event',
      component: Event
    },
    {
      // path: '/category/:id?',
      path: '/category/:id',
      name: 'category',
      component: () => import('./components/Category'),
      // component: h => h('router-view'),
      children: [
        {
          path: 'info',
          name: 'info',
          component: Info
        }
      ]
    }
  ]
})
