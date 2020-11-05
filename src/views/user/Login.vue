<template>
  <div class="signup-page mx-auto p-3 w-330">
    <h5 class="my-4 text-center">登录</h5>
    <el-form @form-submit="onFormSubmit">
      <div class="mb-3">
        <label class="form-label">账号</label>
        <el-input :rules="usernameRules" v-model="usernameVal" placeholder="请输入账号" type="text"></el-input>
      </div>
      <div class="mb-3">
        <label class="form-label">密码</label>
        <el-input type="password" placeholder="请输入密码" :rules="passwordRules" v-model="passwordVal"></el-input>
      </div>
      <template #submit>
        <span class="btn btn-primary">
          登录
        </span>
      </template>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import ElInput, { RulesProp } from '@/components/form/Input.vue'
import ElForm from '@/components/form/ElForm.vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { login } from '@/api/user.ts'

export default defineComponent({
  name: 'App',
  components: {
    ElInput,
    ElForm
  },
  setup() {
    const store = useStore()
    const router = useRouter()
    const usernameVal = ref('')
    const usernameRules: RulesProp = [{ type: 'required', message: '账号不能为空' }]

    const passwordVal = ref('')
    const passwordRules: RulesProp = [{ type: 'required', message: '密码不能为空' }]

    const onFormSubmit = async (result: boolean) => {
      if (result) {
        const { data } = await login({
          userName: usernameVal.value,
          password: passwordVal.value
        })
        localStorage.setItem('token', data.token)
        store.commit('login', {
          username: data.data.userName,
          column: '5f98de909c7ab1263bab9129',
          name: data.data.nickName,
          id: '5f3e86d62c56ee13bb830961'
        })
        router.push('/')
      }
      console.log('result', result)
    }
    return {
      usernameRules,
      usernameVal,
      passwordVal,
      passwordRules,
      onFormSubmit
    }
  }
})
</script>

<style>
.w-330 {
  max-width: 330px;
}
</style>
