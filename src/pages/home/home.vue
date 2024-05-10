<script>
import HeadTop from '@/components/header/head.vue';
import {cityGuess} from "@/service/getData";

export default {
  components:{
    HeadTop,
  },
  data() {
    return {
      guessCity: '', // 当前城市
      guessCityId: '', // 当前城市ID
    }
  },
  mounted() {
    cityGuess().then(res => {
      this.guessCity = res.name;
      this.guessCityId = res.id;
    })
  }
}
</script>

<template>
  <div>
    <head-top signin-up="home"></head-top>
    <nav class="city_nav">
      <div class="city_tip">
        <span>当前定位城市：</span>
        <span>定位不准时，请在城市列表中选择</span>
      </div>
      <router-link :to="'/city/' + guessCityId" class="guess_city">
        <span>{{guessCity}}</span>
        <svg class="arrow_right">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
        </svg>
      </router-link>
    </nav>
  </div>
</template>

<style scoped lang="scss">
 @import '~@/style/mixin.scss';
.head_logo {
  left: 0.4rem;
  font-weight: 400;
  @include sc(0.7rem, #fff);
  @include wh(2.3rem, 0.7rem);
  @include ct;
}

.city_nav {
  padding-top: 2.35rem;
  border-top: 1px solid $bc;
  background-color: #fff;
  margin-bottom: 0.4rem;

  .city_tip {
    @include fj;
    line-height: 1.45rem;
    padding: 0 0.45rem;

    span:nth-of-type(1) {
      @include sc(0.55rem, #666);
    }

    span:nth-of-type(2) {
      font-weight: 900;
      @include sc(0.475rem, #9f9f9f);
    }

  }

  .guess_city {
    @include fj;
    align-items: center;
    height: 1.8rem;
    padding: 0 0.45rem;
    border-top: 1px solid $bc;
    border-bottom: 2px solid $bc;
    @include font(0.75rem, 1.8rem);

    span:nth-of-type(1) {
      color: $blue;
    }

    .arrow_right {
      @include wh(.6rem, .6rem);
      fill: #999;
    }
  }
}

#hot_city_container {
  background-color: #fff;
  margin-bottom: 0.4rem;
}

.citylistul {
  li {
    float: left;
    text-align: center;
    color: $blue;
    border-bottom: 0.025rem solid $bc;
    border-right: 0.025rem solid $bc;
    @include wh(25%, 1.75rem);
    @include font(0.6rem, 1.75rem);
  }

  li:nth-of-type(4n) {
    border-right: none;
  }
}

.city_title {
  color: #666;
  font-weight: 400;
  text-indent: 0.45rem;
  border-top: 2px solid $bc;
  border-bottom: 1px solid $bc;
  @include font(0.55rem, 1.45rem, "Helvetica Neue");

  span {
    @include sc(0.475rem, #999);
  }

  position: sticky;
  top: 1.95rem;
  background-color: #fff;
}

.letter_classify_li {
  margin-bottom: 0.4rem;
  background-color: #fff;
  border-bottom: 1px solid $bc;

  .groupcity_name_container {
    li {
      color: #666;
    }
  }
}
</style>