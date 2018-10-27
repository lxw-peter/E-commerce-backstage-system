import axios from 'axios'

const baseURL = 'http://111.231.234.250:8888/api/private/v1/'
axios.defaults.baseURL = baseURL

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 将 token 给到一个前后台约定好的key中，作为请求发送
  let token = localStorage.getItem('mytoken')
  if (token) {
    config.headers['Authorization'] = token
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

// 登陆验证
export const checkUser = params => {
  return axios.post('login', params).then(res => res.data)
}
// 获取用户列表
export const getUserList = params => {
  return axios.get('users', params).then(res => res.data)
}
// 修改用户状态
export const changeUserState = params => {
  return axios.put(`users/${params.uid}/state/${params.type}`, params).then(res => res.data)
}
// 添加用户
export const addUser = params => {
  return axios.post('users', params).then(res => res.data)
}
// 根据用户id获取信息
export const getUserById = params => {
  return axios.get(`users/${params}`, params).then(res => res.data)
}
// 编辑用户信息
export const editUser = params => {
  return axios.put(`users/${params.id}`, params).then(res => res.data)
}
// 删除用户信息
export const deleteUser = params => {
  return axios.delete(`users/${params}`).then(res => res.data)
}
// 获取用户角色信息
export const getRoleList = params => {
  return axios.get('roles').then(res => res.data)
}
// 分配用户角色
export const grantUserRole = params => {
  return axios.put(`users/${params.id}/role`, {id: params.id, rid: params.rid}).then(res => res.data)
}
// 获取用户权限列表
export const getRightList = params => {
  return axios.get(`rights/${params.type}`).then(res => res.data)
}
// 删除用户角色权限
export const deleteRoleRight = params => {
  return axios.delete(`roles/${params.roleId}/rights/${params.rightId}`).then(res => res.data)
}
// 分配角色权限
export const grantRoleRight = (roleId, rids) => {
  return axios.post(`roles/${roleId}/rights`, rids).then(res => res.data)
}
// 左侧菜单权限
export const menusRight = () => {
  return axios.get('menus').then(res => res.data)
}
// 获取商品分类列表
export const getCategories = (params) => {
  return axios.get('categories', {params: params}).then(res => res.data)
}
// 添加分类
export const addCategories = params => {
  return axios.post('categories', params).then(res => res.data)
}
// 获取商品列表
export const getGoodsList = params => {
  return axios.get('goods', params).then(res => res.data)
}
// 获取订单列表
export const getOrderList = params => {
  return axios.get('orders', params).then(res => res.data)
}
// 数据统计
export const statistics = params => {
  return axios.get(`reports/type/${params}`).then(res => res.data)
}
