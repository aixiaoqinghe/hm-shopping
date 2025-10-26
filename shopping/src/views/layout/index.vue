<template>
  <div>
    <router-view></router-view>
    <van-tabbar v-model="active" active-color="#ee0a24" inactive-color="#000" ref="tabbar">
    <van-tabbar-item to="/home" icon="wap-home-o">首页</van-tabbar-item>
    <van-tabbar-item to="/category" icon="apps-o">分类页</van-tabbar-item>
    <van-tabbar-item to="/cart" icon="shopping-cart-o">购物车</van-tabbar-item>
    <van-tabbar-item to="/user" icon="user-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'LayoutIndex',
  data () {
    return {
      active: 0
    }
  },
  watch: {
    $route: {
      handler (newVal) {
        // 根据当前路由设置tabbar选中状态
        const path = newVal.path
        if (path === '/home') {
          this.active = 0
        } else if (path === '/category') {
          this.active = 1
        } else if (path === '/cart') {
          this.active = 2
        } else if (path === '/user') {
          this.active = 3
        }
        // 同步tabbar选中状态
        // this.$nextTick(() => {
        //   this.$refs.tabbar.setActive(this.active)
        // })
      },
      immediate: true
    }
  }
}
</script>

<style lang="less">

</style>
