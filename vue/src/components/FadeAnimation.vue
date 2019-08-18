<template>
  <!-- <transition name="fade"
              @beforeEnter="beforeEnter"
              @enter="enter"
              @afterEnter="afterEnter"
              @beforeLeave="beforeLeave"
              @leave="leave"
              @afterLeave="afterLeave"> -->
  <transition name="fade">
    <slot></slot>
  </transition>
</template>

<script>
export default {
  methods: {
    beforeEnter (el) {
      el.style.opacity = 0
    },
    enter (el, done) {
      let temp = 0
      const timer = setInterval(() => {
        temp += 0.1
        if (temp >= 1) {
          clearInterval(timer)
          done()
        }
        el.style.opacity = temp
      }, 1)
    },
    afterEnter (el) {
      el.style.opacity = 1
    },
    beforeLeave (el) {
      el.style.opacity = 1
    },
    leave (el, done) {
      let temp = 1
      const timer = setInterval(() => {
        temp -= 0.03
        if (temp <= 0) {
          clearInterval(timer)
          done()
        }
        el.style.opacity = temp
      }, 1)
    },
    afterLeave (el) {
      el.style.opacity = 0
    }
  }
}
</script>

<style lang="stylus">
.fade-enter-active, .fade-leave-active
  transition all 0.3s
.fade-enter, .fade-leave-to
  opacity 0
</style>
