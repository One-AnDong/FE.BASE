/**
 * @Author: Joe Yao
 * @Date: 2019-08-18 20:26:14
 * @Last Modified by: Joe Yao
 * @Last Modified time: 2019-08-18 21:22:00
 */

<template lange="pug">
  <div class="todolist">

    <div class="add">
      编号:
      <input type="text"
             v-model="inputObj.id"
             v-my-focus> 品牌名称:
      <input type="text"
             v-model="inputObj.name">
      <input type="button"
             value="添加"
             @click="handleAdd">
    </div>
    <div class="add">
      品牌名称:
      <input type="text"
             placeholder="请输入搜索条件"
             v-model="search">
    </div>
    <div>
      <table class="
             tb">
        <tbody>
          <tr>
            <th>编号</th>
            <th>品牌名称</th>
            <th>创立时间</th>
            <th>操作</th>
          </tr>
          <tr v-for="item in searchRes"
              :key="item.id">
            <td>{{ item.id }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.time | timeFormat({type:'-'}) }}</td>
            <td>
              <a href="#"
                 @click.prevent="handleDelete(item.id)">删除</a>
            </td>
          </tr>
          <tr v-if="searchRes.length===0">
            <td colspan="4">没有任何数据</td>
          </tr>
        </tbody>
      </table>
    </div>

    <fade-animation>
      <template v-slot:default>
        <!-- 模态框 -->
        <modal v-if="del"
               @modal:enter="handleEnter"
               @modal:cancel="handleCancel">
          <template v-slot:title>
            <h3>提示</h3>
          </template>
          <template v-slot:content>
            <p>你确定要删除吗？</p>
          </template>
        </modal>
      </template>
    </fade-animation>
  </div>
</template>

<script>
import { focus } from '@/utils/directives'
import { timeFormat } from '@/utils/filters'
import Modal from './Modal'
import FadeAnimation from './FadeAnimation'
export default {
  components: { Modal, FadeAnimation },
  data () {
    return {
      listData: [
        { id: 1, name: '特斯拉', time: new Date() },
        { id: 2, name: '奥迪', time: new Date() },
        { id: 3, name: '雷克萨斯', time: new Date() },
        { id: 4, name: '奔驰', time: new Date() }
      ],
      inputObj: {
        id: '',
        name: ''
      },
      search: '',
      del: false,
      searchRes: []
    }
  },
  methods: {
    handleAdd () {
      const temp = this.listData.find((item) => {
        return item.id === +this.inputObj.id
      })
      if (temp) return console.log('id已存在')
      this.listData.push({ ...this.inputObj, time: new Date() })
    },
    handleDelete (id) {
      this.del = true
      this.delId = id
    },
    handleCancel () {
      this.del = false
    },
    handleEnter () {
      // 不改变原数组
      const newData = this.listData.filter((item) => {
        return item.id !== this.delId
      })
      // 筛选出的新数给列表数据
      this.listData = newData
      // 隐藏模态框
      this.del = false
      // 将临时变量释放
      this.delId = null
    }
  },
  filters: {
    // timeFormat (val, options) {
    //   const sym = options.type
    //   const y = val.getFullYear()
    //   const m = val.getMonth() + 1
    //   const d = val.getDate()
    //   return y + sym + m + sym + d
    // }
    timeFormat
  },
  computed: {
    // searchRes () {
    //   return this.listData.filter((item) => {
    //     return item.name.indexOf(this.search) !== -1
    //   })
    // }
  },
  directives: {
    // myFocus: {
    //   inserted (elem, binding) {
    //     elem.focus()
    //   }
    // }
    myFocus: focus
  },
  watch: {
    // 监测搜索框数据（搜索）
    search: {
      handler: function (val) {
        this.searchRes = this.listData.filter((item) => {
          return item.name.indexOf(val) !== -1
        })
      },
      immediate: true
    },
    // 检测数组变化（添加）
    listData () {
      this.searchRes = this.listData
    }
  },
  mounted () {
    console.log(this.searchRes)
  }
}
</script>

<style lang="stylus" >
#app
  width 600px
  margin 10px auto
.tb
  border-collapse collapse
  width 100%
.tb th
  background-color #0094ff
  color white
.tb td, .tb th
  padding 5px
  border 1px solid black
  text-align center
.add
  padding 5px
  border 1px solid black
  margin-bottom 10px
</style>
