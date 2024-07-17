<script>
import HeadTop from '@/components/header/head.vue';
import AlterTip from "@/components/common/alterTip.vue";
import {regPhone} from '@/utils/index.js';
import {postAddAddress} from '@/service/getData.js';
import {mapState, mapMutations} from 'vuex';

export default {
  components: {
    HeadTop,
    AlterTip,
  },
  data() {
    return {
      verifyName: false,
      name: '',
      verifyFoodAddress: false,
      foodAddress: '',
      sendaddress: '',
      telenum: '',
      verifyTelenum: false,
      telephone: '',
      verifySparePhone: false,
      sparePhone: '',
      sparePhoneTip: '',
      alterText: '',
      showAlert: false,
    }
  },
  computed: {
    ...mapState(['userInfo', 'geohash', 'addAddress'])
  },
  methods: {
    ...mapMutations(['add_removeList']),
    inputName() {
      this.verifyName = !this.name;
    },
    inputFoodAddress() {
      this.verifyFoodAddress = true;
      if (this.foodAddress.length === 0) {
        this.sendaddress = '请填写详细的送餐地址';
      } else if (this.foodAddress.length > 0 && this.foodAddress.length < 2) {
        this.sendaddress = '送餐地址太短了，不能辨识';
      } else {
        this.sendaddress = '';
        this.verifyFoodAddress = false;
      }
    },
    inputTelenum() {
      this.verifyTelenum = true;
      if (regPhone.test(this.telenum)) {
        this.verifyTelenum = false;
      } else if (this.telenum === '') {
        this.telephone = '手机号不能为空';
      } else {
        this.telephone = '手机号格式不正确';
      }
    },
    inputSparePhone() {
      this.verifySparePhone = true;
      if (!regPhone.test(this.sparePhone) || this.sparePhone === '') {
        this.sparePhoneTip = '请填写正确的手机号';
      } else {
        this.verifySparePhone = false;
        this.sparePhoneTip = '';
      }
    },
    submitThing() {
      if (!this.name || !this.addAddress || !this.foodAddress || !this.telenum) return;
      postAddAddress(this.userInfo.user_id, this.foodAddress, this.addAddress, this.geohash, this.name, this.telenum, this.sparePhone, 0, 1, '公司', 4).then(res => {
        if (res.message) {
          this.alterText = res.message;
          this.showAlert = true;
        } else {
          this.add_removeList({
            name: this.name,
            address: this.foodAddress,
            address_detail: this.addAddress,
            geohash: 'wtw37r7cxep4',
            phone: this.telenum,
            phone_bk: this.sparePhone,
            poi: this.addAddress,
            poi_type: 0,
          })
          this.$router.go(-1);
        }
      })
    }
  }
}
</script>

<template>
  <div class="rating_page">
    <head-top :head-title="'新增地址'" :go-back="true"></head-top>
    <section class="adddetail">
      <form action="" v-on:submit.prevent>
        <section class="ui-padding-block">
          <div class="input-new">
            <input type="text" placeholder="请填写您的姓名" :class="{verifies: verifyName}" v-model="name"
                   @input="inputName"/>
            <p v-if="verifyName">提示：请填写您的姓名</p>
          </div>
          <router-link to="/profile/addaddressdetail" class="add-detail">
            <div class="input-new">
              <input type="text" placeholder="小区/写字楼/学校等" readonly="readonly" v-model="addAddress"/>
            </div>
          </router-link>
          <div class="input-new">
            <input type="text" placeholder="请填写详细送餐地址" :class="{verifies: verifyFoodAddress}"
                   v-model="foodAddress" @input="inputFoodAddress"/>
            <p v-if="verifyFoodAddress">{{ sendaddress }}</p>
          </div>
          <div class="input-new">
            <input type="text" placeholder="请填写您的手机号码" :class="{verifies: verifyTelenum}" maxlength="11"
                   @input="inputTelenum"
                   v-model="telenum"/>
            <p v-if="verifyTelenum">{{ telephone }}</p>
          </div>
          <div class="input-new">
            <input type="text" placeholder="备用联系电话（选填）" maxlength="11" @input="inputSparePhone"
                   v-model="sparePhone"/>
            <p v-if="verifySparePhone">{{ sparePhoneTip }}</p>
          </div>
        </section>
        <section class="addbutton">
          <button @click="submitThing">新增地址</button>
        </section>
      </form>
    </section>
    <AlterTip v-if="showAlert" :alter-text="alterText" @closeTip="showAlert=false"></AlterTip>
  </div>
</template>

<style scoped lang="scss">
@import 'src/style/mixin';

.router-slid-enter-active, .router-slid-leave-active {
  transition: all .4s;
}

.router-slid-enter, .router-slid-leave-active {
  transform: translate3d(2rem, 0, 0);
  opacity: 0;
}

.rating_page {
  padding-top: 1.95rem;

  p, span {
    font-family: Helvetica Neue, Tahoma, Arial;
  }
}

.adddetail {
  margin-top: .4rem;
}

.ui-padding-block {
  background: #fff;
  padding-top: .4rem;

  .add-detail {
    display: block;
  }

  .input-new {
    padding-bottom: .4rem;

    input {
      display: block;
      width: 15rem;
      font-size: .6rem;
      margin: 0 auto;
      padding: .3rem;
      background: #f2f2f2;
      border: 1px solid #ddd;
      @include borderRadius(3px);
    }

    .verifies {
      border-color: #ea3106;
    }

    p {
      @include sc(.4rem, #ea3106);
      padding-left: .5rem;
      margin-top: .2rem;
    }
  }

}

.addbutton {
  margin: .6rem auto;
  width: 15rem;
  background: #4cd964;
  @include borderRadius(3px);

  button {
    width: 100%;
    @include sc(.6rem, #fff);
    line-height: 1.6rem;
    background: none;
    font-weight: 700;
    opacity: .6;
  }

  .butopacity {
    transition: all .4s;
    opacity: 1;
  }
}
</style>
