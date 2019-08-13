import firebase, {
  FieldValue,
  convertDocToObject,
} from '../../firebase';
import gapi from '../../google-analytics';
import { QUERY_LIMIT } from '../../utils/constants';
import {
  SET_ALL_FETCHED,
  SET_REQUESTING,
  UPDATE_ORDER_BY,
  UPDATE_SEARCH_QUERY,
  SELECT_GA,
  SORT_GAS,
  ADD_GA,
  UPDATE_GA,
  DELETE_GA,
  SET_GA_ACCOUNTS,
} from '../mutation-types';
import GaEntity from '../../components/atoms/Entities/GaEntity';
import GoogleAnalyticsAccount from '../../components/atoms/Entities/GoogleAnalyticsAccount';

export const mutations = {
  [ADD_GA](state, payload) {
    state.gas = [...state.gas, new GaEntity(payload)];
  },
  [UPDATE_GA](state, payload) {
    const index = state.gas.findIndex(
      ga => ga.id === payload.id,
    );
    state.gas = [
      ...state.gas.slice(0, index),
      new GaEntity({
        ...state.gas[index],
        ...payload,
      }),
      ...state.gas.slice(index + 1),
    ];
  },
  [DELETE_GA](state, payload) {
    const index = state.gas.findIndex(
      ga => ga.id === payload.id,
    );
    state.gas = [
      ...state.gas.slice(0, index),
      ...state.gas.slice(index + 1),
    ];
  },
  [SET_ALL_FETCHED](state, payload) {
    state.allFetched = payload;
  },
  [SET_REQUESTING](state, payload) {
    state.requesting = payload;
  },
  [UPDATE_SEARCH_QUERY](state, payload) {
    state.searchQuery = payload;
    state.gas = [];
  },
  [UPDATE_ORDER_BY](state, payload) {
    const { orderBy } = payload;
    state.orderBy = orderBy;
    state.gas = [];
  },
  [SORT_GAS](state, payload) {
    const [field, direction] = payload;
    state.gas = [...state.gas].sort((a, b) => {
      if (a[field] === b[field]) return 0;
      if (direction === 'desc') {
        return a[field] < b[field] ? 1 : -1;
      }
      return a[field] > b[field] ? 1 : -1;
    });
  },
  [SELECT_GA](state, payload) {
    const { id } = payload;
    state.selectedGaID = id;
  },
  [SET_GA_ACCOUNTS](state, payload) {
    state.googleAnalyticsAccounts = payload.map(account => new GoogleAnalyticsAccount(account));
  },
};

let gasLatestSnapshot = null;
const actions = {
  listGas: async ({ state, rootState, commit }, payload = {}) => {
    const { searchQuery = null, orderBy = ['createdAt', 'desc'] } = payload;
    commit(SET_REQUESTING, true);

    if (searchQuery !== state.searchQuery) {
      gasLatestSnapshot = null;
      commit(UPDATE_SEARCH_QUERY, searchQuery);
      commit(SET_ALL_FETCHED, false);
    }
    if (orderBy[0] !== state.orderBy[0] || orderBy[1] !== state.orderBy[1]) {
      gasLatestSnapshot = null;
      commit(UPDATE_ORDER_BY, orderBy);
      commit(SET_ALL_FETCHED, false);
    }

    let query = firebase
      .getDB()
      .collection('users')
      .doc(rootState.user.uid)
      .collection('gas');

    if (state.searchQuery) {
      query = query
        .orderBy('name')
        .startAt(searchQuery)
        .endAt(`${searchQuery}\uf8ff`);
    } else {
      query = query.orderBy(state.orderBy[0], state.orderBy[1]);
    }

    if (
      gasLatestSnapshot
      && gasLatestSnapshot.docs
      && gasLatestSnapshot.docs.length > 0
    ) {
      query = query.startAfter(
        gasLatestSnapshot.docs[gasLatestSnapshot.docs.length - 1],
      );
    }

    query = query.limit(QUERY_LIMIT);
    const snapshot = await query.get();
    snapshot.docs.forEach((doc) => {
      commit(ADD_GA, convertDocToObject(doc));
    });
    commit(SET_ALL_FETCHED, snapshot.empty);
    commit(SET_REQUESTING, false);
    if (!gasLatestSnapshot) {
      gasLatestSnapshot = snapshot;
    }
  },
  selectGa: async ({ commit }, payload) => {
    return new Promise(async (resolve, reject) => {
      const { id } = payload;
      commit(SET_REQUESTING, true);
      try {
        const response = await gapi.queryAccounts(id);
        commit(SET_GA_ACCOUNTS, response.data);
        commit(SELECT_GA, payload);
        commit(SET_REQUESTING, false);
        resolve();
      } catch (e) {
        commit(SET_REQUESTING, false);
        reject(e);
      }
    });
  },
  sortGas({ commit }, payload) {
    commit(SORT_GAS, payload);
  },
  addGa: async ({ commit, dispatch  }, payload = {}) => {
    return new Promise(async (resolve, reject) => {
      commit(SET_REQUESTING, true);
      try {
        const response = await gapi.oauth2SignIn();
        commit(ADD_GA, response.data);
        await dispatch('selectGa', response.data);
        resolve(response);
        commit(SET_REQUESTING, false);
      } catch (e) {
        reject(e);
        commit(SET_REQUESTING, false);
      }
    });
  },
  updateGa: async ({ commit, state, rootState }, payload) => {
    commit(SET_REQUESTING, true);
    const { data } = payload;
    const { id, ...fields } = data;

    const batch = firebase.getDB().batch();

    await firebase
      .getDB()
      .collection('users')
      .doc(rootState.user.uid)
      .collection('gas')
      .doc(id)
      .update({
        ...fields,
        updatedAt: FieldValue.serverTimestamp(),
      });
    commit(UPDATE_GA, data);
    commit(SET_REQUESTING, false);
  },
  deleteGa: async ({ commit, state, rootState }, payload = {}) => {
    commit(SET_REQUESTING, true);
    const { data } = payload;
    const { id } = data;
    await firebase
      .getDB()
      .collection('users')
      .doc(rootState.user.uid)
      .collection('gas')
      .doc(id)
      .delete();
    commit(DELETE_GA, data);
    commit(SET_REQUESTING, false);
  },
};

const state = {
  allFetched: false,
  requesting: false,
  searchQuery: '',
  orderBy: ['createdAt', 'desc'],
  gas: [],
  selectedGaID: null,
  serverSideErrors: {},
  googleAnalyticsAccounts: [],
};

const getters = {
  // eslint-disable-next-line no-shadow
  selectedGa(state) {
    if (state.selectedGaID) {
      const ga = state.gas.find(g => g.id === state.selectedGaID);
      return ga || null;
    }
    return null;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
