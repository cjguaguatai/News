<template>
  <div class="pop-container">
    <van-popup
      class="pop"
      v-model="isShow"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <div class="title">
        <van-nav-bar :title="title" left-arrow @click-left="onClickLeft" />
      </div>
      <div class="titleComment">
        <comment :list="commentObj" :Grade="true" />
      </div>
      <van-cell-group>
        <van-cell title="全部内容" />
      </van-cell-group>
      <div class="main">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <comment
            v-for="item in commentList"
            :key="item.com_id"
            :list="item"
          />
        </van-list>
      </div>
      ,
      <!-- 底部大评论 -->
      <div class="post-warp">
        <van-button
          type="default"
          class="postBtn"
          plain
          round
          @click="popupShow = true"
          >评论</van-button
        >
      </div>
      <!-- 底部大评论弹出层 -->
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
    </van-popup>
  </div>
</template>

<script>
import comment from './comment.vue'
import { getComments, postComments } from '@/api/comment'
export default {
  data () {
    return {
      loading: false,
      finished: false,
      refreshing: false,
      //   评论列表
      commentList: [],
      // 弹框弹出与否
      popupShow: false,
      //   弹框内容
      popupMessage: ''
    }
  },
  methods: {
    onClickLeft () {
      this.$store.commit('setIsShow', false)
    },
    onLoad () {
      this.getComments()
      this.loading = false
    },
    // 获取该评论的评论
    async getComments () {
      try {
        const { data } = await getComments(
          'c',
          this.$store.state.popList.com_id
        )
        this.commentList = data.data.results
      } catch (error) {
        console.log(error)
      }
    },
    // 发布评论的评论
    async release () {
      try {
        const { data } = await postComments(
          this.commentObj.com_id,
          this.popupMessage,
          this.$route.params.id
        )
        const text = this.$store.state.popList
        text.reply_count++
        this.$store.commit('setPopList', text)
        // this.list=this.$store.state.popList
        this.commentList.unshift(data.data.new_obj)
        // console.log(data.data.new_obj)
        this.popupMessage = ''
        this.popupShow = false
        // this.list.reply_count++
      } catch (error) {
        console.log(error)
      }
    }
  },
  props: {},
  computed: {
    isShow: {
      get () {
        return this.$store.state.isShow
      },
      set () {}
    },
    title () {
      if (this.commentObj.reply_count > 0) {
        console.log(this.commentObj.reply_count)
        return `${this.commentObj.reply_count}条评论`
      } else {
        return '暂无评论'
      }
    },
    commentObj: {
      get () {
        return this.$store.state.popList
      },
      set () {}
    }
  },
  components: {
    comment
  }
}
</script>

<style lang="less" scoped>
.titleComment,
.main {
  padding: 0 32px;
}
.post-warp {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 98px;
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: hotpink;
  text-align: center;
  .postBtn {
    width: 80%;
    height: 80%;
  }
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
</style>
