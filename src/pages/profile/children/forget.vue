<script>
import HeadTop from '@/components/header/head.vue';
import AlterTip from "@/components/common/alterTip.vue";
import {getcaptchas, changePassword} from '@/service/getData';

export default {
  components: {
    HeadTop,
    AlterTip
  },
  data() {
    return {
      account: null, // 账号
      oldPassword: null, // 旧密码
      newPassword: null, // 新密码
      confirmPassword: null, // 确认密码
      mobileCode: null, // 验证码
      captchaCodeImg: null, // 验证码地址
      showAlert: false,
      alterText: '',
    }
  },
  created() {
    this.getCaptchaCode();
  },
  methods: {
    getCaptchaCode() {
      getcaptchas().then(res => {
        this.captchaCodeImg = res.code;
      })
    },
    resetButton() {
      if (!this.account) {
        this.showAlert = true;
        this.alterText = '请输入账号';
        return;
      } else if (!this.oldPassword) {
        this.showAlert = true;
        this.alterText = '请输入旧密码';
        return;
      } else if (!this.newPassword) {
        this.showAlert = true;
        this.alterText = '请输入新密码';
        return;
      } else if (!this.confirmPassword) {
        this.showAlert = true;
        this.alterText = '请输入确认密码';
        return;
      } else if (this.newPassword !== this.confirmPassword) {
        this.showAlert = true;
        this.alterText = '新密码和确认密码不一致';
        return;
      } else if (!this.mobileCode) {
        this.showAlert = true;
        this.alterText = '请输入验证码';
        return;
      }
      changePassword(this.account, this.oldPassword, this.newPassword, this.confirmPassword, this.mobileCode).then(res => {
        if (res.message) {
          this.showAlert = true;
          this.alterText = res.message;
          this.getCaptchaCode();
        } else {
          this.showAlert = true;
          this.alterText = '密码修改成功';
        }
      })
    },
    closeTip() {
      this.showAlert = false;
    }
  }
}
</script>

<template>
  <div class="restContainer">
    <head-top :head-title="'重制密码'" :go-back="true"></head-top>
    <form class="restForm">
      <section class="input_container phone_number">
        <input type="text" placeholder="账号" name="phone" maxlength="11" v-model="account"/>
      </section>
      <section class="input_container">
        <input type="text" placeholder="旧密码" name="oldPassword" v-model="oldPassword"/>
      </section>
      <section class="input_container">
        <input type="text" placeholder="新密码" name="newPassword" v-model="newPassword"/>
      </section>
      <section class="input_container">
        <input type="text" placeholder="确认密码" name="confirmPassword" v-model="confirmPassword"/>
      </section>
      <section class="input_container captcha_code_container">
        <input type="text" placeholder="验证码" name="mobileCode" v-model="mobileCode">
        <div class="img_change_img">
          <!--          <img v-show="captchaCodeImg" :src="captchaCodeImg" alt=""/>-->
          <div v-html="captchaCodeImg"></div>
          <div class="change_img" @click="getCaptchaCode">
            <p>看不清</p>
            <p>换一张</p>
          </div>
        </div>
      </section>
    </form>
    <div class="login_container" @click="resetButton">确认修改</div>
    <alter-tip v-if="showAlert" :alter-text="alterText" :show-alert="showAlert" @closeTip="closeTip"></alter-tip>
  </div>
</template>

<style scoped lang="scss">
@import '~@/style/mixin.scss';

.restContainer {
  padding-top: 1.95rem;
}

.restForm {
  background-color: #fff;
  margin-top: .6rem;

  .input_container {
    display: flex;
    justify-content: space-between;
    padding: .6rem .8rem;
    border-bottom: 1px solid #f1f1f1;

    input {
      @include sc(.7rem, #666);
    }

    button {
      @include sc(.65rem, #fff);
      font-family: Helvetica Neue, Tahoma, Arial;
      padding: .28rem .4rem;
      border: 1px;
      border-radius: 0.15rem;
    }

    .right_phone_number {
      background-color: #4cd964;
    }
  }

  .phone_number {
    padding: .3rem .8rem;
  }

  .captcha_code_container {
    height: 2.2rem;

    .img_change_img {
      display: flex;
      align-items: center;

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
}

.captcha_code_container {
  height: 2.2rem;

  .img_change_img {
    display: flex;
    align-items: center;

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

.login_container {
  margin: 1rem .5rem;
  @include sc(.7rem, #fff);
  background-color: #4cd964;
  padding: .5rem 0;
  border: 1px;
  border-radius: 0.15rem;
  text-align: center;
}
</style>
