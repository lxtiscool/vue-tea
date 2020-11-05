<template>
  <div class="container">
    <el-form @form-submit="onFormSubmit">
      <div class="mb-3">
        <label class="form-label">邮箱地址</label>
        <el-input :rules="emailRules" v-model="emailVal" placeholder="请输入邮箱地址" type="text"></el-input>
      </div>
      <div class="mb-3">
        <label class="form-label">密码</label>
        <el-input type="password" placeholder="请输入密码" :rules="passwordRules" v-model="passwordVal"></el-input>
      </div>
      <template #submit>
        <span class="btn btn-primary">
          Submit
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

export default defineComponent({
  name: 'App',
  components: {
    ElInput,
    ElForm
  },
  setup() {
    const router = useRouter()
    const emailVal = ref('hello@aa.com')
    const emailRules: RulesProp = [
      { type: 'required', message: '电子邮箱地址不能为空' },
      { type: 'email', message: '请输入正确的电子邮箱格式' }
    ]

    const passwordVal = ref('123')
    const passwordRules: RulesProp = [{ type: 'required', message: '密码不能为空' }]

    const onFormSubmit = (result: boolean) => {
      if (result) {
        router.push({ name: 'column', params: { id: 1 } })
      }
      console.log('result', result)
    }
    return {
      emailRules,
      emailVal,
      passwordVal,
      passwordRules,
      onFormSubmit
    }
  }
})
</script>
