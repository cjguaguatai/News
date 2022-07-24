<template>
  <div class="comment-container">
    <van-cell class="suggestion">
      <template #title>
        <van-image round width="35px" height="35px" :src="fakeList.aut_photo" />
      </template>

      <template #default>
        <div class="top">
          <div class="left">{{ fakeList.aut_name }}</div>
          <div class="right">
            <!-- <div @click="list.is_liking = !list.is_liking"> -->
            <div @click="changeLikings(fakeList.com_id)">
              <van-icon name="good-job-o" v-if="!fakeList.is_liking" />
              <van-icon
                name="good-job"
                style="color: red"
                v-else
                class="good-job"
              />
            </div>
            <div>
              <span v-if="fakeList.like_count === 0">赞</span>
              <span v-else>{{ fakeList.like_count }}</span>
            </div>
          </div>
        </div>
        <div class="center">
          {{ fakeList.content }}
        </div>
        <div class="bottom">
          <span>{{ articleDesc }}</span>
          <van-button type="default" round @click="replyClick"
            >回复<span>{{ fakeList.reply_count }}</span>
          </van-button>
        </div>
      </template>
    </van-cell>
  </div>
</template>

<script>
import dayjs from '@/uilts/dayjs'
import { commentLikings, cancelLikings } from '@/api/comment'

export default {
  data () {
    return {
      // 为了响应式
      fakeList: {}
    }
  },
  props: {
    list: {
      type: Object,
      require: true
    },
    Grade: {
      type: Boolean
    }
  },
  computed: {
    articleDesc () {
      const art = this.list
      const relativeTime = dayjs(art.pubdate).fromNow()
      return relativeTime
    }
  },
  created () {
    this.fakeList = this.list
  },
  methods: {
    // 点击文章评论里的赞
    async changeLikings (id) {
      if (!this.list.is_liking) {
        try {
          await commentLikings(id)
          // console.log(data)
          this.fakeList.is_liking = true
          this.fakeList.like_count++
        } catch (error) {
          this.$toast.fail('点赞失败')
          console.log(error)
        }
      } else {
        try {
          await cancelLikings(id)
          this.fakeList.is_liking = false
          this.fakeList.like_count--
        } catch (error) {
          console.log(error)
          this.$toast.fail('取消点赞失败')
        }
      }
    },
    // vuex 改pop显示状态  &&  将list传入pop
    replyClick () {
      if (this.Grade) {
        this.$store.commit('setIsShow', true)
        this.$store.commit('setPopList', this.fakeList)
      }
    }
  }
}
</script>

<style lang="less" scoped>
* {
  margin: 0 0;
  padding: 0 0;
}
.comment-container {
  .suggestion {
    .van-cell__value {
      flex: 6;
      .top {
        display: flex;
        justify-content: space-between;
        .right {
          display: flex;
          .good-job {
            &::before {
              color: red;
            }
          }
          span {
            margin-left: 5px;
          }
        }
      }

      .center {
        display: flex;
        justify-content: flex-start;
        color: #000;
        margin: 16px 0;
      }

      .bottom {
        display: flex;
        justify-content: flex-start;
        font-size: 12px;
        color: #000;
        span {
          margin-right: 12px;
        }
        .van-button {
          font-size: 12px;
          height: 48px;
          width: 136px;
          text-align: center;
          /deep/ .van-button__content {
            // width: 100px;
            height: 100%;
            text-align: center;
            margin-left: 20px;
          }
        }
      }
    }
  }
  .pop {
    /deep/.title {
      .van-icon {
        color: #ccc;
      }
    }
  }
}
</style>
