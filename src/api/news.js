import request from '@/uilts/request'
// import store from '@/store'
/**
 * 获取文章列表
 * @param {Number} channelId 频道ID
 * @param {Number} timestamp 时间戳，请求新的推荐数据传当前的时间戳，请求历史推荐传指定的时间戳
 * @returns Promise
 */
export const getArticleList = (channelId, timestamp) => {
  return request({
    url: '/v1_0/articles',
    params: {
      channel_id: channelId,
      timestamp
    }
  })
}
/**
 * 获取用户阅读历史
 * @returns Promise
 */
export const getHistories = () => {
  return request({
    url: '/v1_0/user/histories'
  })
}
