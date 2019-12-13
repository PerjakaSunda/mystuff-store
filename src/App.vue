<template>
  <div id="app" class="container h-full mx-auto bg-gray-100">
    <div v-if="$route.name === 'home'" class="fixed left-0 w-full py-2 pr-2 pl-2 bg-white z-10 shadow-inner">
      <ul class="flex">
        <li class="flex-1 mr-2 border-r">
          <span class="text-center block py-2 px-4 text-purple-600 text-sm">
            <span class="font-bold">{{ $price($getTotalPrice($store.state.mycarts)) }}</span>
          </span>
        </li>
        <li class="flex-1 mr-2">
          <a
            :class="[!$store.state.gridView || $store.state.gridView === 'w-1/4' ? 'text-red-400' : '']"
            class="text-center block py-2 px-4 hover:text-red-600 text-sm"
            href="#"
            @click.prevent="$store.commit('setGrid', 'w-1/4')"
          >
            SMALL
          </a>
        </li>
        <li class="flex-1 mr-2">
          <a
            :class="[$store.state.gridView === 'w-1/3' ? 'text-red-400' : '']"
            class="text-center block py-2 px-4 hover:text-red-600 text-sm"
            href="#"
            @click.prevent="$store.commit('setGrid', 'w-1/3')"
          >
            MEDIUM
          </a>
        </li>
        <li class="text-center flex-1">
          <a
            :class="[$store.state.gridView === 'w-1/2' ? 'text-red-400' : '']"
            class="text-center block py-2 px-4 hover:text-red-600 text-sm"
            href="#"
            @click.prevent="$store.commit('setGrid', 'w-1/2')"
          >
            BIG
          </a>
        </li>
      </ul>
    </div>
    <div class="flex h-full bg-white">
      <div v-if="$route.name === 'home'" class="w-1/4 h-full pt-20 pb-16 px-6 overflow-y-auto shadow-inner">
        <div v-if="!$store.state.mycarts.length" class="relative items-center mb-4 rounded pt-4 pb-4 px-2 border border-dashed font-thin">
          <div class="text-sm">
            <p class="text-center tracking-wider">- you have no order -</p>
            <p class="text-center tracking-wider">drag here to add stuff</p>
          </div>
        </div>
        <div
          v-for="(cart, iCart) in $store.state.mycarts"
          :key="iCart"
          class="flex bg-white items-center rounded shadow mb-4 p-2"
          @click.prevent="$store.commit('removeCart', iCart)"
        >
          <img class="w-20 h-20 rounded mr-4" :src="cart.foto">
          <div class="text-sm">
            <p class="text-gray-900">{{ cart.nama }} {{ cart.size ? '- ' + cart.size : '' }}</p>
            <p class="text-gray-600">{{ $price(cart.harga) }}</p>
          </div>
        </div>
      </div>
      <div :class="[$route.name === 'home' ? 'w-3/4' : 'w-full']" class="bg-gray-50 pt-16 overflow-y-auto p-2">
        <router-view/>
      </div>
    </div>
    <div style="position: absolute;bottom: 0px;left: 0px;width: 320px; z-index: 20;">
      <div v-if="toggleOrder" class="relative w-full">
        <div class="absolute w-full bottom-0 pt-4 pb-2 px-4 bg-white border" :class="[toggleOrder ? 'border-purple-400' : '']">
          <div class="mb-2">
            <label class="text-xs text-gray-600">Email</label>
            <input v-model="dataOrder.email" class="block w-full py-1 px-2 rounded border bg-white outline-none border-purple-400">
          </div>
          <div class="mb-2">
            <label class="text-xs text-gray-600">Whatsapp/Phone Number</label>
            <input v-model="dataOrder.recipient_phone" class="block w-full py-1 px-2 rounded border bg-white outline-none border-purple-400">
          </div>
          <div class="mb-2">
            <label class="text-xs text-gray-600">Name</label>
            <input v-model="dataOrder.recipient_name" class="block w-full py-1 px-2 rounded border bg-white outline-none border-purple-400">
          </div>
          <div class="mb-2">
            <label class="text-xs text-gray-600">Address</label>
            <textarea v-model="dataOrder.recipient_address" class="block w-full py-1 px-2 rounded border bg-white outline-none border-purple-400"></textarea>
          </div>
          <div class="mb-2 relative">
            <label class="text-xs text-gray-600">City</label>
            <input v-model="dataOrder.recipient_city" class="block w-full py-1 px-2 rounded border bg-white outline-none border-purple-400">
          </div>
          <div class="mb-2 relative">
            <label class="text-xs text-gray-600">Ongkir (Rp)</label>
            <input v-model.number="dataOrder.ongkir" class="block w-full py-1 px-2 rounded border bg-white outline-none border-purple-400">
          </div>
          <div class="mb-2 relative">
            <label class="text-xs text-gray-600">Note</label>
            <input v-model="dataOrder.payment_receipt" class="block w-full py-1 px-2 rounded border bg-white outline-none border-purple-400">
          </div>
          <div class="mb-2 relative">
            <div>
              <span class="float-right">{{ $totalWeight($store.state.mycarts) }}kg</span>
              TOTAL: {{ $price($getTotalPrice($store.state.mycarts) + dataOrder.ongkir) }}
            </div>
          </div>
          <div class="mb-2 relative pt-2">
            <button class="block w-full py-1 px-2 rounded text-white bg-red-600 outline-none border-purple-400" @click.prevent="checkout()">CHECKOUT</button>
          </div>
        </div>
      </div>
      <span class="bg-purple-600 text-white block cursor-pointer text-center p-2 select-none" @click.prevent="toggleOrder = !toggleOrder">
        <template v-if="!toggleOrder">FINISH ORDER</template>
        <template v-else>CLOSE</template>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      toggleOrder: false,
      dataOrder: {
        id: null,
        email: '',
        ongkir: 0,
        jml_berat: 0,
        jml_bayar: 0,
        payment_receipt: '',
        recipient_name: '',
        recipient_address: '',
        recipient_city: '',
        recipient_phone: '',
        data_order: null,
        kurir: '',
        status: 1
      },
      dataOrderDefault: {
        id: null,
        email: '',
        ongkir: 0,
        jml_berat: 0,
        jml_bayar: 0,
        payment_receipt: '',
        recipient_name: '',
        recipient_address: '',
        recipient_city: '',
        recipient_phone: '',
        data_order: null,
        kurir: '',
        status: 1
      }
    }
  },
  methods: {
    /* eslint-disable */
    checkout () {
      const $ = this
      if (confirm('Pay Order ?')) {
        $.dataOrder.jml_berat = $.$totalWeight($.$store.state.mycarts)
        $.dataOrder.jml_bayar = ($.$getTotalPrice($.$store.state.mycarts) + parseInt($.dataOrder.ongkir))
        $.dataOrder.data_order = JSON.stringify($.$store.state.mycarts)
        console.log($.dataOrder)
        if (!$.dataOrder.email || !$.dataOrder.ongkir || !$.dataOrder.jml_berat || !$.dataOrder.jml_bayar || !$.dataOrder.recipient_name || !$.dataOrder.recipient_address || !$.dataOrder.recipient_city || !$.dataOrder.recipient_phone || !$.dataOrder.data_order) {
          return false
        } else {
          $.$store.dispatch('ADD_ORDER', $.dataOrder).then(res => {
            if (res.status === 200 || res.status === 201) {
              $.dataOrder = $.dataOrderDefault
            } else {
              console.log('Failed')
            }
          })
        }
      }
    }
  }
}
</script>

<style lang="scss">
  html, body {
    height: 100%;
  }
</style>
