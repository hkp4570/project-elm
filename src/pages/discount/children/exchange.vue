<script>
import HeadTop from '@/components/header/head.vue';
import AlterTip from "@/components/common/alterTip.vue";
import {mapState} from "vuex";
import {getcaptchas, exChangeHongbao} from '@/service/getData';

export default {
  components: {
    HeadTop,
    AlterTip,
  },
  data() {
    return {
      exchangeCode: null,
      codeNumber: '',
      captchaCodeImg: null,
      showAlert: false,
      alterText: null,
    }
  },
  computed: {
    ...mapState(['userInfo']),
    status: function () {
      return (/^\d+$/gi.test(this.exchangeCode)) && (/^\w{4}$/gi.test(this.codeNumber))
    }
  },
  mounted() {
    this.getCaptchaCode();
  },
  methods: {
    async getCaptchaCode() {
      let res = await getcaptchas();
      this.captchaCodeImg = res.code;
    },
    async exchange() {
      if (this.status) {
        let res = await exChangeHongbao(this.userInfo.user_id, this.exchangeCode, this.codeNumber);
        if (res.message) {
          this.getCaptchaCode();
          this.showAlert = true;
          this.alterText = res.message;
        }
      }
    }
  }
}
</script>

<template>
  <div class="page">
    <head-top head-title="兑换红包" :go-back="true"></head-top>
    <form class="exchange_code">
      <input type="text" placeholder="请输入兑换码" class="exchange_input" v-model="exchangeCode"/>
      <section class="input_container captcha_code_container">
        <input type="text" placeholder="验证码" maxlength="4" v-model="codeNumber"/>
        <div class="img_change_img">
          <img v-show="captchaCodeImg" :src="captchaCodeImg" alt="">
          <div class="change_img" @click="getCaptchaCode">
            <p>看不清</p>
            <p>换一张</p>
          </div>
        </div>
      </section>
    </form>
    <div class="determine" @click="exchange" :class="{active: status}">兑换</div>
    <alter-tip v-if="showAlert" :alter-text="alterText" @closeTip="showAlert=false"></alter-tip>
  </div>
</template>

<style scoped lang="scss">
@import 'src/style/mixin';

.page {
  padding-top: 1.95rem;
  background-color: #f1f1f1;

  p, span {
    font-family: Helvetica Neue, Tahoma, Arial;
  }
}

.determine {
  background-color: #ccc;
  @include sc(.7rem, #fff);
  text-align: center;
  margin: 0 .7rem;
  line-height: 1.8rem;
  border-radius: 0.2rem;
  margin-top: 0.7rem;
}

.active {
  background-color: #4cd964;
}

.exchange_code {
  margin-top: 0.7rem;
  padding: 0 .5rem;

  .exchange_input {
    width: 100%;
    @include sc(.7rem, #666);
    padding: .6rem .4rem;
    border-radius: .15rem;
  }
}

.captcha_code_container {
  height: 2.2rem;
  display: flex;
  margin-top: .7rem;

  input {
    @include sc(.7rem, #666);
    padding: .4rem;
    border-radius: .15rem;
    flex: 3;
  }

  .img_change_img {
    display: flex;
    align-items: center;
    flex: 2;
    margin-left: .3rem;
    background-color: #fff;
    padding-left: .2rem;
    border-radius: .15rem;

    img {
      @include wh(3.5rem, 1.5rem);
      margin-right: .2rem;
    }

    .change_img {
      display: flex;
      flex-direction: 'column';
      flex-wrap: wrap;
      width: 2rem;
      justify-content: center;

      p {
        @include sc(.55rem, #666);
      }

      p:nth-of-type(2) {
        color: #3b95e9;
        margin-top: .2rem;
      }
    }
  }
}
</style>