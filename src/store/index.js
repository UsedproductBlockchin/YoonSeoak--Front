import Vue from "vue";
import Vuex from "vuex";
import constants from "./constants";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    constants: constants,
    isLogin: false,
    isLoginError: false,
    partyInfo: null,
    itemList: null,
    curItem: null,
  },
  getters: {
    CONSTANTS(state) {
      return state.constants;
    },
    isLogined(state) {
      return state.isLogin;
    },
    getLoginID(state) {
      return state.partyInfo.partyID;
    },
    getPartyType(state) {
      return state.partyInfo.partyType;
    },
    getPartyName(state) {
      return state.partyInfo.name;
    },
    getPartyBalance(state) {
      return state.partyInfo.balance;
    },
    getPartyInfo(state) {
      return state.partyInfo;
    },
    getItemList(state) {
      return state.itemList;
    },
    getCurItem(state) {
      return state.curItem;
    },
  },
  mutations: {
    loginSuccess(state, partyInfo) {
      state.isLogin = true;
      state.isLoginError = false;
      state.partyInfo = partyInfo;
    },
    loginError(state) {
      state.isLogin = false;
      state.isLoginError = true;
    },
    logout(state) {
      state.isLogin = false;
      state.isLoginError = false;
      state.loginID = null;
    },
    updateItemList(state, itemList) {
      state.itemList = itemList;
    },
    setCurItem(state, item) {
      state.curItem = item;
    },
  },
  actions: {},
  modules: {},
});
