<template>
  <nav class="navbar navbar-dark bg-primary justify-content-between mb-4 px-4">
    <a class="navbar-brand" href="#">LOGO</a>
    <ul v-if="!user.isLogin" class="list-inline mb-0">
      <li class="list-inline-item"><router-link to="/login" class="btn btn-outline-light my-2">登陆</router-link></li>
      <li class="list-inline-item">
        <router-link to="/register" class="btn btn-outline-light my-2">注册</router-link>
      </li>
    </ul>
    <ul v-else class="list-inline mb-0">
      <li class="list-inline-item">
        <dropdown :title="`你好 ${user.name}`">
          <dropdown-item><a href="" class="dropdown-item">新建文章</a></dropdown-item>
          <dropdown-item><a href="javascript:;" class="dropdown-item">新建资料</a></dropdown-item>
          <dropdown-item><a @click="onLogout" href="javascript:;" class="dropdown-item">退出登录</a></dropdown-item>
        </dropdown>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import Dropdown from '@/components/dropdown/index.vue'
import DropdownItem from '@/components/dropdown/DropdownItem.vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { logout } from '@/api/user'
export interface UserProps {
  isLogin: boolean
  name?: string
  id?: number
}
export default defineComponent({
  name: 'GlobalHeader',
  components: {
    Dropdown,
    DropdownItem
  },
  props: {
    user: {
      type: Object as PropType<UserProps>,
      required: true
    }
  },
  setup() {
    const router = useRouter()
    const store = useStore()

    const onLogout = async () => {
      await logout()
      store.commit('logout')
      localStorage.removeItem('token')
      router.replace('/login')
    }
    return {
      onLogout
    }
  }
})
</script>
