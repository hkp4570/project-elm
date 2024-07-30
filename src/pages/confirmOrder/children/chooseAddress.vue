<script>
import HeadTop from '@/components/header/head.vue';
import {mapState} from 'vuex';
import {getAddressList} from '@/service/getData';

export default {
  components: {
    HeadTop,
  },
  data() {
    return {
      id: null,
      sig: null,
      addressList: [], //地址列表
      deliverable: [], //有效地址列表
      deliverdisable: [], //无效地址列表
    }
  },
  created() {
    this.id = this.$route.query.id;
    this.sig = this.$route.query.sig;
  },
  computed: {
    ...mapState(['userInfo', 'addressIndex']),
    defaultIndex: function () {
      if (this.addressIndex) {
        return this.addressIndex;
      } else {
        return 0;
      }
    }
  },
  methods: {
    async initData() {
      this.addressList = [];
      this.deliverable = [];
      this.deliverdisable = [];
      if (this.userInfo && this.userInfo.user_id) {
        this.addressList = await getAddressList(this.userInfo.user_id);
        this.addressList.forEach(item => {
          if (item.is_deliverable) {
            this.deliverable.push(item);
          } else {
            this.deliverdisable.push(item);
          }
        })
      }
    },
    iconColor(name) {
      switch (name) {
        case '公司':
          return '#4cd964';
        case '学校':
          return '#3190e8';
      }
    },
  },
  watch: {
    userInfo: function (value) {
      if (value && value.user_id) {
        this.initData();
      }
    }
  }
}
</script>

<template>
  <div class="rating_page">
    <head-top head-title="选择地址" :go-back="true"></head-top>
    <router-link to="" class="add_icon_footer">
      <img src="../../../assets/add_address.png" height="24" width="24" alt="">
      <span>新增收货地址</span>
    </router-link>
    <section id="scroll_section" class="scroll_container">
      <section class="list_cotainer">
        <ul class="deliverable_address">
          <li v-for="(item,index) in deliverable" @click.prevent.stop="chooseAddress(item, index)">
            <svg class="choosed_address" :class="{default_address: defaultIndex === index}">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#select"></use>
            </svg>
            <div>
              <header>
                <span>{{ item.name }}</span>
                <span>{{ item.sex === 1 ? '先生' : '女士' }}</span>
                <span>{{ item.phone }}</span>
              </header>
              <div class="address_detail ellipsis">
                <span v-if="item.tag" :style="{backgroundColor: iconColor(item.tag)}">{{ item.tag }}</span>
                <p>{{ item.address_detail }}</p>
              </div>
            </div>
          </li>
        </ul>
        <section id="out_delivery" v-if="deliverdisable.length">
          <header class="out_header">以下地址超出配送范围</header>
          <ul class="deliverable_address">
            <li v-for="(item) in deliverdisable">
              <svg class="choosed_address">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#select"></use>
              </svg>
              <div>
                <header>
                  <span>{{ item.name }}</span>
                  <span>{{ item.sex === 1 ? '先生' : '女士' }}</span>
                  <span>{{ item.phone }}</span>
                </header>
                <div class="address_detail ellipsis">
                  <span v-if="item.tag" :style="{backgroundColor: '#ccc', color: '#fff'}">{{ item.tag }}</span>
                  <p>{{ item.address_detail }}</p>
                </div>
              </div>
            </li>
          </ul>
        </section>
      </section>
    </section>
  </div>
</template>

<style scoped lang="scss">
@import 'src/style/mixin';

.rating_page {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
  z-index: 202;
  padding-top: 1.95rem;

  p, span {
    font-family: Helvetica Neue, Tahoma, Arial;
  }
}

.scroll_container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding-top: 1.95rem;
  overflow-y: auto;
}

.list_cotainer {
  padding-bottom: 5rem;
}

.add_icon_footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2.5rem;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 204;

  span {
    @include sc(.7rem, $blue);
    margin-left: .3rem;
  }
}

.deliverable_address {
  background-color: #fff;

  li {
    display: flex;
    align-items: center;
    border-bottom: 0.025rem solid #f5f5f5;
    padding: .7rem;
    line-height: 1rem;

    .choosed_address {
      @include wh(.8rem, .8rem);
      fill: #4cd964;
      margin-right: .4rem;
      opacity: 0;
    }

    .default_address {
      opacity: 1;
    }

    header {
      @include sc(.7rem, #333);

      span:nth-of-type(1) {
        font-size: .8rem;
        font-weight: bold;
      }
    }

    .address_detail {
      width: 100%;
      display: flex;
      align-items: center;

      span {
        @include sc(.5rem, #fff);
        border-radius: .15rem;
        background-color: #ff5722;
        height: .6rem;
        line-height: .6rem;
        padding: 0 .2rem;
        margin-right: .3rem;
      }

      p {
        @include sc(.6rem, #777);
      }
    }
  }
}

#out_delivery {
  .out_header {
    @include sc(.6rem, #666);
    line-height: 1.5rem;
    padding-left: .5rem;
    background-color: #f5f5f5;
  }

  * {
    color: #ccc;
  }
}

.router-slid-enter-active, .router-slid-leave-active {
  transition: all .4s;
}

.router-slid-enter, .router-slid-leave-active {
  transform: translate3d(2rem, 0, 0);
  opacity: 0;
}
</style>
