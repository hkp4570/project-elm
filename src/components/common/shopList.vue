<script>
import Loading from '@/components/common/loading.vue';
import RatingStar from "@/components/common/ratingStar.vue";
import {mapState} from 'vuex';
import {shopList} from "@/service/getData";
import Points from "@/pages/points/points.vue";

export default {
  props: ['geohash', 'restaurantCategoryId', 'restaurantCategoryIds'],
  components: {
    Points,
    Loading,
    RatingStar,
  },
  data() {
    return {
      offset: 0,
      shopListArr: [],
      touchend: false, // 是否还有更多数据
      showLoading: true, // 显示加载动画
      imgBaseUrl: 'https://elm.cangdu.org/img/',
      preventRepeatRequest: false, // 到达底部重新加载，防止重复加载
      showBackStatus: false, // 是否显示返回顶部按钮
    }
  },
  computed: {
    ...mapState(['latitude', 'longitude'])
  },
  mounted() {
    this.initData();
    window.addEventListener('scroll', this.onScroll);
  },
  methods: {
    async initData() {
      const res = await shopList(this.latitude, this.longitude, this.offset, this.restaurantCategoryId);
      this.shopListArr = [...res];
      if (res.length < 20) {
        this.touchend = true;
      }
      this.showLoading = false;
    },
    zhunshi(supports) {
      let status;
      if (Array.isArray(supports) && supports.length) {
        supports.forEach(s => {
          if (s.icon_name === '准') {
            status = true;
          }
        })
      } else {
        status = false;
      }
      return status;
    },
    // 返回顶部
    backTop() {
      // animate(document.body, {scrollTop: '0'}, 400, 'ease-out');
      window.scrollTo({top: 0, behavior: "smooth"});
    },
    async loadMore() {
      if (this.touchend || this.preventRepeatRequest) {
        return;
      }
      this.showLoading = true;
      this.preventRepeatRequest = true;

      this.offset += 20;
      const res = await shopList(this.latitude, this.longitude, this.offset, this.restaurantCategoryId);
      this.showLoading = false;
      this.shopListArr = [...this.shopListArr, ...res];
      if (res.length < 20) {
        this.touchend = true;
        return;
      }
      this.preventRepeatRequest = false;
    },
    onScroll() {
      if ((window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight) {
        this.loadMore();
      }
      if (window.scrollY > 500) {
        this.showBackStatus = true;
      } else {
        this.showBackStatus = false;
      }
    },
    // props变化后重新获取数据
    async listenPropChange() {
      this.showLoading = true;
      this.offset = 0;
      const data = await shopList(this.latitude, this.longitude, this.offset, '', this.restaurantCategoryIds);
      this.showLoading = false;
      this.shopListArr = [...data];
    }
  },
  watch: {
    // 监听父级传来的restaurantCategoryIds，当值发生变化的时候重新获取餐馆数据，作用于排序和筛选
    restaurantCategoryIds() {
      this.listenPropChange();
    }
  }
}
</script>

<template>
  <div class="shoplist_container">
    <ul v-if="shopListArr.length">
      <router-link to="" v-for="item in shopListArr" :key="item.id" tag="li" class="shop_li">
        <section>
          <img :src="imgBaseUrl + item.image_path" class="shop_img" alt="">
        </section>
        <hgroup class="shop_right">
          <header class="shop_detail_header">
            <h4 class="shop_title ellipsis" :class="item.is_premium ? 'premium':''">{{ item.name }}</h4>
            <ul class="shop_detail_ul">
              <li v-for="s in item.supports" :key="s.id" class="supports">{{ s.icon_name }}</li>
            </ul>
          </header>
          <h5 class="rating_order_num">
            <section class="rating_order_num_left">
              <section class="rating_section">
                <rating-star :rating="item.rating"></rating-star>
                <span class="rating_num">{{ item.rating }}</span>
              </section>
              <section class="order_section">
                月售{{ item.recent_order_num }}单
              </section>
            </section>
            <section class="rating_order_num_right">
              <span class="delivery_style delivery_left" v-if="item.delivery_mode">{{ item.delivery_mode.text }}</span>
              <span class="delivery_style delivery_right" v-if="zhunshi(item.supports)">准时达</span>
            </section>
          </h5>
          <h5 class="fee_distance">
            <p class="fee">
              ¥{{ item.float_minimum_order_amount }}起送
              <span class="segmentation">/</span>
              {{ item.piecewise_agent_fee.tips }}
            </p>
            <p class="distance_time">
              <span v-if="Number(item.distance)">
                {{ item.distance > 1000 ? (item.distance / 1000).toFixed(2) + 'km' : item.distance + 'm' }}
                <span class="segmentation">/</span>
              </span>
              <span v-else>{{ item.distance }}</span>
              <span class="segmentation">/</span>
              <span class="order_time">{{ item.order_lead_time }}</span>
            </p>
          </h5>
        </hgroup>
      </router-link>
    </ul>
    <ul v-else class="animation_opactiy">
      <li class="list_back_li" v-for="i in 10" :key="i">
        <img src="@/assets/shopback.svg" class="list_back_svg" alt="">
      </li>
    </ul>
    <p v-if="touchend" class="empty_data">没有更多了</p>
    <aside class="return_top" @click="backTop" v-if="showBackStatus">
      <svg class="back_top_svg">
        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#backtop"></use>
      </svg>
    </aside>
    <loading v-show="showLoading"></loading>
  </div>
</template>

<style scoped lang="scss">
@import 'src/style/mixin';

.shoplist_container {
  background-color: #fff;
  margin-bottom: 2rem;
}

.shop_li {
  display: flex;
  border-bottom: 0.025rem solid #f1f1f1;
  padding: 0.7rem 0.4rem;
}

.shop_img {
  @include wh(2.7rem, 2.7rem);
  display: block;
  margin-right: 0.4rem;
}

.list_back_li {
  height: 4.85rem;

  .list_back_svg {
    @include wh(100%, 100%)
  }
}

.shop_right {
  flex: auto;

  .shop_detail_header {
    @include fj;
    align-items: center;

    .shop_title {
      width: 8.5rem;
      color: #333;
      padding-top: .01rem;
      @include font(0.65rem, 0.65rem, 'PingFangSC-Regular');
      font-weight: 700;
    }

    .premium::before {
      content: '品牌';
      display: inline-block;
      font-size: 0.5rem;
      line-height: .6rem;
      color: #333;
      background-color: #ffd930;
      padding: 0 0.1rem;
      border-radius: 0.1rem;
      margin-right: 0.2rem;
    }

    .shop_detail_ul {
      display: flex;
      transform: scale(.8);
      margin-right: -0.3rem;

      .supports {
        @include sc(0.5rem, #999);
        border: 0.025rem solid #f1f1f1;
        padding: 0 0.04rem;
        border-radius: 0.08rem;
        margin-left: 0.05rem;
      }
    }
  }

  .rating_order_num {
    @include fj(space-between);
    height: 0.6rem;
    margin-top: 0.52rem;

    .rating_order_num_left {
      @include fj(flex-start);

      .rating_section {
        display: flex;

        .rating_num {
          @include sc(0.4rem, #ff6000);
          margin: 0 0.2rem;
        }
      }

      .order_section {
        transform: scale(.8);
        margin-left: -0.2rem;
        @include sc(0.4rem, #666);
      }
    }

    .rating_order_num_right {
      display: flex;
      align-items: center;
      transform: scale(.7);
      min-width: 5rem;
      justify-content: flex-end;
      margin-right: -0.8rem;

      .delivery_style {
        font-size: 0.4rem;
        padding: 0.04rem 0.08rem 0;
        border-radius: 0.08rem;
        margin-left: 0.08rem;
        border: 1px;
      }

      .delivery_left {
        color: #fff;
        background-color: $blue;
        border: 0.025rem solid $blue;
      }

      .delivery_right {
        color: $blue;
        border: 0.025rem solid $blue;
      }
    }
  }

  .fee_distance {
    margin-top: 0.52rem;
    @include fj;
    @include sc(0.5rem, #333);

    .fee {
      transform: scale(.9);
      @include sc(0.5rem, #666);
    }

    .distance_time {
      transform: scale(.9);

      span {
        color: #999;
      }

      .order_time {
        color: $blue;
      }

      .segmentation {
        color: #ccc;
      }
    }
  }
}

.loader_more {
  @include font(0.6rem, 3);
  text-align: center;
  color: #999;
}

.empty_data {
  @include sc(0.5rem, #666);
  text-align: center;
  line-height: 2rem;
}

.return_top {
  position: fixed;
  bottom: 3rem;
  right: 1rem;

  .back_top_svg {
    @include wh(2rem, 2rem);
  }
}

.loading-enter-active, .loading-leave-active {
  transition: opacity 1s
}

.loading-enter, .loading-leave-active {
  opacity: 0
}
</style>