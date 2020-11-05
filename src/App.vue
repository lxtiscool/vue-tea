<template>
  <div class="container">
    <global-header :user="currentUser" />
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import GlobalHeader from '@/components/GlobalHeader.vue'
import { useStore } from 'vuex'
import { GlobalDataProps } from '@/store'

export default defineComponent({
  name: 'App',
  components: {
    GlobalHeader
  },
  setup() {
    const store = useStore<GlobalDataProps>()
    const currentUser = computed(() => store.state.user)
    return {
      currentUser
    }
  }
})
</script>
