<script>
import HeadTop from '@/components/header/head.vue';
import {searchNearby} from '@/service/getData.js';
import {mapMutations, mapState} from 'vuex';

export default {
  components: {
    HeadTop
  },
  data() {
    return {
      inputAddress: '',
      warning: true,
      addressList: [],
    }
  },
  created() {
    this.inputAddress = this.addAddress ? this.addAddress : this.inputAddress;
    this.inputThing();
  },
  computed: {
    ...mapState(['addAddress'])
  },
  methods: {
    ...mapMutations(['setState']),
    inputThing() {
      if (this.inputAddress === '') {
        this.warning = true;
        this.addressList = [];
        return;
      }
      searchNearby(this.inputAddress).then(res => {
        this.addressList = res;
        this.warning = false;
      })
    },
    listClick(index) {
      this.setState({addAddress: this.addressList[index].name});
      this.$router.go(-1);
    }
  },
}
</script>

<template>
  <div class="rating_page">
    <head-top head-title="搜索地址" :go-back="true"></head-top>
    <section>
      <div class="add-detail">
        <input type="text" placeholder="请输入小区/写字楼/学校等" v-model="inputAddress"/>
        <button @click="inputThing">确认</button>
      </div>
      <div class="warnpart">为了满足商家的送餐要求，建议您从列表中选择地址</div>
      <div class="point" v-show="warning">
        <p>找不到地址？</p>
        <p>请尝试输入小区、写字楼或学校名</p>
        <p>详细地址（如门牌号）可稍后输入哦。</p>
      </div>
    </section>
    <section class="poisearch-container" v-show="addressList">
      <ul>
        <li v-for="(item,index) of addressList" :key="index" @click="listClick(index)">
          <p>{{ item.name }}</p>
          <p>{{ item.address }}</p>
        </li>
      </ul>
    </section>
  </div>
</template>

<style scoped lang="scss">
@import 'src/style/mixin';

.rating_page {
  padding-top: 1.95rem;

  p, span {
    font-family: Helvetica Neue, Tahoma, Arial;
  }
}

.add-detail {
  @include fj(space-between);
  background: #fff;
  padding: .5rem;

  input {
    display: block;
    width: 11.8rem;
    padding: .4rem;
    background: #f2f2f2;
    border: 1px solid #ddd;
    @include borderRadius(5px);
    font-size: .6rem;
  }

  button {
    display: block;
    width: 3rem;
    background: #3199e8;
    @include sc(.7rem, #fff);
    @include borderRadius(5px);
  }
}

.warnpart {
  background: #FFF6E4;
  @include sc(.62rem, #FF883F);
  text-align: center;
  padding: .2rem 0;
}

.point {
  @include center;
  width: 100%;

  p {
    width: 100%;
    text-align: center;
    @include sc(.7rem, #969696);
    margin-bottom: .4rem;
  }
}

.poisearch-container {
  background: #f2f2f2;

  li {
    border-bottom: 1px solid #ccc;
    padding: .4rem;

    p {
      @include sc(.65rem, #969696);
    }

    p:first-child {
      margin-bottom: .2rem;
    }
  }

  li:last-child {
    border: 0;
  }
}
</style>