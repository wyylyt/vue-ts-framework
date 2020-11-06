import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

interface state extends Object {
  [index: string]: any;
}
const stateOption: state = {
  Token: "",
  appId: "",
  sessionId: ""
};
export default new Vuex.Store({
  state: stateOption,
  mutations: {
    SET_STATE(state, obj) {
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          (state as state)[key] = obj[key];
        }
      }
    }
  },
  actions: {},
  modules: {}
});
