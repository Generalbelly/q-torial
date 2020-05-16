import Vue from 'vue';
import Vuex from 'vuex';
import modules from './modules';
import {
  UPDATE_USER,
  SET_SERVER_SIDE_ERRORS,
  UPDATE_AUTH,
} from './mutation-types';
import UserEntity from '../components/atoms/Entities/UserEntity';
import {
  appFirebaseService, getUserFirebaseService,
} from '../firebase';
import repositoryFactory from '../repository';
import chromeExtension from '../chromeExtension';

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
            value: 'signOut',
          },
        ];
      } else {
        state.userItems = [
          // {
          //   text: 'Upgrade to Pro Plan',
          //   value: 'upgrade',
          // },
          {
            text: 'Sign out',
            value: 'signOut',
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
};

const actions = {
  async getUser({ dispatch, state }) {
    const { setupComplete, tosAgreed, privacyPolicyAgreed } = await userRepository.get(state.user.uid);
    dispatch('updateLocalUser', {
      setupComplete,
      tosAgreed,
      privacyPolicyAgreed,
    });
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
  async addFirebaseConfig({ state, dispatch }, firebaseConfig) {
    const addedFirebaseConfig = await userRepository.addFirebaseConfig(
      state.user.uid,
      firebaseConfig,
    );
    dispatch('updateLocalUser', { firebaseConfig: addedFirebaseConfig });
  },
  async updateFirebaseConfig({ state, dispatch }, firebaseConfig) {
    const updatedFirebaseConfig = await userRepository.updateFirebaseConfig(
      state.user.uid,
      firebaseConfig,
    );
    dispatch('updateLocalUser', { firebaseConfig: updatedFirebaseConfig });
  },
  setServerSideErrors({ commit }, payload) {
    commit(SET_SERVER_SIDE_ERRORS, payload);
  },
  resetServerSideErrors({ commit }) {
    commit(SET_SERVER_SIDE_ERRORS, null);
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
  async getUserPaymentInfo({ state, dispatch }) {
    const stripeCustomer = await userRepository.getUserPaymentInfo(state.user.uid,);
    if (stripeCustomer) {
      await dispatch('updateLocalUser', { stripeCustomer });
    }
  },
  async getFirebaseConfig({ state, dispatch }) {
    const firebaseConfig = await userRepository.getFirebaseConfig(state.user.uid);
    if (firebaseConfig) {
      await dispatch('updateLocalUser', { firebaseConfig });
      await dispatch('tutorial/initRepository');
    }
  },
  async signOut({ state }) {
    if (!state.user) return;
    try {
      if (state.user.firebaseConfig) {
        await getUserFirebaseService(state.user.firebaseConfig).signOut();
      }
      await appFirebaseService.signOut();
      const version = await chromeExtension.getVersion();
      if (version) {
        await chromeExtension.signOut();
      }
    } catch (e) {
      console.error(e);
    }
  },
};

const state = {
  user: null,
  serverSideErrors: null,
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
