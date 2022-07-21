import request from '@/uilts/request'
/**
 * 获取联想建议（自动补全）
 * @param {String} keyword
 * @returns promise
 */
export const getSearchResult = (keyword) =>
  request({
    url: '/v1_0/suggestion',
    params: {
      q: keyword
    }
  })

export const getSearch = (q) => {
  return request({
    url: '/v1_0/search',
    params: {
      q
    }
  })
}
