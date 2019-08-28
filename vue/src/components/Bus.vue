<template>
  <div class="bus">
    <input @input="handleChange" />
  </div>
</template>

<script>
import bus from '@/utils/eventBus'
export default {
  name: 'bus',
  methods: {
    handleChange (e) {
      bus.$emit('getName', e.target.value)
    }
  }
}
</script>

<style>
</style>
