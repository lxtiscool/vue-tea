<template>
  <div class="signup-page mx-auto p-3 w-330">
    <h5 class="my-4 text-center">注册</h5>
    <el-form @form-submit="onFormSubmit">
      <div class="mb-3">
        <label class="form-label">账号</label>
        <el-input :rules="usernameRules" v-model="formData.username" placeholder="请输入账号" type="text" />
      </div>
      <div class="mb-3">
        <label class="form-label">昵称</label>
        <el-input :rules="nameRules" v-model="formData.nickName" placeholder="请输入昵称" type="text" />
      </div>
      <div class="mb-3">
        <label class="form-label">密码</label>
        <el-input type="password" placeholder="请输入密码" :rules="passwordRules" v-model="formData.password" />
      </div>
      <div class="mb-3">
        <label class="form-label">重复密码</label>
        <el-input
          type="password"
          placeholder="请再次密码"
          :rules="repeatPasswordRules"
          v-model="formData.repeatPassword"
        />
      </div>
      <template #submit>
        <button type="submit" class="btn btn-primary btn-block btn-large">注册新用户</button>
      </template>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { useRouter } from 'vue-router'
import ElInput, { RulesProp } from '@/components/form/Input.vue'
import ElForm from '@/components/form/ElForm.vue'
import createMessage from '@/components/message/createMessage'
import { register } from '@/api/user.ts'

export default defineComponent({
  name: 'Register',
  components: {
    ElInput,
    ElForm
  },
  setup() {
    const formData = reactive({
      username: '',
      nickName: '',
      password: '',
      repeatPassword: ''
    })
    const router = useRouter()
    const usernameRules: RulesProp = [{ type: 'required', message: '账号不能为空' }]
    const nameRules: RulesProp = [{ type: 'required', message: '昵称不能为空' }]
    const passwordRules: RulesProp = [{ type: 'required', message: '密码不能为空' }]
    const repeatPasswordRules: RulesProp = [
      { type: 'required', message: '重复密码不能为空' },
      {
        type: 'custom',
        validator: () => {
          return formData.password === formData.repeatPassword
        },
        message: '密码不相同'
      }
    ]
    const onFormSubmit = async (result: boolean) => {
      if (result) {
        const payload = {
          userName: formData.username,
          password: formData.password,
          nickName: formData.nickName
        }
        await register(payload)
        createMessage('注册成功 正在跳转登录页面', 'success')
        setTimeout(() => {
          router.push('/login')
        }, 2000)
      }
    }
    return {
      usernameRules,
      nameRules,
      passwordRules,
      repeatPasswordRules,
      onFormSubmit,
      formData
    }
  }
})
</script>

<style>
.w-330 {
  max-width: 330px;
}
</style>
