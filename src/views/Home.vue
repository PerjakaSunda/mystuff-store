<template>
  <div class="flex flex-wrap">
    <div v-for="(product, iProduct) in products" :key="iProduct" :class="[$store.state.gridView ? $store.state.gridView : 'w-1/4']" class="p-2">
      <div class="rounded overflow-hidden shadow">
        <img class="w-full" :src="product.foto">
        <div class="px-6 py-4 bg-white">
          <div class="font-bold mb-1 text-center">{{ product.nama }}</div>
          <div class="mb-3 text-center">{{ $price(product.harga) }}</div>
          <div class="mb-2 text-center">
            <span class="rounded border py-1 px-2 block w-full cursor-pointer" @click.prevent="addToCart(product)">Add to Cart</span>
          </div>
        </div>
      </div>
    </div>
    <div v-if="products_total >= products.length" class="w-full p-2">
      <span class="block w-full p-2 border bg-purple-200 rounded text-gray-700 cursor-pointer text-center" @click.prevent="loadNextPage()">
        load more product
      </span>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  // components: {
  //   HelloWorld
  // }
  data () {
    return {
      products: [],
      products_total: 0,
      currentPage: 1
    }
  },
  mounted () {
    const prdct = localStorage.getItem('products')
    if (prdct) {
      this.products = JSON.parse(prdct)
    } else {
      this.loadProduct(1)
    }
  },
  methods: {
    loadNextPage () {
      this.currentPage++
      this.loadProduct(this.currentPage)
    },
    loadProduct (page) {
      this.$store.dispatch('LOAD_PRODUCTS', {
        page: page
      }).then(res => {
        if (res.status === 200 || res.status === 201) {
          if (!page || page === 1) {
            this.products = res.data.data
          } else {
            this.products = this.products.concat(res.data.data)
          }
          if (res.data.data.length === 0) {
            localStorage.setItem('products', JSON.stringify(this.products))
          }
          this.products_total = res.data.total
        } else {
          this.products = []
        }
      })
    },
    addToCart (product) {
      if (typeof product === 'object') {
        let size = null
        if (product.size_type !== 'allsize') {
          size = prompt('Input size : ', '41')
          product.size = size
        }
        this.$store.commit('addCart', product)
      }
    }
  }
}
</script>
