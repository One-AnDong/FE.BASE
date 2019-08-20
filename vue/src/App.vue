<template>
  <div id="app">
    <router-view />
    <div id="nav">
      <router-link to="/todolist">TodoList</router-link>
      <router-link to="/event">Event</router-link>
      <router-link to="/category/1">category1</router-link>
      <router-link to="/category/2">category2</router-link>
      <router-link to="/category/3">category3</router-link>
    </div>
  </div>
</template>
<style lang="stylus">
#app
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
#nav
  padding 30px
  a
    display inline-block
    padding 10px
    font-weight bold
    color #2c3e50
    &.router-link-exact-active
      color #42b983
</style>
