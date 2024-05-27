<script>
import HeadTop from '@/components/header/head.vue';
import AlterTip from "@/components/common/alterTip.vue";

export default {
  components: {
    HeadTop,
    AlterTip,
  },
  data() {
    return {
      showAlert: false,
      alterText: null,
    }
  },
  methods: {
    fenxiang() {
      this.showAlert = true;
      this.alterText = '请在APP中查看';
    }
  }
}
</script>

<template>
  <div class="page">
    <head-top head-title="推荐有奖" :go-back="true"></head-top>
    <section class="activity_banner">
      <img src="../../../assets/activity.png">
    </section>
    <section class="invite_firend">
      <div class="invite_firend_style">
        <img src="../../../assets/weixin.png" @click="fenxiang" alt="">
        <p>邀请微信好友</p>
      </div>
      <div class="invite_firend_style">
        <img src="../../../assets/qq.png" @click="fenxiang" alt="">
        <p>邀请QQ好友</p>
      </div>
      <div class="invite_firend_style">
        <img src="../../../assets/fenxiang.png" @click="fenxiang" alt="">
        <p>面对面邀请</p>
      </div>
    </section>
    <section class="invite_num">
      <div class="invite_num_style">
        <p>累计收益</p>
        <p><span>0</span>元</p>
      </div>
      <div class="invite_num_style invite_people">
        <p>成功邀请</p>
        <p><span>0</span>人</p>
      </div>
    </section>
    <p class="income_detail">-收益明细-</p>
    <section class="incom_tips">
      <img src="../../../assets/qianbao.png">
      <p>还不赶紧去邀请好友</p>
    </section>
    <alter-tip v-if="showAlert" @closeTip="showAlert = false" :alter-text="alterText"></alter-tip>
  </div>
</template>

<style scoped lang="scss">
@import 'src/style/mixin';

.page {
  padding-top: 1.95rem;
  background-color: #f5f5f5;

  p, span {
    font-family: Helvetica Neue, Tahoma, Arial;
  }
}

.activity_banner {
  img {
    @include wh(100%, 10rem);
  }
}

.invite_firend {
  display: flex;
  padding: 1rem 0;
  background-color: #fff;

  .invite_firend_style {
    flex: 1;
    text-align: center;

    img {
      @include wh(2.5rem, 2.5rem);
    }

    p {
      @include sc(.5rem, #333);
    }
  }
}

.invite_num {
  display: flex;
  margin-top: 1rem;
  @include sc(.5rem, #666);

  .invite_num_style {
    flex: 1;
    text-align: center;

    p {
      color: #666;
    }

    span {
      @include sc(.8rem, #ff5633);
      font-weight: bold;
    }
  }

  .invite_people {
    border-left: 0.025rem solid #ddd;

    span {
      @include sc(.8rem, #666);
      font-weight: bold;
    }
  }
}

.income_detail {
  text-align: center;
  margin-top: 1rem;
  @include sc(.5rem, #666);
}

.incom_tips {
  text-align: center;
  margin-top: 1rem;

  img {
    @include wh(1.3rem, 1.6rem);
  }

  p {
    @include sc(.5rem, #999);
  }
}
</style>