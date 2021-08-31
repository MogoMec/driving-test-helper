import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    type: 'C1',
    subject: '1'
  },
  mutations: {
    setSubject(state, newSubject) {
      state.subject = newSubject
    },
    setType(state, newType) {
      state.type = newType
    }
  },
  actions: {},
  modules: {}
})
