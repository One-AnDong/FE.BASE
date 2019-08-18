<template>
  <div class="child">
    <button @click="handleClick">点我</button>
    <slot name="test">
    </slot>
  </div>
</template>

<script>
export default {
  methods: {
    handleClick () {
      const res = this.$emit('test', '666')
      console.log(res)
    }
  }
}
</script>

<style>
</style>
