<template>
  <div class="event">
    <span>{{test='df'}}</span>
    <child @test="handleTest">
      <template v-slot:test>
        <span>同名插槽1</span>
      </template>
      <h1>hhs</h1>
      <template v-slot:test>
        <span>同名插槽3</span>
      </template>
    </child>
  </div>
</template>

<script>
import Child from './child'
export default {
  name: 'event',
  components: {
    Child
  },
  data () {
    return {
      obj: {
        a: '2',
        b: '4'
      }
    }
  },
  computed: {
    test: {
      get () {
        return 'get'
      },
      set (val) {
        console.log(val)
      }
    }
  },
  watch: {
    'obj': {
      // 监听函数
      handler: function (newVal, oldVal) {
        console.log('change')
      },
      // 深度监听
      deep: true,
      // 声明后立即执行handler
      immediate: true
    }
  },
  methods: {
    handleTest (str) {
      console.log(str)
      return 'test'
    }
  }
}
</script>

<style lang="stylus"></style>
