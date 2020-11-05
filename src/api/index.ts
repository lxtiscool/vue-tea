import { columns, postList, post } from '@/mock/index.ts'

export function fetchCsolumns() {
  return columns
}

export function fetchPostList() {
  return postList
}

export function fetchPost(id: string) {
  return post
}

export function updatePost(data: {}) {
  return { code: 0 }
}

export function createPost(data: {}) {
  return { code: 0 }
}
