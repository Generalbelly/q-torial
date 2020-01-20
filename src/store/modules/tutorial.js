import { QUERY_LIMIT } from '../../utils/constants';
import {
  SELECT_TUTORIAL,
  SET_ALL_FETCHED,
  SET_REQUESTING,
  UPDATE_ORDER_BY,
  UPDATE_SEARCH_QUERY,
  SORT_TUTORIALS,
  ADD_TUTORIAL,
  UPDATE_TUTORIAL,
  DELETE_TUTORIAL,
  REPOSITORY_READY,
} from '../mutation-types';
import TutorialEntity from '../../components/atoms/Entities/TutorialEntity';
import repositoryFactory from '../../repository';
import { getUserFirebaseService } from '../../firebase';

/** @typedef {import('../../repository/repositories/tutorial')} tutorialRepository */
let tutorialRepository = repositoryFactory.get('tutorial');

export const mutations = {
  [REPOSITORY_READY](state, payload) {
    state.repositoryReady = payload;
  },
  [ADD_TUTORIAL](state, payload) {
    state.tutorials = [...state.tutorials, new TutorialEntity(payload)];
  },
  [UPDATE_TUTORIAL](state, payload) {
    const index = state.tutorials.findIndex(
      tutorial => tutorial.id === payload.id,
    );
    state.tutorials = [
      ...state.tutorials.slice(0, index),
      new TutorialEntity({
        ...state.tutorials[index],
        ...payload,
      }),
      ...state.tutorials.slice(index + 1),
    ];
  },
  [DELETE_TUTORIAL](state, payload) {
    const index = state.tutorials.findIndex(
      tutorial => tutorial.id === payload.id,
    );
    state.tutorials = [
      ...state.tutorials.slice(0, index),
      ...state.tutorials.slice(index + 1),
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
    state.tutorials = [];
  },
  [UPDATE_ORDER_BY](state, payload) {
    const { orderBy } = payload;
    state.orderBy = orderBy;
    state.tutorials = [];
  },
  [SORT_TUTORIALS](state, payload) {
    const [field, direction] = payload;
    state.tutorials = [...state.tutorials].sort((a, b) => {
      if (a[field] === b[field]) return 0;
      if (direction === 'desc') {
        return a[field] < b[field] ? 1 : -1;
      }
      return a[field] > b[field] ? 1 : -1;
    });
  },
  [SELECT_TUTORIAL](state, payload) {
    const { id } = payload;
    state.selectedTutorialID = id;
  },
};

let tutorialsLatestSnapshot = null;
const actions = {
  initRepository: ({ rootState, state, commit }) => {
    if (!state.repositoryReady && rootState.user && rootState.user.firebaseConfig) {
      const firebaseService = getUserFirebaseService(rootState.user.firebaseConfig, 'user');
      tutorialRepository = tutorialRepository(
        firebaseService.getTutorialCollection(rootState.user.firebaseConfig.uid),
        firebaseService.getBatch(),
      );
      commit(REPOSITORY_READY, true);
    }
  },
  async listTutorials({ state, rootState, commit }, payload = {}) {
    const { searchQuery = null, orderBy = ['createdAt', 'desc'], source = 'default' } = payload;
    commit(SET_REQUESTING, true);
    if (searchQuery !== state.searchQuery) {
      tutorialsLatestSnapshot = null;
      commit(UPDATE_SEARCH_QUERY, searchQuery);
      commit(SET_ALL_FETCHED, false);
    }
    if (orderBy[0] !== state.orderBy[0] || orderBy[1] !== state.orderBy[1]) {
      tutorialsLatestSnapshot = null;
      commit(UPDATE_ORDER_BY, orderBy);
      commit(SET_ALL_FETCHED, false);
    }

    const {
      tutorials,
      allFetched = false,
      snapshot,
    } = await tutorialRepository.list(rootState.user.uid, {
      searchQuery,
      orderBy,
      source,
      startAfter: (
        tutorialsLatestSnapshot
          && tutorialsLatestSnapshot.docs
          && tutorialsLatestSnapshot.docs.length > 0
      ) ? tutorialsLatestSnapshot.docs[tutorialsLatestSnapshot.docs.length - 1] : null,
      limit: QUERY_LIMIT,
    });

    tutorials.forEach((tutorial) => {
      commit(ADD_TUTORIAL, tutorial);
    });
    commit(SET_ALL_FETCHED, allFetched);
    commit(SET_REQUESTING, false);
    if (!tutorialsLatestSnapshot) {
      tutorialsLatestSnapshot = snapshot;
    }
  },
  async getTutorial({ rootState, commit }, payload) {
    commit(SET_REQUESTING, true);
    const tutorial = await tutorialRepository.find(rootState.user.uid, payload);
    commit(ADD_TUTORIAL, tutorial);
    commit(SET_REQUESTING, false);
  },
  async selectTutorial({ commit }, payload) {
    commit(SET_REQUESTING, true);
    commit(SELECT_TUTORIAL, payload);
    commit(SET_REQUESTING, false);
  },
  sortTutorials({ commit }, payload) {
    commit(SORT_TUTORIALS, payload);
  },
  async addTutorial({ commit, rootState }, payload) {
    commit(SET_REQUESTING, true);
    const { data } = payload;
    const tutorial = await tutorialRepository.add(rootState.user.uid, data);
    commit(ADD_TUTORIAL, tutorial);
    commit(SET_REQUESTING, false);
  },
  async updateTutorial({ commit, rootState }, payload) {
    commit(SET_REQUESTING, true);
    const { data } = payload;
    const tutorial = await tutorialRepository.update(rootState.user.uid, data);
    commit(UPDATE_TUTORIAL, tutorial);
    commit(SET_REQUESTING, false);
  },
  async deleteTutorial({ commit, rootState }, payload) {
    commit(SET_REQUESTING, true);
    const { data } = payload;
    const tutorial = await tutorialRepository.delete(rootState.user.uid, data);
    commit(DELETE_TUTORIAL, tutorial);
    commit(SET_REQUESTING, false);
  },
  async getPerformance({ commit, rootState }, payload = {}) {
    const tutorial = await tutorialRepository.getPerformance(rootState.user.uid, payload);
    commit(SET_REQUESTING, true);
    commit(UPDATE_TUTORIAL, tutorial);
    commit(SET_REQUESTING, false);
  },
};

const state = {
  allFetched: false,
  requesting: false,
  searchQuery: '',
  orderBy: ['createdAt', 'desc'],
  tutorials: [],
  selectedTutorialID: null,
  serverSideErrors: {},
  repositoryReady: false,
};

const getters = {
  // eslint-disable-next-line no-shadow
  tutorial(state) {
    if (state.selectedTutorialID) {
      const tutorial = state.tutorials.find(t => t.id === state.selectedTutorialID);
      return tutorial || null;
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
