import Vue from 'vue';
import Vuex from 'vuex';
import { vuexfireMutations } from 'vuexfire';
import modules from './modules';
import {
  SET_ERROR_CODE,
  SET_USER,
  SET_SERVER_SIDE_ERRORS,
  UPDATE_AUTH,
} from './mutation-types';
import UserEntity from '../components/atoms/Entities/UserEntity';

Vue.use(Vuex);

const getters = {
  userKey(state) {
    return state.user ? state.user.uuid : null;
  },
  email(state) {
    return state.user ? state.user.email : null;
  },
  emailVerificationLinkSent(state) {
    return state.auth.emailVerificationLinkSent;
  },
  emailVerificationLinkExpired(state) {
    return state.auth.emailVerificationLinkExpired;
  },
};

const mutations = {
  [SET_ERROR_CODE](state, code) {
    state.errorCode = code;
  },
  [SET_USER](state, user) {
    if (user) {
      state.user = new UserEntity({
        ...state.user,
        ...user,
      });
    } else {
      state.user = null;
    }
  },
  [SET_SERVER_SIDE_ERRORS](state, payload) {
    state.serverSideErrors = payload;
  },
  [UPDATE_AUTH](state, payload) {
    state.auth = {
      ...state.auth,
      ...payload,
    };
  },
  ...vuexfireMutations,
};

const actions = {
  setUser({ commit }, user) {
    commit(SET_USER, user);
  },
  setServerSideErrors({ commit }, payload) {
    commit(SET_SERVER_SIDE_ERRORS, payload);
  },
  emailVerificationLinkSent({ commit }, value) {
    commit(UPDATE_AUTH, {
      emailVerificationLinkSent: value,
    });
  },
  emailVerificationLinkExpired({ commit }, value) {
    commit(UPDATE_AUTH, {
      emailVerificationLinkExpired: value,
    });
  },
};

const state = {
  user: null,
  errorCode: null,
  serverSideErrors: {},
  auth: {
    emailVerificationLinkSent: false,
    emailVerificationLinkExpired: false,
  },
};

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules,
  strict: process.env.NODE_ENV !== 'production',
});
