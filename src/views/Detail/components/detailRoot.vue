<template>
  <div class="box">
    <div class="nav-bar">
      <van-nav-bar
        title="黑马头条"
        left-arrow
        fixed
        @click-left="onClickLeft"
      />
    </div>
    <div class="title">
      <h1>{{ result.title }}</h1>
      <div class="user-info">
        <div class="left">
          <div class="img"><img :src="result.aut_photo" alt="" /></div>
          <div class="text1">
            <p>{{ result.aut_name }}</p>
            <p class="year">{{ articleDesc }}</p>
          </div>
        </div>
        <div
          class="button"
          @click="followingsFn"
          :class="{ buttonChange: isFollowings }"
        >
          <span v-show="!isFollowings">+ 关注</span
          ><span v-show="isFollowings">已关注</span>
        </div>
      </div>
    </div>
    <div class="main">
      <div class="article-content markdown-body" v-html="result.content"></div>
    </div>
    <div class="footer">
      <div class="left"></div>
      <div class="middle">正文结束</div>
      <div class="right"></div>
    </div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <Comment
        :list="item"
        v-for="item in commentList"
        :key="item.com_id"
        class="component"
        :Grade="true"
      />
    </van-list>
    <div class="toolbar">
      <van-button type="primary" round @click="popupShow = true"
        >写评论</van-button
      >
      <!-- 评论数 -->
      <van-badge :content="commentsNub">
        <van-icon name="comment-o" />
      </van-badge>
      <!-- 收藏 -->
      <van-icon
        name="star-o"
        @click="collect"
        :class="{ collection: isCollect }"
      />
      <!-- 点赞 -->
      <van-icon name="good-job-o" @click="good" :class="{ good: isGood > 0 }" />
      <!-- 转发 -->
      <van-icon name="share" />
    </div>
    <!-- 主页回复 -->
    <van-popup
      v-model="popupShow"
      position="bottom"
      :style="{ height: '20%' }"
      class="text"
    >
      <van-field
        v-model="popupMessage"
        rows="2"
        autosize
        type="textarea"
        maxlength="50"
        placeholder="请输入留言"
        show-word-limit
        class="comment"
      />
      <div @click="release">发布</div>
    </van-popup>
    <!-- 回复评论 -->
    <Pop></Pop>
  </div>
</template>

<script>
import {
  newsDetail,
  collectArticles,
  cancelCollect,
  goodArticle,
  cancelGoodArticle
} from '@/api/news.js'
import { getComments, postComments } from '@/api/comment'
import { getFollowings, cancelFollowings } from '@/api/user'
import Comment from '@/views/Detail/components/comment.vue'
import dayjs from '@/uilts/dayjs'
import Pop from './pop.vue'
export default {
  data () {
    return {
      result: {},
      commentList: [],
      loading: false,
      finished: false,
      lastId: null,
      endId: 2,
      // 评论数量
      commentsNub: null,
      // 弹框显示
      popupShow: false,
      // 写评论内容
      popupMessage: '',
      // 是否收藏
      isCollect: '',
      // 是否点赞
      isGood: '',
      // 是否关注
      isFollowings: '',
      // 对评论进行评论
      isShow: false
    }
  },
  created () {
    this.newsDetail(this.$route.params.id)
  },
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    },
    // 根据文章id获取详情
    async newsDetail (id) {
      //   const id = this.$route.params.id
      // console.log(id)
      try {
        const { data } = await newsDetail(id)
        console.log(data)
        this.result = data.data
        this.isGood = data.data.attitude
        this.isCollect = data.data.is_collected
        this.isFollowings = data.data.is_followed
      } catch (error) {
        console.log(error)
      }
    },
    // 获取评论
    async getCommentS () {
      try {
        const { data } = await getComments(
          'a',
          this.$route.params.id,
          this.lastId
        )
        console.log(data)
        this.commentsNub = data.data.total_count
        const data1 = data.data.results
        this.endId = data.data.end_id
        if (data1.length) {
          this.lastId = data1[data1.length - 1].com_id
        } else {
          this.finished = true
        }
        this.commentList = [...this.commentList, ...data1]
      } catch (error) {
        this.$toast.fail('获取评论失败')
        console.log(error)
      }
    },
    // 获取评论，滑动事件
    async onLoad () {
      this.finished = false
      await this.getCommentS()
      this.loading = false
    },
    // 点击发布
    async release () {
      try {
        const { data } = await postComments(
          this.$route.params.id,
          this.popupMessage
        )
        this.popupShow = false
        // console.log(data)
        this.commentList.unshift(data.data.new_obj)
        this.popupMessage = ''
        this.commentsNub++
      } catch (error) {
        console.log(error)
      }
    },
    // 点击收藏
    async collect () {
      // 添加收藏
      if (!this.isCollect) {
        try {
          await collectArticles(this.$route.params.id)
          this.isCollect = true
        } catch (error) {
          console.log(error)
        }
      } else {
        // 取消收藏
        try {
          await cancelCollect(this.$route.params.id)
          this.isCollect = false
        } catch (e) {
          console.log(e)
        }
      }
    },
    // 点击点赞
    async good () {
      if (this.isGood === 0 || this.isGood === -1) {
        try {
          await goodArticle(this.$route.params.id)
          this.isGood = 1
          // console.log(data)
        } catch (e) {
          console.log(e)
        }
      } else {
        try {
          await cancelGoodArticle(this.$route.params.id)
          this.isGood = 0
          // console.log(data)
        } catch (e) {
          console.log(e)
        }
      }
    },
    // 点击关注
    async followingsFn () {
      if (!this.isFollowings) {
        console.log(222)
        try {
          const { data } = await getFollowings(this.result.aut_id)
          console.log(data)
          this.isFollowings = true
        } catch (error) {
          console.log(error)
        }
      } else {
        console.log(111)

        try {
          await cancelFollowings(this.result.aut_id)
          this.isFollowings = false
        } catch (error) {
          console.log(error)
        }
      }
    }
  },
  computed: {
    articleDesc () {
      const art = this.result
      const relativeTime = dayjs(art.pubdate).fromNow()
      return relativeTime
    }
  },
  components: { Comment, Pop }
}
</script>

<style scoped lang="less">
* {
  margin: 0 0;
  padding: 0 0;
}
.box {
  // max-height: 1154px;
  // overflow: auto;
  background-color: #fff;
  padding: 50px 0.42667rem 0;
  overflow: hidden;
  /deep/.nav-bar {
    .van-nav-bar__content {
      background-color: #3296fa;
      .van-nav-bar__title,
      .van-icon {
        color: #fff;
      }
    }
  }
  .toolbar {
    height: 88px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 750px;
    background-color: #fff;
    .van-button {
      width: 282px;
      height: 44px;
      margin-top: 7px;
      border: 0.02667rem solid #eee;
      color: #a7a7a7;
      background-color: #fff;
    }
    .van-icon {
      font-size: 40px;
    }
    .collection {
      color: yellow;
    }
    .good {
      color: orangered;
    }
  }
  .title {
    font-size: 20px;
    // padding: 0.66667rem 0;
    margin: 0;
    color: #3a3a3a;
    .user-info {
      display: flex;
      margin-top: 50px;
      justify-content: space-between;
      .left {
        display: flex;
        .img {
          overflow: hidden;
          img {
            border-radius: 50%;
            width: 0.93333rem;
            height: 0.93333rem;
          }
        }
        .text1 {
          margin-left: 14px;
          margin-top: 6px;
          .year {
            font-size: 0.30667rem;
            color: #b7b7b7;
            margin-top: 8px;
          }
        }
      }
      .button {
        // height: 78px;
        line-height: 60px;
        color: white;
        background: rgb(50, 150, 250);
        width: 2.26667rem;
        height: 0.77333rem;
        border-radius: 26.64rem;
        font-size: 0.32rem;
        text-align: center;
      }
      .buttonChange {
        color: #323233;
        background-color: #fff;
        border: 0.02667rem solid #ebedf0;
      }
    }
  }
  .footer {
    margin-top: 80px;
    text-align: center;
    display: flex;
    margin-bottom: 52px;
    .left,
    .right {
      margin-top: 20px;
      flex: 2;
      width: 100px;
      height: 0px;
      border: 1px solid #ebedf0;
    }
    .middle {
      flex: 1;
      color: #969799;
      font-size: 0.37333rem;
    }
  }
  .component {
    padding: 0 0;
    height: 210px;
  }
  .text {
    display: flex;
    align-items: center;
    .comment {
      width: 596px;
      height: 176px;
      background-color: #f5f7f9;
      margin-left: 0.42667rem;
      /deep/.van-field__word-limit {
        margin-top: 32px;
        margin-right: 30px;
      }
    }
    div {
      margin-left: 35px;
      color: #6ba3d8;
      font-size: 0.37333rem;
    }
  }
}
</style>
