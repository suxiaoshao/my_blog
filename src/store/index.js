import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    navigation_names: ["首页", "B站", "小说", "个人中心"],
    navigation_path: ["/", "/bilibili", "/novel", "/user"]
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
