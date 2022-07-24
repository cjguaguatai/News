import request from '@/uilts/request'
// import store from '@/store'
// 登录注册
export const login = (mobile, code) => {
  return request({
    url: '/v1_0/authorizations',
    method: 'post',
    data: {
      mobile,
      code
    }
  })
}

// 发送验证码
export const sendCode = (mobile) => {
  return request({
    url: `/v1_0/sms/codes/${mobile}`
  })
}

// 获取用户自己信息
export const getUserInfo = () => {
  return request({
    url: '/v1_0/user'
  })
}
/**
 * 关注用户
 * @param {String} target
 * @returns
 */
export const getFollowings = (target) => {
  return request({
    url: '/v1_0/user/followings',
    method: 'post',
    data: {
      target
    }
  })
}

export const cancelFollowings = (target) => {
  return request({
    url: `/v1_0/user/followings/${target}`,
    method: 'DELETE'
  })
}
