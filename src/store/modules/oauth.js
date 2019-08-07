import { firestoreAction } from 'vuexfire';
import firebase, {
  convertDocToObject,
} from '../../firebase';

import { QUERY_LIMIT } from '../../utils/constants';
import {
  SET_ALL_FETCHED,
  SET_REQUESTING,
  UPDATE_ORDER_BY,
  UPDATE_SEARCH_QUERY,
  ADD_OAUTH,
  DELETE_OAUTH,
  SORT_OAUTHS,
} from '../mutation-types';
import OauthEntity from '../../components/atoms/Entities/OauthEntity';

export const mutations = {
  [ADD_OAUTH](state, payload = {}) {
    state.oauths = [...state.oauths, new OauthEntity(payload)];
  },
  [DELETE_OAUTH](state, payload) {
    const index = state.oauths.findIndex(
      oauth => oauth.id === payload.id,
    );
    state.oauths = [
      ...state.oauths.slice(0, index),
      ...state.oauths.slice(index + 1),
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
    state.oauths = [];
  },
  [UPDATE_ORDER_BY](state, payload) {
    const { orderBy } = payload;
    state.orderBy = orderBy;
    state.oauths = [];
  },
  [SORT_OAUTHS](state, payload) {
    const [field, direction] = payload;
    state.oauths = [...state.oauths].sort((a, b) => {
      if (a[field] === b[field]) return 0;
      if (direction === 'desc') {
        return a[field] < b[field] ? 1 : -1;
      }
      return a[field] > b[field] ? 1 : -1;
    });
  },
};

let oauthsLatestSnapshot = null;
const actions = {
  listOauths: async ({ state, rootState, commit }, payload = {}) => {
    const { searchQuery = null, orderBy = ['createdAt', 'desc'] } = payload;
    commit(SET_REQUESTING, true);

    if (searchQuery !== state.searchQuery) {
      oauthsLatestSnapshot = null;
      commit(UPDATE_SEARCH_QUERY, searchQuery);
      commit(SET_ALL_FETCHED, false);
    }
    if (orderBy[0] !== state.orderBy[0] || orderBy[1] !== state.orderBy[1]) {
      oauthsLatestSnapshot = null;
      commit(UPDATE_ORDER_BY, orderBy);
      commit(SET_ALL_FETCHED, false);
    }

    let query = firebase
      .getDB()
      .collection('users')
      .doc(rootState.user.uid)
      .collection('oauths');

    if (state.searchQuery) {
      query = query
        .orderBy('name')
        .startAt(searchQuery)
        .endAt(`${searchQuery}\uf8ff`);
    } else {
      query = query.orderBy(state.orderBy[0], state.orderBy[1]);
    }

    if (
      oauthsLatestSnapshot
      && oauthsLatestSnapshot.docs
      && oauthsLatestSnapshot.docs.length > 0
    ) {
      query = query.startAfter(
        oauthsLatestSnapshot.docs[oauthsLatestSnapshot.docs.length - 1],
      );
    }

    query = query.limit(QUERY_LIMIT);
    const snapshot = await query.get();
    snapshot.docs.forEach((doc) => {
      console.log(doc)
      commit(ADD_OAUTH, convertDocToObject(doc));
    });
    commit(SET_ALL_FETCHED, snapshot.empty);
    commit(SET_REQUESTING, false);
    if (!oauthsLatestSnapshot) {
      oauthsLatestSnapshot = snapshot;
    }
  },
  sortOauths({ commit }, payload) {
    commit(SORT_OAUTHS, payload);
  },
  deleteOauth: async ({ commit, state, rootState }, payload = {}) => {
    commit(SET_REQUESTING, true);
    const { data } = payload;
    const { id } = data;
    await firebase
      .getDB()
      .collection('users')
      .doc(rootState.user.uid)
      .collection('oauths')
      .doc(id)
      .delete();
    console.log(data);
    commit(DELETE_OAUTH, data);
    commit(SET_REQUESTING, false);
  },
};

const state = {
  allFetched: false,
  requesting: false,
  searchQuery: '',
  orderBy: ['createdAt', 'desc'],
  oauth: null,
  oauths: [],
  serverSideErrors: {},
};

const getters = {};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
