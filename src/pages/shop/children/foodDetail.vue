<script>
import headTop from '@/components/header/head.vue'
import ratingStar from '@/components/common/ratingStar.vue'
import {getStore, imgBaseUrl} from '@/utils/index.js';

export default {
  data() {
    return {
      imgBaseUrl,
      image_path: null,
      description: null,
      month_sales: null,
      name: null,
      rating: null,
      rating_count: null,
      satisfy_rate: null,
      foods: null,
      shopId: null,
    }
  },
  components: {
    headTop,
    ratingStar,
  },
  mounted() {
    const foodDetail = JSON.parse(getStore('foodDetail'));
    this.image_path = foodDetail.image_path;
    this.description = foodDetail.description;
    this.rating = foodDetail.rating;
    this.month_sales = foodDetail.month_sales;
    this.name = foodDetail.name;
    this.rating_count = foodDetail.rating_count;
    this.satisfy_rate = foodDetail.satisfy_rate;
    this.foods = foodDetail;
    this.shopId = foodDetail.shop_id;
  },
}
</script>

<template>
  <div class="rating_page">
    <head-top :head-title="name" :go-back='true'></head-top>
    <section class="header_img">
      <img :src="imgBaseUrl + image_path" class="food_img" alt="">
      <div class="cover"></div>
    </section>
    <p class="description">{{ description }}</p>
    <section class="detail_container">
      <section class="detail_left">
        <p>{{ name }}</p>
        <div class="rating_sale">
          <span>评分</span>
          <rating-star :rating='rating'></rating-star>
          <span>{{ rating?.toFixed(1) }}</span>
        </div>
        <p>
          <span>月售 {{ month_sales }}单</span>
          <span>售价 ¥{{ foods?.specfoods[0].price }}</span>
          <span v-if="foods?.specfoods.length">起</span>
        </p>
        <p>
          <span>评论数 {{ rating_count }}</span>
          <span>好评率 {{ satisfy_rate }}%</span>
        </p>
      </section>
    </section>
  </div>
</template>

<style scoped lang="scss">
@import 'src/style/mixin';

.rating_page {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
  z-index: 12;
  padding-top: 1.95rem;

  p, span {
    font-family: Helvetica Neue, Tahoma, Arial;
  }
}

.header_img {
  position: relative;

  .food_img {
    width: 100%;
    display: block;
  }

  .cover {
    position: absolute;
    @include wh(100%, 100%);
    top: 0;
    left: 0;
  }
}

.description {
  @include sc(.6rem, #666);
  margin-top: .5rem;
  line-height: .8rem;
  bottom: .2rem;
  padding: 0 .4rem;
}

.detail_container {
  padding: .5rem;
  @include fj;
  align-items: center;

  .detail_left {
    p:nth-of-type(1) {
      @include sc(.7rem, #333);
      margin-bottom: .2rem;
    }

    .rating_sale {
      display: flex;
      align-items: center;

      span:nth-of-type(1) {
        @include sc(.6rem, #666);
        margin-right: .2rem;
      }

      span:nth-of-type(2) {
        @include sc(.55rem, #f60);
        margin-left: .2rem;
      }

      span:nth-of-type(3) {
        @include sc(.6rem, #666);
        margin-left: .4rem;
      }
    }

    p:nth-of-type(2) {
      font-size: 0;
      margin-top: .3rem;

      span:nth-of-type(1) {
        @include sc(.6rem, #666);
        margin-right: .4rem;
      }

      span:nth-of-type(2), span:nth-of-type(3) {
        @include sc(.6rem, #f60);
        margin-right: .2rem;
      }
    }

    p:nth-of-type(3) {
      span {
        @include sc(.6rem, #666);
      }
    }
  }
}
</style>
