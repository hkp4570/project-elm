<script>
import alertTip from './alterTip.vue';

export default {
  props: ['time'],
  components: {
    alertTip,
  },
  data() {
    return {
      showAlert: false,
      alertText: null,
      countNum: 900,
    }
  },
  computed: {
    remaining: function () {
      let minute = parseInt(this.countNum / 60);
      let second = parseInt(this.countNum % 60);
      if (minute < 10) {
        minute = '0' + minute;
      }
      if (second < 10) {
        second = '0' + second;
      }
      return '去支付(还剩' + minute + '分' + second + '秒)';
    },
    numTime: function () {
      if (this.time.toString().indexOf('分钟') !== -1) {
        return parseInt(this.time) * 60;
      } else {
        return parseInt(this.time);
      }
    }
  },
  mounted() {
    this.countNum -= this.numTime;
    this.remainingTime();
  },
  methods: {
    closeTip() {
      this.$emit('closeTip')
    },
    remainingTime() {
      clearInterval(this.timer);
      this.timer = setInterval(() => {
        this.countNum--;
        if (this.countNum === 0) {
          clearInterval(this.timer);
          this.showAlert = true;
          this.alertText = '支付超时';
        }
      }, 1000);
    },
    gotoPay() {
      this.showAlert = true;
      this.alertText = '暂不开放支付接口';
    }
  }
}
</script>

<template>
  <div class="page">
     <span class="rem_time" style="color: orange;border-width: 1px;border-style: solid;border-color: orange;"
           @click="gotoPay">
	       {{ remaining }}
        </span>
    <alertTip v-if="showAlert" @closeTip="showAlert = false" :alertText="alertText"></alertTip>
  </div>
</template>

<style scoped lang="scss">
@import 'src/style/mixin';

.page {
  display: inline-block;

  .rem_time {
    @include sc(.55rem, orange);
    padding: .1rem .2rem;
    border-radius: .15rem;
  }
}
</style>