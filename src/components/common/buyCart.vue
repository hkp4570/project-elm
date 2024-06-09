<script>
import {mapState, mapMutations} from 'vuex';

export default {
  props: ['foods', 'shopId'],
  data() {
    return {
      showMoveDot: [], //
    }
  },
  mounted() {
  },
  computed: {
    ...mapState(['cartList']),
    shopCart: function () {
      if (this.cartList[this.shopId]) {
        return Object.assign({}, this.cartList[this.shopId]);
      }
      return undefined;
    },
    foodNum() {
      let category_id = this.foods.category_id;
      let item_id = this.foods.item_id;
      if (this.shopCart && this.shopCart[category_id] && this.shopCart[category_id][item_id]) {
        let num = 0;
        Object.values(this.shopCart[category_id][item_id]).forEach((item, index) => {
          num += item.num;
        })
        return num;
      } else {
        return 0;
      }
    }
  },
  methods: {
    ...mapMutations(['add_cart']),
    // 显示规格列表
    showChooseList(foods) {
      this.$emit('showChooseList', foods);
    },
    addToCart(category_id, item_id, food_id, name, price, specs, packing_fee, sku_id, stock, event) {
      this.add_cart({
        shopid: this.shopId,
        category_id,
        item_id,
        food_id,
        name,
        price,
        specs,
        packing_fee,
        sku_id,
        stock
      });
      const elLeft = event.target.getBoundingClientRect().left;
      const elBottom = event.target.getBoundingClientRect().bottom;
      this.showMoveDot.push(true);
      this.$emit('showMoveDot', this.showMoveDot, elLeft, elBottom);
    }
  }
}
</script>

<template>
  <section class="cart_module">
    <!--    直接加入购物车-->
    <section class="cart_button" v-if="!foods.specifications.length">
      <transition name="showReduce">
        <span v-if="foodNum">
           <svg>
             <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-minus"></use>
           </svg>
        </span>
      </transition>
      <transition name="fade">
        <span class="cart_num" v-if="foodNum">{{ foodNum }}</span>
      </transition>
      <svg class="add_icon"
           @click="addToCart(foods.category_id, foods.item_id, foods.specfoods[0].food_id, foods.specfoods[0].name, foods.specfoods[0].price, '', foods.specfoods[0].packing_fee, foods.specfoods[0].sku_id, foods.specfoods[0].stock, $event)">
        >
        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-add"></use>
      </svg>
    </section>
    <!--    选规格-->
    <section v-else class="choose_specification">
      <section class="choose_icon_container">
        <transition name="showReduce">
          <svg class="specs_reduce_icon" v-if="foodNum">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-minus"></use>
          </svg>
        </transition>
        <transition name="fade">
          <span class="cart_num" v-if="foodNum">{{ foodNum }}</span>
        </transition>
        <span class="show_chooselist" @click.stop="showChooseList(foods)">选规格</span>
      </section>
    </section>
  </section>
</template>

<style scoped lang="scss">
@import '../../style/mixin';

.cart_module {
  .add_icon {
    position: relative;
    z-index: 9;
  }

  .cart_button {
    display: flex;
    align-items: center;
  }

  svg {
    @include wh(.9rem, .9rem);
    fill: #3190e8;
  }

  .specs_reduce_icon {
    fill: #999;
  }

  .cart_num {
    @include sc(.65rem, #666);
    min-width: 1rem;
    text-align: center;
    font-family: Helvetica Neue, Tahoma;
  }

  .choose_specification {
    .choose_icon_container {
      display: flex;
      align-items: center;

      .show_chooselist {
        display: block;
        @include sc(.55rem, #fff);
        padding: .1rem .2rem;
        background-color: $blue;
        border-radius: 0.2rem;
        border: 1px solid $blue;
      }
    }
  }
}

.showReduce-enter-active, .showReduce-leave-active {
  transition: all .3s ease-out;
}

.showReduce-enter, .showReduce-leave-active {
  opacity: 0;
  transform: translateX(1rem);
}

.fade-enter-active, .fade-leave-active {
  transition: all .3s;
}

.fade-enter, .fade-leave-active {
  opacity: 0;
}

.fadeBounce-enter-active, .fadeBounce-leave-active {
  transition: all .3s;
}

.fadeBounce-enter, .fadeBounce-leave-active {
  opacity: 0;
  transform: scale(.7);
}
</style>
