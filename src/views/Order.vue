<template>
  <div class="flex flex-wrap">
    <div v-for="(order, iOrder) in orders" :key="iOrder" :class="[$store.state.gridView ? $store.state.gridView : 'w-full']" class="p-2">
      <div class="rounded overflow-hidden shadow">
        <div class="px-6 py-4 bg-gray-100">
          <div class="font-bold border-b pb-2">#{{ order.id }} : {{ order.recipient_name }} | {{ $price(order.jml_bayar) }}</div>
          <div v-for="(product, iProduct) in order.data_order" :key="iProduct" class="inline-block p-2" style="width: 200px;">
            <div class="rounded overflow-hidden shadow">
              <img class="w-full" :src="product.foto">
              <div class="px-6 py-4 bg-white">
                <div class="font-bold mb-1 text-center">{{ product.nama }} - {{ product.size }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'order',
  data () {
    return {
      orders: []
    }
  },
  mounted () {
    this.loadOrders()
  },
  methods: {
    loadOrders (page) {
      this.$store.dispatch('LOAD_ORDERS').then(res => {
        if (res.status === 200 || res.status === 201) {
          this.orders = res.data.map(r => {
            r.data_order = JSON.parse(r.data_order)
            return r
          })
        } else {
          this.orders = []
        }
      })
    }
  }
}
</script>
