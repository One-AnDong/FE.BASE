import axios from '@/utils/axios'

export function getCategory () {
  return get({
    url: '/api/getCategory'
  })
}
// 封装get请求
function get (options) {
  return axios({
    url: options.url,
    method: 'GET',
    params: options.data
  })
}
