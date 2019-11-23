import Vue from 'vue';
import Vuex from 'vuex';
import { vuexfireMutations } from 'vuexfire';
import modules from './modules';
import {
  SET_ERROR_CODE,
  UPDATE_USER,
  SET_SERVER_SIDE_ERRORS,
  UPDATE_AUTH,
} from './mutation-types';
import UserEntity from '../components/atoms/Entities/UserEntity';
import firebase, { convertDocToObject, convertDocumentsToArray } from '../firebase';
import StripeCustomerEntity from '../components/atoms/Entities/StripeCustomerEntity';

Vue.use(Vuex);

const getters = {
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
  updateUser({ commit }, user) {
    commit(UPDATE_USER, user);
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
  getUserPaymentInfo: async ({ state, commit }, payload = {}) => {
    if (!state.user) return;
    firebase
      .getDB()
      .collection('users')
      .doc(state.user.uid)
      .collection('stripe_customers')
      .where('deletedAt', '==', null)
      .limit(1)
      .onSnapshot((snapshot) => {
        if (snapshot.docs.length > 0) {
          const stripeCustomer = new StripeCustomerEntity(
            convertDocumentsToArray(snapshot)[0]
          );
          commit(UPDATE_USER, { stripeCustomer });
        } else {
          commit(UPDATE_USER, { stripeCustomer: null });
        }
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
