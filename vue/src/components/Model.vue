<template>
  <div class="model">
    <p>双向数据绑定的实现</p>
    <input type="text"
           @input="handleChange">
    <p>{{ msg }}</p>
    <p>来个名字：{{ name }}</p>
  </div>
</template>

<script>
import bus from '@/utils/eventBus'
export default {
  name: 'model',
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      name: ''
    }
  },
  methods: {
    handleChange (e) {
      this.$emit('update:value', e.target.value)
    }
  },
  computed: {
    msg () {
      return this.value
    }
  },
  mounted () {
    bus.$on('getName', (val) => {
      this.name = val
    })
  }
}
</script>

<style>
</style>
