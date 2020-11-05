import request from '@/utils/request.ts'

export function register(data: any) {
  return request({
    url: '/api/users/register',
    method: 'POST',
    data
  })
}

export function login(data: any) {
  return request({
    url: '/api/users/login',
    method: 'POST',
    data
  })
}

export function fetchCurrentUser(): any {
  return request({
    url: '/api/users/getUserInfo',
    method: 'GET'
  })
}

export function logout() {
  return request({
    url: '/api/users/logout',
    method: 'POST'
  })
}
