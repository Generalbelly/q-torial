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

const routing = async (to, from, next, user = null, setupComplete = false) => {
  if (to.matched.length === 0) {
    next({
      name: 'page-not-found',
    });
    return;
  }
  const requireAuth = to.matched.some(route => route.meta.requireAuth);
  const requireFirebase = to.matched.some(route => route.meta.requireFirebase);
  const firebaseUser = store.state.user && store.state.user.firebaseConfig
    ? await getUserFirebaseService(store.state.user.firebaseConfig).checkAuth() : null;
  if (requireFirebase) {
    if (!firebaseUser) {
      next({
        name: 'sign-in',
      });
      return;
    }
  }
  if (user && user.emailVerified) {
    if (!setupComplete && to.name !== 'register-firebase') {
      next({
        name: 'register-firebase',
      });
    } else if (
      (
        setupComplete && (to.name === 'register-firebase' || to.name === 'instruction'))
      || to.name === 'sign-in'
      || to.name === 'sign-up'
      || to.name === 'email.verify'
      || to.path === '/'
    ) {
      if (firebaseUser) {
        next({
          name: 'tutorials.index',
        });
      }
    }
    next();
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
    await routing(to, from, next);
    return;
  }
  if (!store.state.user) {
    await store.dispatch('updateLocalUser', user);
  }
  if (!store.state.user.setupComplete) {
    await store.dispatch('getUser');
  }
  if (!store.state.user.stripeCustomer) {
    await store.dispatch('getUserPaymentInfo');
  }
  if (!store.state.user.firebaseConfig) {
    await store.dispatch('getFirebaseConfig');
  }
  if (to.name === 'sign-in' && to.query.source === 'extension') {
    await store.dispatch('signOut');
  } else if (!user.emailVerified && from.name === 'email.verify') {
    await user.reload();
  }
  await routing(to, from, next, user, store.state.user ? store.state.user.setupComplete : false);
});

// router.afterEach((to, from) => {
// });

export default router;
