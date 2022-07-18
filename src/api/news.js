import request from '@/uilts/request'
// import store from '@/store'
// 登录注册
export const getArticleList = (channelId, timestamp) => {
  return request({
    url: '/v1_0/articles',
    params: {
      channel_id: channelId,
      timestamp
    }
  })
}
