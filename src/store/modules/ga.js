import {
  appFirebaseService,
} from '../../firebase';
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
import repositoryFactory from '../../repository';
import { getGoogleOauthService } from '../../getGoogleOauthService';

const gaRepository = repositoryFactory.get('ga')(appFirebaseService.getDB(), appFirebaseService.getFunctions());

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
    state.selectedGaID = payload;
  },
  [SET_GA_ACCOUNTS](state, payload) {
    state.googleAnalyticsAccounts = payload.map(account => new GoogleAnalyticsAccount(account));
  },
};

let gasLatestSnapshot = null;
const actions = {
  listGas: async ({ state, commit, rootState }, payload = {}) => {
    const {
      searchQuery = null,
      orderBy = ['createdAt', 'desc'],
      source = 'default',
    } = payload;
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

    const {
      gas,
      allFetched = false,
      snapshot,
    } = await gaRepository.list(
      rootState.user.uid,
      {
        searchQuery,
        orderBy,
        source,
        startAfter:
          gasLatestSnapshot
          && gasLatestSnapshot.docs
          && gasLatestSnapshot.docs.length > 0
            ? gasLatestSnapshot.docs[
              gasLatestSnapshot.docs.length - 1
            ]
            : null,
        limit: QUERY_LIMIT,
      },
    );

    gas.forEach(tutorial => {
      commit(ADD_GA, tutorial);
    });
    commit(SET_ALL_FETCHED, allFetched);
    commit(SET_REQUESTING, false);
    if (!gasLatestSnapshot) {
      gasLatestSnapshot = snapshot;
    }
  },
  selectGa: async ({ commit }, payload) => new Promise(async (resolve, reject) => {
    const { id } = payload;
    commit(SET_REQUESTING, true);
    try {
      const accounts = await gaRepository.queryAccounts(id);
      commit(SET_GA_ACCOUNTS, accounts);
      commit(SELECT_GA, payload.id);
      commit(SET_REQUESTING, false);
      resolve();
    } catch (e) {
      commit(SET_REQUESTING, false);
      reject(e);
    }
  }),
  sortGas({ commit }, payload) {
    commit(SORT_GAS, payload);
  },
  addGa: async ({ commit, dispatch }) => new Promise(async (resolve, reject) => {
    commit(SET_REQUESTING, true);
    try {
      const { email, code } = await getGoogleOauthService().signIn('https://www.googleapis.com/auth/analytics.readonly');
      const add = appFirebaseService.getFunctions().httpsCallable('addGa');
      const { data } = await add({
        code,
        email,
      });
      commit(ADD_GA, data);
      await dispatch('selectGa', data);
      resolve(data);
    } catch (e) {
      reject(e);
    } finally {
      commit(SET_REQUESTING, false);
    }
  }),
  async updateGa({ commit, rootState }, payload) {
    commit(SET_REQUESTING, true);
    const ga = await gaRepository.update(
      rootState.user.uid,
      payload,
    );
    commit(UPDATE_GA, ga);
    commit(SET_REQUESTING, false);
  },
  async deleteGa({ commit, rootState }, payload) {
    commit(SET_REQUESTING, true);
    const ga = await gaRepository.delete(
      rootState.user.uid,
      payload,
    );
    commit(DELETE_GA, ga);
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
  ga(state) {
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
