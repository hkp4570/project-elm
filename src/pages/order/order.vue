<script>
import HeadTop from "@/components/header/head.vue";
import FootGuide from "@/components/footer/footGuide.vue";
import ComputeTime from "@/components/common/computeTime.vue";
import {mapState, mapMutations} from 'vuex';
import {getOrderList} from '@/service/getData.js';
import Loading from '@/components/common/loading.vue';
import {loadMore} from '@/mixin/minix.js';
import {imgBaseUrl} from '@/utils/index.js';

export default {
  components: {
    HeadTop,
    FootGuide,
    Loading,
    ComputeTime,
  },
  data() {
    return {
      showLoading: true,
      offset: 0,
      orderList: null, // 订单列表
      imgBaseUrl,
      preventRepeat: false,
    }
  },
  mixins: [loadMore],
  computed: {
    ...mapState(['userInfo', 'geohash'])
  },
  mounted() {
    this.initData();
  },
  methods: {
    ...mapMutations(['save_order']),
    async initData() {
      if (this.userInfo && this.userInfo.user_id) {
        let res = await getOrderList(this.userInfo.user_id, this.offset);
        this.orderList = [...res];
        this.showLoading = false;
      } else {
        this.showLoading = true;
      }
    },
    async loaderMore() {
      if (this.preventRepeat) {
        return
      }
      this.preventRepeat = true;
      this.showLoading = true;
      this.offset += 10;
      //获取信息
      let res = await getOrderList(this.userInfo.user_id, this.offset);
      this.orderList = [...this.orderList, ...res];
      this.showLoading = false;
      if (res.length < 10) {
        return
      }
      this.preventRepeat = false;
    },
    // 显示详情
    showDetail(item) {
      // console.log(item, 'item')
      this.save_order(item);
      this.preventRepeat = true;
      this.$router.push('/order/orderDetail/' + item.unique_id);
    }
  },
  watch: {
    userInfo: function (value) {
      if (value && value.user_id && !this.orderList) {
        this.initData();
      }
    }
  }
}
</script>

<template>
  <div class="order_page">
    <head-top head-title="订单列表" :go-back="true"></head-top>
    <ul class="order_list_ul" v-load-more="loaderMore">
      <li class="order_list_li" v-for="item in orderList" :key="item.id">
        <img class="restaurant_image" :src="imgBaseUrl + item.restaurant_image_url" alt="">
        <section class="order_item_right">
          <section @click="showDetail(item)">
            <header class="order_item_right_header">
              <section class="order_header">
                <h4>
                  <span class="ellipsis">{{ item.restaurant_name }} </span>
                  <svg fill="#333" class="arrow_right">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                  </svg>
                </h4>
                <p class="order_time">{{ item.formatted_created_at }}</p>
              </section>
              <p class="order_status">
                {{ item.status_bar.title }}
              </p>
            </header>
            <section class="order_basket">
              <p class="order_name ellipsis">
                {{
                  item.basket.group[0][0].name
                }}{{ item.basket.group[0].length > 1 ? ' 等' + item.basket.group[0].length + '件商品' : '' }}</p>
              <p class="order_amount">¥{{ item.total_amount.toFixed(2) }}</p>
            </section>
          </section>
          <div class="order_again">
            <compute-time v-if="item.status_bar.title == '等待支付'" :time="item.time_pass"></compute-time>
            <router-link :to="{path: '/shop', query: {geohash, id: item.restaurant_id}}" tag="span" class="buy_again"
                         v-else>再来一单
            </router-link>
          </div>
        </section>
      </li>
    </ul>
    <foot-guide></foot-guide>
    <transition name="loading">
      <loading v-show="showLoading"></loading>
    </transition>
  </div>
</template>

<style scoped lang="scss">
@import 'src/style/mixin';

.order_page {
  background-color: #f1f1f1;
  margin-bottom: 1.95rem;

  p, span, h4 {
    font-family: Helvetica Neue, Tahoma, Arial;
  }
}

.order_list_ul {
  padding-top: 1.95rem;

  .order_list_li {
    background-color: #fff;
    display: flex;
    margin-bottom: 0.5rem;
    padding: .6rem .6rem 0;

    .restaurant_image {
      @include wh(2rem, 2rem);
      margin-right: 0.4rem;
    }

    .order_item_right {
      flex: 5;

      .order_item_right_header {
        border-bottom: 0.025rem solid #f5f5f5;
        padding-bottom: .3rem;
        @include fj;

        .order_header {
          h4 {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            @include sc(.75rem, #333);
            line-height: 1rem;
            width: 9rem;

            .arrow_right {
              @include wh(.4rem, .4rem);
              fill: #ccc;
              margin-right: .2rem;
            }
          }

          .order_time {
            @include sc(.55rem, #999);
            line-height: .8rem;
          }
        }

        .order_status {
          @include sc(.6rem, #333);
        }
      }

      .order_basket {
        @include fj;
        line-height: 2rem;
        border-bottom: 0.025rem solid #f5f5f5;

        .order_name {
          @include sc(.6rem, #666);
          width: 10rem;
        }

        .order_amount {
          @include sc(.6rem, #f60);
          font-weight: bold;
        }
      }

      .order_again {
        text-align: right;
        line-height: 1.6rem;

        .buy_again {
          @include sc(.55rem, #3190e8);
          border: 0.025rem solid #3190e8;
          padding: .1rem .2rem;
          border-radius: .15rem;
        }
      }
    }
  }
}

.loading-enter-active, .loading-leave-active {
  transition: opacity .7s
}

.loading-enter, .loading-leave-active {
  opacity: 0
}

.router-slid-enter-active, .router-slid-leave-active {
  transition: all .4s;
}

.router-slid-enter, .router-slid-leave-active {
  transform: translate3d(2rem, 0, 0);
  opacity: 0;
}
</style>
