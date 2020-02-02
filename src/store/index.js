import Vue from 'vue';
import Vuex from 'vuex';
import { vuexfireMutations } from 'vuexfire';
import modules from './modules';
import {
  UPDATE_USER,
  SET_SERVER_SIDE_ERRORS,
  UPDATE_AUTH,
  SET_REQUESTING,
} from './mutation-types';
import UserEntity from '../components/atoms/Entities/UserEntity';
import {
  appFirebaseService,
} from '../firebase';
import repositoryFactory from '../repository';

Vue.use(Vuex);

const userRepository = repositoryFactory.get('user')(appFirebaseService.getDB());

const getters = {
  email(state) {
    return state.user ? state.user.email : null;
  },
  firebaseConfig(state) {
    return state.user ? state.user.firebaseConfig : null;
  },
  setupComplete(state) {
    return state.user ? state.user.setupComplete : false;
  },
  emailVerificationLinkSent(state) {
    return state.auth.emailVerificationLinkSent;
  },
  emailVerificationLinkExpired(state) {
    return state.auth.emailVerificationLinkExpired;
  },
};

const mutations = {
  [SET_REQUESTING](state, payload) {
    state.requesting = payload;
  },
  [UPDATE_USER](state, user) {
    if (user) {
      state.user = new UserEntity({
        ...state.user,
        ...user,
      });
      state.navItems = [
        {
          icon: 'book',
          text: 'Tutorials',
          to: { name: 'tutorials.index' },
        },
        {
          icon: 'code',
          text: 'Tag',
          to: { name: 'tags.show', params: { id: state.user.uid } },
        },
        {
          icon: 'plug',
          text: 'Google Analytics',
          to: { name: 'gas.index' },
        },
        {
          icon: 'hammer',
          text: 'Chrome Extension',
          to: process.env.VUE_APP_CHROME_EXTRNSION_INSTALL_URL,
        },
      ];

      if (state.user.stripeCustomer) {
        state.userItems = [
          {
            text: 'Cancel Pro Plan',
            value: 'cancel',
          },
          {
            text: 'Sign out',
            value: 'signout',
          },
        ];
      } else {
        state.userItems = [
          {
            text: 'Upgrade to Pro Plan',
            value: 'upgrade',
          },
          {
            text: 'Sign out',
            value: 'signout',
          },
        ];
      }
    } else {
      state.user = null;
      state.navItems = [];
      state.userItems = [
        {
          text: 'Sign in',
          to: {
            name: 'sign-in',
          },
        },
      ];
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
  async setRequesting({ commit }, payload) {
    commit(SET_REQUESTING, payload);
  },
  async getUser({ dispatch, state }) {
    const { setupComplete } = await userRepository.get(state.user.uid);
    dispatch('updateLocalUser', { setupComplete });
  },
  async addUser({ dispatch }, payload) {
    const user = await userRepository.add(payload);
    dispatch('updateLocalUser', user);
  },
  async updateUser({ dispatch }, payload) {
    const user = await userRepository.update(payload);
    dispatch('updateLocalUser', user);
  },
  async updateLocalUser({ commit }, payload) {
    commit(UPDATE_USER, payload);
  },
  async addFirebaseConfig({ state }, firebaseConfig) {
    await userRepository.addFirebaseConfig(state.user.uid, firebaseConfig);
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
  checkUserPaymentInfo({ commit, state }) {
    return userRepository.checkUserPaymentInfo(state.user.uid, stripeCustomer => {
      commit(UPDATE_USER, { stripeCustomer });
    });
  },
  checkFirebaseConfig({state, dispatch }) {
    return userRepository.checkFirebaseConfig(state.user.uid, async firebaseConfig => {
      dispatch('updateLocalUser', { firebaseConfig });
      if (firebaseConfig) {
        await dispatch('tutorial/initRepository');
      }
    });
  },
};

const state = {
  user: null,
  requesting: false,
  serverSideErrors: {},
  auth: {
    emailVerificationLinkSent: false,
    emailVerificationLinkExpired: false,
  },
  navItems: [],
  userItems: [],
};

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules,
  strict: process.env.NODE_ENV !== 'production',
});
