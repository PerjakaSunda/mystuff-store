import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'
export default new Vuex.Store({
  strict: debug,
  state: {
    api: 'https://api.bradleysfootwear.com/api/',
    apiDev: 'http://localhost:3031/api/',
    gridView: '',
    mycarts: []
  },
  mutations: {
    setGrid (state, v) {
      state.gridView = v
    },
    addCart (state, v) {
      state.mycarts.push(v)
    },
    removeCart (state, vIndex) {
      state.mycarts.splice(vIndex, 1)
    }
  },
  actions: {
    async LOAD_PRODUCTS (context, params) {
      return Vue.axios.get(context.state.apiDev + 'product?q=&category=&page=' + (parseInt(params.page) ? parseInt(params.page) : 1))
        .then((res) => res)
        .catch(err => err)
    },
    async LOAD_ORDERS (context, params) {
      return Vue.axios.get(context.state.apiDev + 'trx/trx-bazar')
        .then((res) => res)
        .catch(err => err)
    },
    async ADD_ORDER (context, params) {
      return Vue.axios.post(context.state.apiDev + 'trx/trx-bazar', params)
        .then((res) => res)
        .catch(err => err)
    },
    async UPDATE_ORDER (context, params) {
      return Vue.axios.put(context.state.apiDev + 'trx/trx-bazar/' + params.id, params)
        .then((res) => res)
        .catch(err => err)
    }
  },
  modules: {
  }
})
