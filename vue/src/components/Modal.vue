/**
 * @Author: Joe Yao
 * @Date: 2019-08-18 20:26:21
 * @Last Modified by: Joe Yao
 * @Last Modified time: 2019-08-18 21:10:08
 */
<template>
  <div class="modal">
    <div class="modal__body">
      <div class="modal__body__head">
        <slot name="title"
              :title="info.title" />
        <h3 v-if="!$slots.title">
          {{ info.title }}
        </h3>
      </div>
      <div class="modal__body__main">
        <slot name="content"
              :content="info.content" />
        <p v-if="!$slots.content">
          {{ info.content }}
        </p>
      </div>
      <div class="modal__body__foot">
        <button class="modal__body__foot-cancel"
                @click="handleCancel">取消</button>
        <button class="modal__body__foot-enter modal__body__foot-btn_active"
                @click="handleEnter">确认</button>
      </div>
    </div>
    <div class="modal__mark"></div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    info: {
      type: Object,
      default: () => {
        return {
          title: '标题',
          content: '代码是写出来给人看的，附带能在机器上运行'
        }
      }
    }
  },
  methods: {
    handleCancel () {
      this.$emit('modal:cancel')
    },
    handleEnter () {
      this.$emit('modal:enter')
    }
  }
}
</script>

<style lang="stylus">
.modal__body
  display flex
  flex-direction column
  position absolute
  top 50%
  left 50%
  transform translate(-50%, -50%)
  width 500px
  height 200px
  border-radius 5px
  background-color #fff
  z-index 9
.modal__mark
  position absolute
  top 0
  bottom 0
  left 0
  right 0
  background rgba(0, 0, 0, 0.5)
.modal__body__head
  flex 1
.modal__body__main
  flex 2
  font-size 16px
  color #666
.modal__body__foot
  display flex
  flex 1
  border-top 1px solid #eee
  line-height 20px
.modal__body__foot-enter
  flex 1
  border none
  font-size 16px
  text-align center
  outline none
.modal__body__foot-cancel
  flex 1
  border none
  border-right 1px solid #eee
  font-size 16px
  text-align center
  outline none
.modal__body__foot-btn_active
  color #1989fa
.modal-enter-active, .modal-leave-active
  transition all 0.3s
.modal-enter, .modal-leave-to
  opacity 0
</style>
