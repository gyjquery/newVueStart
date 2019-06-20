import axios from 'axios'
// var qs = require('qs')
import cookie from 'js-cookie'
import Vue from 'vue'
axios.interceptors.request.use(
  config => {
    let token = cookie.get('token')
    if (token) {
      config.headers = {
        'X-AUTH-TOKEN': token
      }
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
axios.interceptors.response.use(
  res => {
    return Promise.resolve(res)
  },
  error => {
    switch (error.response.status) {
      case 401:
      case 403:
        cookie.remove('token')
        cookie.remove('username')
        cookie.remove('personType')
        window.location.href = '/login'
        break
      default:
        console.error(error)
        Vue.prototype.$message.error('接口异常')
    }
    return Promise.reject(error)
  }
)

export const login = (params = {}) => {
  return axios.post('/rest/rest/tokens', params, {
    headers: { 'Content-Type': 'application/json' }
  })
}

// 查看统计结果
export const statisticalResults = (params = {}) => {
  return axios.post('/rest/rest/estimateController/selectEstimate', params)
}
// 一键生成用户名密码
export const oneTouch = (params = {}) => {
  return axios.get('/rest/rest/tSUserIssueTaskController/saveOrUpdatefxpjrw', {
    params
  })
}
// 查看问题以及处理人
export const getQuestionUser = id => {
  return axios.get(`/rest/rest/scoreController/question/${id}/users.do`)
}
