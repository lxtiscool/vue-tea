<template>
  <div class="create-post-page">
    <h4>{{ isEditMode ? '编辑文章' : '新建文章' }}</h4>
    <el-form @form-submit="onFormSubmit">
      <div class="mb-3">
        <label class="form-label">文章标题：</label>
        <el-input :rules="titleRules" v-model="titleVal" placeholder="请输入文章标题" type="text" />
      </div>
      <div class="mb-3">
        <label class="form-label">文章详情：</label>
        <el-input :rules="contentRules" rows="10" tag="textarea" placeholder="请输入文章详情" v-model="contentVal" />
      </div>
      <template #submit>
        <button class="btn btn-primary btn-large">{{ isEditMode ? '更新文章' : '发表文章' }}</button>
      </template>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import { PostProps } from '@/store'
import ElInput from '@/components/form/Input.vue'
import ElForm from '@/components/form/ElForm.vue'
import createMessage from '@/components/message/createMessage'
import { updatePost, createPost, fetchPost } from '@/api'
interface RuleProp {
  type: 'required' | 'email' | 'custom'
  message: string
  validator?: () => boolean
}
export type RulesProp = RuleProp[]
export default defineComponent({
  name: 'Login',
  components: {
    ElInput,
    ElForm
  },
  setup() {
    const router = useRouter()
    const route = useRoute()
    const store = useStore()
    const titleVal = ref('')
    const titleRules: RulesProp = [{ type: 'required', message: '文章标题不能为空' }]
    const isEditMode = !!route.query.id

    const contentVal = ref('')
    const contentRules: RulesProp = [{ type: 'required', message: '文章详情不能为空' }]
    onMounted(() => {
      console.log(isEditMode, 'onMounted')
      if (isEditMode) {
        const data = fetchPost(route.query.id + '')
        titleVal.value = data.title
        contentVal.value = data.excerpt || ''
        console.log(titleVal)
      }
    })
    const onFormSubmit = (result: boolean) => {
      if (result) {
        const { column, id } = store.state.user
        if (column) {
          const newPost: PostProps = {
            title: titleVal.value,
            content: contentVal.value,
            author: id,
            column
          }

          // const actionName = isEditMode ? 'updatePost' : 'createPost'
          const sendData = isEditMode
            ? {
                id: route.query.id,
                payload: newPost
              }
            : newPost

          const data = isEditMode ? updatePost(sendData) : createPost(sendData)

          console.log(data)

          createMessage('发表成功，2秒后跳转到文章', 'success', 2000)
          setTimeout(() => {
            router.push({ name: 'column', params: { id: column } })
          }, 2000)
        }
      }
    }
    return {
      titleVal,
      contentVal,
      titleRules,
      contentRules,
      onFormSubmit,
      isEditMode
    }
  }
})
</script>
<style>
.create-post-page .file-upload-container {
  height: 200px;
  cursor: pointer;
  overflow: hidden;
}
.create-post-page .file-upload-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.uploaded-area {
  position: relative;
}
.uploaded-area:hover h3 {
  display: block;
}
.uploaded-area h3 {
  display: none;
  position: absolute;
  color: #999;
  text-align: center;
  width: 100%;
  top: 50%;
}
</style>
