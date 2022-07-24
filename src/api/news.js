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
/**
 * 根据文章id获取详情
 * @param {Number} id
 * @returns
 */
export const newsDetail = (id) => {
  return request({
    url: `/v1_0/articles/${id}`
  })
}
/**
 * 对文章点赞
 * @param {Number} target
 * @returns
 */
export const goodArticle = (target) => {
  return request({
    url: '/v1_0/article/likings',
    method: 'post',
    data: {
      target
    }
  })
}
/**
 * 取消文章点赞
 * @param {Number} target
 * @returns
 */
export const cancelGoodArticle = (target) => {
  return request({
    url: `/v1_0/article/likings/${target}`,
    method: 'DELETE'
  })
}
/**
 * 收藏文章
 * @param {Number} target
 * @returns
 */
export const collectArticles = (target) =>
  request({
    url: '/v1_0/article/collections',
    method: 'post',
    data: {
      target
    }
  })

/**
 * 取消收藏
 * @param {Number} target
 * @returns
 */
export const cancelCollect = (target) => {
  return request({
    url: `/v1_0/article/collections/${target}`,
    method: 'DELETE'
  })
}
