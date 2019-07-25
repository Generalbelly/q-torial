import { firestoreAction } from 'vuexfire';
import firebase, { FieldValue } from '../../firebase';
import { QUERY_LIMIT } from '../../utils/constants';
import {
  SELECT_TUTORIAL,
  SET_ALL_FETCHED,
  SET_REQUESTING,
  UPDATE_ORDER_BY,
  UPDATE_SEARCH_QUERY,
  SORT_TUTORIALS,
} from '../mutation-types';

export const mutations = {
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
    const [field, direction] = payload
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
  listTutorials: firestoreAction(
    async (
      {
        bindFirestoreRef, unbindFirestoreRef, state, rootState, commit,
      },
      payload = {},
    ) => {
      unbindFirestoreRef('tutorial');

      const { searchQuery = null, orderBy = ['createdAt', 'desc'] } = payload;
      commit(SET_REQUESTING, true);

      if (searchQuery !== state.searchQuery) {
        tutorialsLatestSnapshot = null;
        commit(UPDATE_SEARCH_QUERY, searchQuery);
        commit(SET_ALL_FETCHED, false);
      }
      if (orderBy[0] !== state.orderBy[0] || orderBy[1] !== state.orderBy[1]) {
        tutorialsLatestSnapshot = null;
        commit(UPDATE_ORDER_BY, {
          orderBy,
        });
        commit(SET_ALL_FETCHED, false);
      }

      let snapshot = firebase
        .getDB()
        .collection('users')
        .doc(rootState.user.uid)
        .collection('tutorials');

      if (state.searchQuery) {
        snapshot = snapshot
          .orderBy('name')
          .startAt(searchQuery)
          .endAt(`${searchQuery}\uf8ff`);
      } else {
        snapshot = snapshot.orderBy(state.orderBy[0], state.orderBy[1]);
      }

      if (
        tutorialsLatestSnapshot
        && tutorialsLatestSnapshot.docs
        && tutorialsLatestSnapshot.docs.length > 0
      ) {
        snapshot = snapshot.startAfter(
          tutorialsLatestSnapshot.docs[tutorialsLatestSnapshot.docs.length - 1],
        );
      }

      snapshot = snapshot.limit(QUERY_LIMIT);
      await bindFirestoreRef('tutorials', snapshot, {
        maxRefDepth: 1,
        reset: true,
      });
      commit(SET_ALL_FETCHED, snapshot.empty);
      commit(SET_REQUESTING, false);
      if (!tutorialsLatestSnapshot) {
        tutorialsLatestSnapshot = snapshot;
      }
    },
  ),
  selectTutorial: async({ commit, state, unbindFirestoreRef, dispatch }, payload) => {
    if (state.tutorials.length === 0) {
      await dispatch('getTutorial', payload);
    } else {
      commit(SELECT_TUTORIAL, payload);
    }
  },
  getTutorial: firestoreAction(async ({ commit, rootState, bindFirestoreRef }, payload) => {
    const snapshot = await firebase
      .getDB()
      .collection('users')
      .doc(rootState.user.uid)
      .collection('tutorials')
      .doc(payload.id);
    await bindFirestoreRef('tutorial', snapshot, {
      maxRefDepth: 1,
      reset: true,
    });
    commit(SELECT_TUTORIAL, state.tutorial);
  }),
  sortTutorials({ commit }, payload) {
    commit(SORT_TUTORIALS, payload);
  },
  addTutorial: firestoreAction(({ commit, rootState }, payload) => new Promise(async (resolve) => {
    commit(SET_REQUESTING, true);

    const { data } = payload;
    const { id, ...fields } = data;
    await firebase
      .getDB()
      .collection('users')
      .doc(rootState.user.uid)
      .collection('tutorials')
      .add({
        ...fields,
        createdAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp(),
      });

    commit(SET_REQUESTING, false);
    resolve();
  })),
  updateTutorial: async ({ commit, rootState }, payload) => {
    commit(SET_REQUESTING, true);

    const { data } = payload;
    const { id, steps, ...fields } = data;
    await firebase
      .getDB()
      .collection('users')
      .doc(rootState.user.uid)
      .collection('tutorials')
      .doc(id)
      .update({
        ...fields,
        updatedAt: FieldValue.serverTimestamp(),
      });

    commit(SET_REQUESTING, false);
  },
  deleteTutorial: firestoreAction(
    async ({ commit, rootState }, payload) => {
      commit(SET_REQUESTING, true);

      const { data } = payload;
      const { id } = data;
      await firebase
        .getDB()
        .collection('users')
        .doc(rootState.user.uid)
        .collection('tutorials')
        .doc(id)
        .delete();

      commit(SET_REQUESTING, false);
    },
  ),
};

const state = {
  user: null,
  active: false,
  allFetched: false,
  requesting: false,
  searchQuery: '',
  orderBy: ['createdAt', 'desc'],
  tutorial: null,
  tutorials: [],
  selectedTutorialID: null,
  serverSideErrors: {},
};

const getters = {
  // eslint-disable-next-line no-shadow
  selectedTutorial(state) {
    if (state.selectedTutorialID) {
      const tutorial = state.tutorials.find(
        t => t.id === state.selectedTutorialID,
      ) || state.tutorial;
      if (!tutorial) return null;
      return {
        ...tutorial,
        id: tutorial.id,
      };
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
