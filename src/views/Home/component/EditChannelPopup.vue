<template>
  <div>
    <van-popup
      v-model="isShow"
      position="bottom"
      :style="{ height: '80%' }"
      closeable
      close-icon-position="top-left"
    >
      <div class="popupMain">
        <!-- 我的频道 -->
        <div class="my-channel">
          <van-cell title="我的频道">
            <van-button
              size="small"
              round
              class="edit-btn"
              @click="isEdit = !isEdit"
              >{{ isEdit ? '完成' : '编辑' }}</van-button
            >
          </van-cell>
          <!-- 宫格 -->
          <van-grid :border="false" gutter="10px">
            <van-grid-item
              :text="item.name"
              v-for="(item, index) in myChannels"
              :key="item.id"
              :class="{ 'active-channel': item.name === '推荐' }"
              @click="onClickMyChannel(item, index)"
            >
              <van-icon
                slot="icon"
                name="cross"
                v-show="isEdit && item.name !== '推荐'"
              >
              </van-icon>
            </van-grid-item>
          </van-grid>
        </div>
        <!-- 推荐频道 -->
        <div class="recommend-channel">
          <van-cell title="推荐频道"></van-cell>
          <van-grid :border="false" gutter="10px">
            <van-grid-item
              icon="plus"
              :text="item.name"
              v-for="item in recommendChannels"
              :key="item.id"
              @click="addMyChannel(item)"
            ></van-grid-item>
          </van-grid>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { getAllChannels } from '@/api/channel'

export default {
  name: 'EditChannelPopup',
  data () {
    return {
      isShow: false,
      allChannels: [],
      isEdit: false
    }
  },
  props: {
    myChannels: {
      type: Array,
      required: true
    }
  },
  created () {
    this.getAllChannels()
  },
  methods: {
    async getAllChannels () {
      const { data } = await getAllChannels()
      // console.dir(data)
      this.allChannels = data.data.channels
    },
    // 删除我的频道、切换频道
    onClickMyChannel (channel, index) {
      if (this.isEdit && channel.name !== '推荐') {
        return this.$emit('del-myChannel', channel.id)
      }
      if (!this.isEdit) {
        // console.log(111)
        this.isShow = false
        this.$emit('change-active', index)
      }
    },
    // 添加频道
    addMyChannel (add) {
      if (this.isEdit) {
        this.$emit('add-myChannel', { ...add })
      }
      // console.log({ ...add })
      // console.log(add)
    }
  },
  computed: {
    recommendChannels () {
      return this.allChannels.filter(
        (item) => !this.myChannels.find((i) => i.id === item.id)
      )
    }
  }
}
</script>

<style scoped lang="less">
.active-channel {
  /deep/.van-grid-item__text {
    color: red;
  }
}
.popupMain {
  padding-top: 100px;
  .edit-btn {
    color: red;
    padding: 0 30px;
    height: 48px;
    border: 0.02667rem solid red;
  }

  .my-channel {
    :deep(.van-grid-item__content) {
      position: relative;

      .van-grid-item__icon-wrapper {
        position: absolute;
        top: 0;
        right: 0;

        .van-icon-cross {
          position: absolute;
          top: 0;
          right: 0;
          transform: translate(20%, -35%);
          border: 0.02667rem solid #000;
          border-radius: 50%;
          text-align: center;
          line-height: 0.32rem;
        }
      }
    }
  }
  // 推荐频道的样式
  .recommend-channel {
    // 推荐频道加号样式
    :deep(.van-grid-item__content) {
      flex-direction: row;

      .van-grid-item__icon {
        font-size: 0.5rem;
      }

      .van-grid-item__text {
        margin-top: 0;
      }
    }
  }
}
</style>
