import Vue from 'vue';
import VueRouter from 'vue-router';
import { appFirebaseService } from '../firebase';
import store from '../store';
import routes from './routes';
import UserEntity from '../components/atoms/Entities/UserEntity';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes,
});

const routing = (to, from, next, user = null) => {
  const requireAuth = to.matched.some(route => route.meta.requireAuth);
  if (user && user.emailVerified) {
    if (!user.setupComplete && to.name !== 'instruction') {
      next({
        name: 'instruction',
      });
    } else if ((user.setupComplete && to.name === 'instruction') || to.name === 'sign-in' || to.name === 'sign-up' || to.name === 'email.verify' || to.path === '/') {
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
  if (to.name === 'sign-in' && to.query.source === 'extension') {
    await appFirebaseService.signOut();
    await store.dispatch('updateLocalUser', null);
  }
  let user = await appFirebaseService.checkAuth();
  if (user) {
    if (from.name === 'email.verify') {
      await user.reload();
    }
    user = UserEntity.createFromAuth(
      user,
      store.state.user,
    );
  }
  routing(to, from, next, user);
});

export default router;
