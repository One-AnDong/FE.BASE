<template>
  <div class="learning">
    <h1>vue学习案例</h1>
    <scopete :name='"joe"'
             :age='"18"'>
      <template v-slot:={name,age}>
        <span>{{name}}</span>
        <span>{{age}}</span>
        <span>gg了吧</span>
      </template>
      <template v-slot:test>
        <span>测试下slots</span>
      </template>
      <!-- <template v-slot:default>
        <p>测试下slots</p>
      </template> -->
    </scopete>

  </div>
</template>

<script>
export default {
  name: 'Learning',
  components: {
    scopete: {
      functional: true,
      render: (h, ctx) => {
        console.log(ctx.scopedSlots.default(ctx.props))
        // console.log(ctx.slots().default)
        // const test = ctx.slots().item
        return ctx.scopedSlots.default && ctx.scopedSlots.default(ctx.props || {})
        // return h('div', test)
      }
    }
  }
}
</script>
//vue怎么侦测子组件改变了值
//emit 返回的是什么 上层主见return一个值
//相同名字的插槽是替换还是
//创建vnode 使用函数式组件渲染
//拓展v-model 例子，做手机号验证
//为什么不能用index做为key？（性能问题，引入bug）
//diff算法，移动规则，新建删除，同行对比
//vuex vue.observable 状态管理
//数组哪些方法支持响应式更新，如果不支持用什么方法 包括底层原理实现
//设计秒杀倒计时组件
//深度监听 deep
//防抖
//vue.observavle 优化响应式provide
//provide inject 跨组件通讯
<style>
</style>
