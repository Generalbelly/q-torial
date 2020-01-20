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
  convertDocumentsToArray,
} from '../firebase';
import StripeCustomerEntity from '../components/atoms/Entities/StripeCustomerEntity';
import repositoryFactory from '../repository';
import FirebaseConfigEntity from '../components/atoms/Entities/FirebaseConfigEntity';

Vue.use(Vuex);


/** @typedef {import('../repository/repositories/user')} userRepository */
let userRepository = repositoryFactory.get('user');
let userRepositoryReady = false;

const getUserRepository = (userId) => {
  if (userRepositoryReady) {
    return userRepository;
  }
  userRepositoryReady = true;
  userRepository = userRepository(
    appFirebaseService.getUserCollection(),
    appFirebaseService.getStripeCustomerCollection(userId),
    appFirebaseService.getFirebaseConfigCollection(userId),
  );
  return userRepository;
};

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
      state.navItems = [
        // {
        //   text: 'Solution',
        //   to: {
        //     name: 'index.solution',
        //   },
        // },
        // {
        //   text: 'Feature',
        //   to: {
        //     name: 'index.feature',
        //   },
        // },
        // {
        //   text: 'Pricing',
        //   to: {
        //     name: 'index.pricing',
        //   },
        // },
      ];
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
  async getUser({ commit, state }) {
    if (!state.user) return;
    const { setupComplete } = await getUserRepository(state.user.uid).get(state.user.uid);
    commit(UPDATE_USER, {
      setupComplete,
    });
  },
  async addUser({ commit, state }, user) {
    if (!state.user) return;
    await getUserRepository(state.user.uid).add(user);
    commit(UPDATE_USER, user);
  },
  async updateUser({ commit, state }, user) {
    if (!state.user) return;
    await getUserRepository(state.user.uid).update(user);
    commit(UPDATE_USER, user);
  },
  async updateLocalUser({ commit }, user) {
    commit(UPDATE_USER, user);
  },
  async upsertFirebaseConfig({ state }, firebaseConfig) {
    if (!state.user) return;
    await getUserRepository(state.user.uid).upsertFirebaseConfig(firebaseConfig);
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
    if (!state.user) return;
    getUserRepository(state.user.uid).checkUserPaymentInfo((snapshot) => {
      if (snapshot.docs.length > 0) {
        const stripeCustomer = new StripeCustomerEntity(
          convertDocumentsToArray(snapshot)[0],
        );
        commit(UPDATE_USER, { stripeCustomer });
      } else {
        commit(UPDATE_USER, { stripeCustomer: null });
      }
    });
  },
  checkFirebaseConfig({ commit, state, dispatch }) {
    if (!state.user) return;
    getUserRepository(state.user.uid).checkFirebaseConfig(async (snapshot) => {
      if (snapshot.docs.length > 0) {
        const firebaseConfig = new FirebaseConfigEntity(convertDocumentsToArray(snapshot)[0]);
        commit(UPDATE_USER, { firebaseConfig });
        await dispatch('tutorial/initRepository');
      } else {
        commit(UPDATE_USER, { firebaseConfig: null });
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
