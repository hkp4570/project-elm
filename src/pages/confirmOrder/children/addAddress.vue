<script>
import HeadTop from '@/components/header/head.vue';
import AlterTip from "@/components/common/alterTip.vue";
import {mapState, mapMutations} from "vuex";
import {postAddAddress} from '@/service/getData';

const tags = {
  '家': 2,
  '学校': 3,
  '公司': 4,
}
export default {
  components: {
    HeadTop,
    AlterTip,
  },
  data() {
    return {
      name: null,
      sex: 1,
      phone: null,
      anntherPhoneNumber: null, // 备用电话
      address_detail: null, // 详细地址
      phone_bk: false, // 是否选择备注电话
      tag: '', // 备注
      showAlter: false,
      alterText: '',
      tag_type: 1,
    }
  },
  computed: {
    ...mapState(['userInfo', 'searchAddress', 'geohash'])
  },
  methods: {
    ...mapMutations(['confirm_address']),
    chooseSex(sex) {
      this.sex = sex;
    },
    async addAddress() {
      if (!this.userInfo || !this.userInfo.user_id) {
        this.showAlter = true;
        this.alterText = '请登录'
      } else if (!this.name) {
        this.showAlter = true;
        this.alterText = '请输入名字'
      } else if (!this.phone) {
        this.showAlter = true;
        this.alterText = '请输入手机号'
      } else if (!this.searchAddress) {
        this.showAlter = true;
        this.alterText = '请选择地址'
      } else if (!this.address_detail) {
        this.showAlter = true;
        this.alterText = '请选择详细地址'
      }
      this.tag_type = tags[this.tag] || 1;
      const res = await postAddAddress(this.userInfo.user_id, this.searchAddress.name, this.address_detail, this.geohash, this.name, this.phone, this.anntherPhoneNumber, 0, this.sex, this.tag, this.tag_type);
      if (res.message) {
        this.showAlert = true;
        this.alertText = res.message;
      } else {
        this.confirm_address(1);
        this.$router.go(-1);
      }
    }
  }
}
</script>

<template>
  <div class="address_page">
    <head-top head-title="添加地址" :go-back='true'></head-top>
    <section class="page_text_container">
      <section class="section_list">
        <span class="section_left">联系人</span>
        <section class="section_right">
          <input type="text" name="name" placeholder="你的名字" v-model="name" class="input_style">
          <div class="choose_sex">
                        <span class="choose_option">
                            <svg class="address_empty_right" @click="chooseSex(1)" :class="{choosed: sex === 1}">
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#select"></use>
                            </svg>
                            <span>先生</span>
                        </span>
            <span class="choose_option">
                            <svg class="address_empty_right" @click="chooseSex(2)" :class="{choosed: sex === 2}">
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#select"></use>
                            </svg>
                            <span>女士</span>
                        </span>
          </div>
        </section>
      </section>
      <section class="section_list">
        <span class="section_left">联系电话</span>
        <section class="section_right">
          <div class="phone_add">
            <input type="number" name="phone" placeholder="你的手机号" v-model="phone" class="input_style">
            <img src="../../../assets/add_phone.png" height="20" width="20" @click="phone_bk = true">
          </div>
          <input v-if="phone_bk" type="number" name="anntherPhoneNumber" placeholder="备选电话"
                 v-model="anntherPhoneNumber" class="input_style phone_bk">
        </section>
      </section>
      <section class="section_list">
        <span class="section_left">送餐地址</span>
        <section class="section_right">
          <router-link to="/confirmOrder/searchAddress" tag="div" class="choose_address">
            {{ searchAddress ? searchAddress.name : '小区/写字楼/学校等' }}
          </router-link>
          <input type="text" name="address_detail" placeholder="详细地址（如门牌号等）" v-model="address_detail"
                 class="input_style">

        </section>
      </section>
      <section class="section_list">
        <span class="section_left">标签</span>
        <section class="section_right">
          <input type="text" name="tag" placeholder="无/家/学校/公司" v-model="tag" class="input_style">
        </section>
      </section>
    </section>
    <div class="determine" @click="addAddress">确定</div>
    <alter-tip v-if="showAlter" @closeTip="showAlter = false" :alterText="alterText"></alter-tip>
  </div>
</template>

<style scoped lang="scss">
@import 'src/style/mixin';

.address_page {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #f5f5f5;
  z-index: 204;
  padding-top: 1.95rem;

  p, span, input {
    font-family: Helvetica Neue, Tahoma, Arial;
  }
}

.page_text_container {
  background-color: #fff;
  padding: 0 .7rem;
}

.section_list {
  display: flex;
  border-bottom: 0.025rem solid #f5f5f5;

  .section_left {
    @include sc(.7rem, #333);
    flex: 2;
    line-height: 2.5rem;
  }

  .section_right {
    flex: 5;

    .input_style {
      width: 100%;
      height: 2.5rem;
      @include sc(.7rem, #999);
    }

    .phone_bk {
      border-top: 0.025rem solid #f5f5f5;
    }

    .phone_add {
      @include fj;
      align-items: center;
    }

    .choose_sex {
      display: flex;
      line-height: 2.5rem;
      border-top: 0.025rem solid #f5f5f5;

      .choose_option {
        @include sc(.7rem, #333);
        display: flex;
        align-items: center;
        margin-right: .8rem;

        svg {
          margin-right: .3rem;
          @include wh(.8rem, .8rem);
          fill: #ccc;
        }

        .choosed {
          fill: #4cd964;
        }
      }
    }

    .choose_address {
      @include sc(.7rem, #999);
      line-height: 2.5rem;
      border-bottom: 0.025rem solid #f5f5f5;
    }
  }
}

.determine {
  background-color: #4cd964;
  @include sc(.7rem, #fff);
  text-align: center;
  margin: 0 .7rem;
  line-height: 1.8rem;
  border-radius: 0.2rem;
  margin-top: .6rem;
}

.router-slid-enter-active, .router-slid-leave-active {
  transition: all .4s;
}

.router-slid-enter, .router-slid-leave-active {
  transform: translate3d(2rem, 0, 0);
  opacity: 0;
}
</style>
