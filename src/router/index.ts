import { createRouter, createWebHistory } from 'vue-router'
import Form from '@/views/Form.vue'
import Login from '@/views/user/Login.vue'
import Register from '@/views/user/Register.vue'
import Home from '@/views/Home.vue'
import ColumnDetail from '@/views/ColumnDetail.vue'
import CreatePost from '@/views/CreatePost.vue'
import PostDetail from '@/views/PostDetail.vue'
import VueDemo from '@/views/vue/index.vue'
import store from '@/store'

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/form', name: 'form', component: Form },
  { path: '/columnDetail/:id', name: 'columnDetail', component: ColumnDetail },
  { path: '/create', name: 'create', component: CreatePost, meta: { requiredLogin: true } },
  { path: '/login', name: 'login', component: Login, meta: { redirectAlreadyLogin: true } },
  { path: '/register', name: 'register', component: Register, meta: { redirectAlreadyLogin: true } },
  {
    path: '/posts/:id',
    name: 'post',
    component: PostDetail
  },
  {
    path: '/vueDemo',
    name: 'vueDemo',
    component: VueDemo,
    meta: { redirectAlreadyLogin: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const { user } = store.state
  const { requiredLogin, redirectAlreadyLogin } = to.meta
  if (!user.isLogin) {
    if (localStorage.getItem('token')) {
      store.dispatch('fetchCurrentUser').then(() => {
        if (redirectAlreadyLogin) {
          next('/')
        } else {
          next()
        }
      }).catch(e => {
        console.error(e)
        store.commit('logout')
        next('login')
      })
    } else {
      if (requiredLogin) {
        next('login')
      } else {
        next()
      }
    }
  } else {
    if (redirectAlreadyLogin) {
      next('/')
    } else {
      next()
    }
  }
})

export default router
