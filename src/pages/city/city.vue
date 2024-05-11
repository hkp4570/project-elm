<script>
import HeadTop from '@/components/header/head.vue';
import {currentcity, searchplace} from '@/service/getData';

export default {
  components: {
    HeadTop,
  },
  data() {
    return {
      cityname: '', // 当前城市名字
      inputValue: '', // 输入框的值
      cityid: '', // 当前城市id
      placeNone: false, // 搜索无结果显示信息
      historytitle: true, // 默认显示历史记录，点击搜索后隐藏
      placelist: [], // 搜索结果
    }
  },
  mounted() {
    this.cityid = this.$route.params.cityid;
    // 获取当前城市名字
    currentcity(this.cityid).then(res => {
      this.cityname = res.name;
    })
  },
  methods: {
    postpois() {
      if (this.inputValue) {
        searchplace(this.cityid, this.inputValue).then(res => {
          this.historytitle = false;
          this.placelist = res;
          this.placeNone = !res.length;
        })
      }
    },
    nextpage(){

    }
  }
}
</script>

<template>
  <div class="city_container">
    <head-top :head-title="cityname" :go-back="true">
      <router-link class="change_city" to="/home" slot="changecity">切换城市</router-link>
    </head-top>
    <form class="city_form" v-on:submit.prevent>
      <div>
        <input type="search" name="city" placeholder="输入学校、商务楼、地址" class="city_input input_style" required
               v-model="inputValue">
      </div>
      <div>
        <input type="submit" name="submit" value="提交" class="city_submit input_style" @click="postpois">
      </div>
    </form>
    <header v-if="historytitle" class="pois_search_history">搜索历史</header>
    <ul class="getpois_ul">
      <li v-for="(item,index) in placelist" :key="index" @click="nextpage">
        <h4 class="pois_name ellipsis">{{ item.name }}</h4>
        <p class="pois_address ellipsis">{{ item.address }}</p>
      </li>
    </ul>
    <div class="search_none_place" v-if="placeNone">很抱歉！无搜索结果</div>
  </div>
</template>

<style scoped lang="scss">
@import "~@/style/mixin.scss";

.city_container {
  padding-top: 2.35rem;
}

.change_city {
  right: 0.4rem;
  @include sc(0.6rem, #fff);
  @include ct;
}

.city_form {
  background-color: #fff;
  border-top: 1px solid $bc;
  border-bottom: 1px solid $bc;
  padding-top: 0.4rem;

  div {
    width: 90%;
    margin: 0 auto;
    text-align: center;

    .input_style {
      border-radius: 0.1rem;
      margin-bottom: 0.4rem;
      @include wh(100%, 1.4rem);
    }

    .city_input {
      border: 1px solid $bc;
      padding: 0 0.3rem;
      @include sc(0.65rem, #333);
    }

    .city_submit {
      background-color: $blue;
      @include sc(0.65rem, #fff);
    }
  }
}

.pois_search_history {
  border-top: 1px solid $bc;
  border-bottom: 1px solid $bc;
  padding-left: 0.5rem;
  @include font(0.475rem, 0.8rem);
}

.getpois_ul {
  background-color: #fff;
  border-top: 1px solid $bc;

  li {
    margin: 0 auto;
    padding-top: 0.65rem;
    border-bottom: 1px solid $bc;

    .pois_name {
      margin: 0 auto 0.35rem;
      width: 90%;
      @include sc(0.65rem, #333);
    }

    .pois_address {
      width: 90%;
      margin: 0 auto 0.55rem;
      @include sc(0.45rem, #999);
    }
  }
}

.search_none_place {
  margin: 0 auto;
  @include font(0.65rem, 1.75rem);
  color: #333;
  background-color: #fff;
  text-indent: 0.5rem;
}

.clear_all_history {
  @include sc(0.7rem, #666);
  text-align: center;
  line-height: 2rem;
  background-color: #fff;
}
</style>