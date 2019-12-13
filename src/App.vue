<template>
  <div id="app" class="container h-full mx-auto bg-gray-100">
    <div class="fixed left-0 w-full py-2 pr-2 pl-2 bg-white z-10 shadow-inner">
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
      <div class="w-1/4 h-full pt-20 px-6 overflow-y-auto shadow-inner">
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
      <div class="w-3/4 bg-gray-50 pt-16 overflow-y-auto p-2">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss">
  html, body {
    height: 100%;
  }
</style>
