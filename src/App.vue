<template>
  <div>
    <transition name="router-fade" mode="out-in">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
    </transition>
    <transition name="router-fade" mode="out-in">
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </transition>
    <svg-icon></svg-icon>
  </div>
</template>

<script>
import svgIcon from '@/components/common/svg.vue';
export default {
  name: 'App',
  components: {
    svgIcon
  },
  computed:{
    userInfo(){
      return this.$store.state.userInfo;
    }
  }
}
</script>

<style scoped lang="scss">
@import "./style/common.scss";
.router-fade-enter-active, .router-fade-leave-active {
  transition: opacity .3s;
}
.router-fade-enter, .router-fade-leave-active {
  opacity: 0;
}
</style>
