import request from '@/uilts/request'
import storage from '@/uilts/storage'
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
/**
 * @return Promise
 * 删除用户频道
 * @param {String|Number} target 删除用户频道id
 */
export const delMyChannel = (target) =>
  request({
    url: `v1_0/user/channels/${target}`,
    method: 'delete'
  })
/**
 * 添加我的频道
 * @param {Number} id
 * @param {Number} sql
 * @returns Promise
 */
export const addMyChannel = (id, sql) => {
  return request({
    url: '/v1_0/user/channels',
    data: {
      channels: [{ id, sql }]
    },
    method: 'PATCH'
  })
}
// 将频道列表存储到本地
const HEIMAChannels = 'HEIMA_channels'
export const getMyChannelsByLocal = () => storage.get(HEIMAChannels)
export const setMyChannelsByLocal = (channel) =>
  storage.set(HEIMAChannels, channel)
