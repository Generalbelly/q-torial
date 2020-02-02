import Vue from 'vue';
import VueRouter from 'vue-router';
import { appFirebaseService, getUserFirebaseService } from '../firebase';
import store from '../store';
import routes from './routes';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes,
});

const routing = (to, from, next, user = null, setupComplete = false) => {
  const requireAuth = to.matched.some(route => route.meta.requireAuth);
  if (user && user.emailVerified) {
    if (!setupComplete && to.name !== 'instruction') {
      next({
        name: 'instruction',
      });
    } else if (
      (
        setupComplete && to.name === 'instruction')
      || to.name === 'sign-in'
      || to.name === 'sign-up'
      || to.name === 'email.verify'
      || to.path === '/'
    ) {
      next({
        name: 'tutorials.index',
      });
    } else {
      next();
    }
  } else if (user && !user.emailVerified) {
    if (to.name === 'email.verify') {
      next();
    } else {
      next({
        name: 'email.verify',
        query: { redirect: to.fullPath },
      });
    }
  } else if (requireAuth) {
    next({
      name: 'sign-in',
      query: { redirect: to.fullPath },
    });
  } else {
    next();
  }
};

router.beforeEach(async (to, from, next) => {
  const user = await appFirebaseService.checkAuth();
  if (!user) {
    routing(to, from, next);
    return;
  }
  if (!store.state.user.setupComplete) {
    await store.dispatch('getUser');
  }
  if (to.name === 'sign-in' && to.query.source === 'extension') {
    if (store.state.user.firebaseConfig) {
      await getUserFirebaseService(store.state.user.firebaseConfig).signOut();
    }
    await appFirebaseService.signOut();
  }
  if (!user.emailVerified && from.name === 'email.verify') {
    await user.reload();
  }
  routing(to, from, next, user, store.state.user.setupComplete);
});

export default router;
