import Vue from 'vue'
import Router from 'vue-router'
import Learning from './views/Learning'
import TodoList from './components/TodoList'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: Learning
    },
    {
      path: '/todolist',
      name: 'todolist',
      component: TodoList
    }
  ]
})
