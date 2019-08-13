import firebase, {
  FieldValue,
  convertDocToObject,
} from '../../firebase';

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
} from '../mutation-types';
import TutorialEntity from '../../components/atoms/Entities/TutorialEntity';

export const mutations = {
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
  listTutorials: async ({ state, rootState, commit }, payload = {}) => {
    const { searchQuery = null, orderBy = ['createdAt', 'desc'] } = payload;
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

    let query = firebase
      .getDB()
      .collection('users')
      .doc(rootState.user.uid)
      .collection('tutorials');

    if (state.searchQuery) {
      query = query
        .orderBy('name')
        .startAt(searchQuery)
        .endAt(`${searchQuery}\uf8ff`);
    } else {
      query = query.orderBy(state.orderBy[0], state.orderBy[1]);
    }

    if (
      tutorialsLatestSnapshot
      && tutorialsLatestSnapshot.docs
      && tutorialsLatestSnapshot.docs.length > 0
    ) {
      query = query.startAfter(
        tutorialsLatestSnapshot.docs[tutorialsLatestSnapshot.docs.length - 1],
      );
    }

    query = query.limit(QUERY_LIMIT);
    const snapshot = await query.get();
    snapshot.docs.forEach((doc) => {
      commit(ADD_TUTORIAL, convertDocToObject(doc));
    });
    commit(SET_ALL_FETCHED, snapshot.empty);
    commit(SET_REQUESTING, false);
    if (!tutorialsLatestSnapshot) {
      tutorialsLatestSnapshot = snapshot;
    }
  },
  selectTutorial: async ({ commit, state, getters }, payload) => {
    commit(SET_REQUESTING, true);
    commit(SELECT_TUTORIAL, payload);
    commit(SET_REQUESTING, false);
  },
  sortTutorials({ commit }, payload) {
    commit(SORT_TUTORIALS, payload);
  },
  addTutorial: async ({ commit, state, rootState }, payload) => {
    commit(SET_REQUESTING, true);

    const batch = firebase.getDB().batch();

    const { data } = payload;
    const { id, steps, ...fields } = data;
    const tutorialRef = await firebase
      .getDB()
      .collection('users')
      .doc(rootState.user.uid)
      .collection('tutorials')
      .doc();

    batch.set(tutorialRef, {
      ...fields,
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    });
    const savedSteps = [];
    steps.forEach(({ id = null, ...stepFields }, index) => {
      const orderAttachedStep = {
        ...stepFields,
        order: index,
      };
      const stepRef = tutorialRef.collection('steps').doc();
      batch.set(stepRef, {
        ...orderAttachedStep,
        createdAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp(),
      });
      savedSteps.push({
        ...orderAttachedStep,
        id: stepRef.id,
      });
    });
    await batch.commit();
    commit(ADD_TUTORIAL, {
      ...fields,
      id: tutorialRef.id,
      steps: savedSteps,
    });
    commit(SET_REQUESTING, false);
  },
  updateTutorial({ commit, state, rootState }, payload) {
    return new Promise(async (resolve, reject) => {
      try {
        commit(SET_REQUESTING, true);
        const { saveSteps = false, saveTutorial = true, data } = payload;
        const { id, steps, ...fields } = data;

        const batch = firebase.getDB().batch();

        const tutorialRef = await firebase
          .getDB()
          .collection('users')
          .doc(rootState.user.uid)
          .collection('tutorials')
          .doc(id);

        if (saveTutorial) {
          batch.update(tutorialRef, {
            ...fields,
            updatedAt: FieldValue.serverTimestamp(),
          });
        }

        const savedSteps = [];
        if (saveSteps) {
          steps.forEach(({ id = null, ...stepFields }, index) => {
            const orderAttachedStep = {
              ...stepFields,
              order: index,
            };
            let stepRef;
            if (id) {
              stepRef = tutorialRef.collection('steps').doc(id);
              batch.update(stepRef, {
                ...orderAttachedStep,
                updatedAt: FieldValue.serverTimestamp(),
              });
            } else {
              stepRef = tutorialRef.collection('steps').doc();
              batch.set(stepRef, {
                ...orderAttachedStep,
                createdAt: FieldValue.serverTimestamp(),
                updatedAt: FieldValue.serverTimestamp(),
              });
            }
            savedSteps.push({
              ...orderAttachedStep,
              id: stepRef.id,
            });
          });
        }
        await batch.commit();
        commit(UPDATE_TUTORIAL, {
          ...data,
          steps: savedSteps,
        });
        commit(SET_REQUESTING, false);
        resolve();
      } catch (e) {
        console.error(e);
        reject(e);
      }
    })
  },
  deleteTutorial: async ({ commit, state, rootState }, payload = {}) => {
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
    commit(DELETE_TUTORIAL, data);
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
