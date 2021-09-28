/*
 * @Description:
 * @Author: wanjikun
 * @Date: 2020-11-30 09:08:36
 * @LastEditTime: 2021-03-31 10:29:49
 * @LastEditors: wanjikun
 */
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

interface state extends Object {
  [index: string]: any;
}
const appId = localStorage.getItem("appId")
  ? localStorage.getItem("appId")
  : "13";
const stateOption: state = {
  Token: sessionStorage.getItem("token"),
  appId: localStorage.getItem("appId")
    ? Number(localStorage.getItem("appId"))
    : 13,
  sessionId: "",
  addressId: "", //收货地址
  repertoire: "",
  openId: localStorage.getItem("wx_openId"), //微信内用户的openId
  showBack: sessionStorage.getItem("showBack")
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
    },
    SET_ADDRESSID(state, id) {
      state.addressId = id;
      sessionStorage.setItem("addressId", id);
    },
    SET_TOKEN(state, token) {
      state.token = token;
      sessionStorage.setItem("token", token);
    },
    SET_OPENID(state, openId) {
      state.openId = openId;
      localStorage.setItem("wx_openId", openId);
    },
    SET_SHOWBACK(state, val) {
      state.showBack = val;
      sessionStorage.setItem("showBack", val);
    }
  },
  actions: {},
  modules: {}
});
