<template>
  <div class="category">
    <!-- <button @click="handleClick">获取分类</button> -->
    <h1 class="category__title">{{ this.category }}</h1>
    <button @click="handleJump">查看详细信息</button>
    <div>
      <a href="javascript:;"
         @click.prevent="handleBack">后退</a>
      <a href="javascript:;"
         @click.prevent="handleNext">前进</a>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import { getCategory } from '../api/category'
export default {
  data () {
    return {
      category: '',
      categoryData: [],
      info: null
    }
  },
  methods: {
    async handleClick () {
      await getCategory().then((res) => {
        if (res.code !== 200) return console.log(res.msg)
        this.categoryData = res.data
      })
    },
    handleJump () {
      this.$router.push({ name: 'info', params: this.info })
    },
    handleBack () {
      this.$router.go(-1)
    },
    handleNext () {
      this.$router.go(1)
    }
  },
  // 路由钩子函数
  beforeRouteEnter (to, from, next) {
    // console.log('beforeRouteEnter', to)
    // 无法获取实例，此时还没创建
    next()
  },
  beforeRouteUpdate (to, from, next) {
    // console.log('beforeRouteUpdate', to)
    next()
  },
  beforeRouteLeave (to, from, next) {
    // console.log('beforeRouteLeave', to)
    next()
  },
  // 监听器
  watch: {
    '$route': {
      handler: async function (to, form) {
        await this.handleClick()
        let id = to.params.id
        // 查找对应id信息
        const temp = this.categoryData.find((item) => {
          return item.id === +id
        })
        // 如果没匹配到直接返回
        if (!temp) return console.log('不存在改id信息')
        this.category = temp.name
        this.info = temp
      },
      immediate: true
    }
  },
  mounted () {
  }
}
</script>

<style>
</style>
