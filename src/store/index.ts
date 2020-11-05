import { createStore } from 'vuex'
import { columnsList, postList } from '@/mock/index.ts'
import { fetchCurrentUser } from '@/api/user'

interface ListProps<P> {
  [id: string]: P
}

export interface ImageProps {
  id?: string
  url?: string
  createdAt?: string
  fitUrl?: string
}

export interface PostProps {
  id?: string | number
  title: string
  excerpt?: string
  content?: string
  image?: ImageProps | string
  createdAt?: string
  column: string
  author?: string | UserProps
  isHTML?: boolean
}

export interface ColumnProps {
  id: number
  title: string
  avatar?: ImageProps | string
  description: string
}

export interface GlobalDataProps {
  columns: { data: Array<ColumnProps>; currentPage: number; total: number }
  posts: { data: Array<PostProps>; loadedColumns: string[] }
  user: UserProps
  token: string
}

export interface ResponseType<P = {}> {
  code: number
  msg: string
  data: P
}
export interface UserProps {
  isLogin: boolean
  name?: string
  id?: string
  column?: string
  username?: string
  avatar?: string
  description?: string
}

const store = createStore<GlobalDataProps>({
  state: {
    columns: { data: columnsList, currentPage: 0, total: 0 },
    posts: { data: postList, loadedColumns: [] },
    user: { isLogin: false },
    token: ''
  },
  mutations: {
    login(state, data) {
      state.user = { isLogin: false, ...data }
    },
    setColumns(state) {
      state.columns.data = columnsList
    },
    fetchCurrentUser(state, userInfo) {
      state.user = {
        isLogin: true,
        column: '5f98de909c7ab1263bab9129',
        username: userInfo.userName,
        name: userInfo.nickName,
        id: '5f98de909c7ab1263bab9128'
      }
    },
    logout(state) {
      state.user = {
        isLogin: false,
        column: '',
        username: '',
        name: '',
        id: ''
      }
    }
  },
  actions: {
    async fetchCurrentUser({ commit }) {
      const { userInfo } = await fetchCurrentUser()
      commit('fetchCurrentUser', userInfo)
    }
  },
  getters: {
    getColumns: state => {
      return state.columns
    },
    biggerColumnsLen(state) {
      return state.columns.data.filter(c => c.id > 2).length
    },
    getColumnById: state => (id: number) => {
      return state.columns.data.find(c => c.id === id)
    },
    getCurrentPost: state => (id: string) => {
      return state.posts.data[Number(id)]
    }
    // getPostsByCid: state => (cid: number) => {
    //   return state.posts.filter(post => post.id === cid)
    // }
  }
})

export default store
