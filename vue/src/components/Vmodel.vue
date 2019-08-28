<template>
  <div class="model">
    <!-- <Model @update:value="handleChange"
           :value="msg"></Model> -->
    <Model :value.sync="msg"></Model>
    <bus></bus>
  </div>
</template>

<script>
import Model from './Model'
import Bus from './Bus'
export default {
  data () {
    return {
      msg: ''
    }
  },
  components: {
    Model,
    Bus
  },
  methods: {
    handleChange (newVal) {
      this.msg = newVal
    }
  }
}
</script>

<style>
</style>
