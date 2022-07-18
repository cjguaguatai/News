import request from '@/uilts/request'
// 获取我的列表
export const getMyChannels = () => {
  return request({
    url: '/v1_0/user/channels'
  })
}
// 获取所有的列表
export const getAllChannels = () => {
  return request({
    url: '/v1_0/channels'
  })
}
