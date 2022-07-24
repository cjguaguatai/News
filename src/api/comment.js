import request from '@/uilts/request'
/**
 * 获取评论或评论回复
 * @param {String} type
 * @param {Number} source
 * @param {Number} offset
 * @returns promise
 */
export const getComments = (type, source, offset) => {
  return request({
    url: '/v1_0/comments',
    params: {
      type,
      source,
      offset
    }
  })
}
/**
 * 对文章或者评论进行评论
 * @param {string} target
 * @param {string} content
 * @returns
 */
export const postComments = (target, content, artId) => {
  return request({
    url: '/v1_0/comments',
    method: 'POST',
    data: {
      target,
      content,
      art_id: artId
    }
  })
}
/**
 * 对评论或评论回复点赞
 * @param {string} target
 * @returns
 */
export const commentLikings = (target) => {
  return request({
    url: '/v1_0/comment/likings',
    method: 'post',
    data: {
      target
    }
  })
}
/**
 * 取消对评论或评论回复点赞
 * @param {string} target
 * @returns
 */
export const cancelLikings = (target) => {
  return request({
    url: `/v1_0/comment/likings/${target}`,
    method: 'DELETE'
  })
}
