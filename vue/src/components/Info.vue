<template>
  <div class="info">
    <ul>
      <li v-for="(item,key) of info"
          :key="key">
        {{ key +':' + item}}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'info',
  data () {
    return {
      info: null
    }
  },
  watch: {
    '$route': {
      handler: function () {
        this.info = this.$route.params
      },
      immediate: true
    }
  }
}
</script>

<style>
</style>
