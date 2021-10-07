<template>
    <span 
        v-if="totalQty > 0"
        class="cart-widget">
        Cart: ${{ totalPrice.toFixed(2) }} for <router-link :to="{name: 'cart'}">{{ totalQty }} item(s)</router-link>
    </span>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    computed: mapGetters({
        totalQty: 'product/cart/totalQty',
        totalPrice: 'product/cart/totalPrice',
    }),
}
</script>