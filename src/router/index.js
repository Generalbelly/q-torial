import Vue from 'vue';
import VueRouter from 'vue-router';
import firebase from '../firebase';
import routes from './routes';
import UserEntity from '../components/atoms/Entities/UserEntity';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes,
});

const routing = (to, from, next, userData = null) => {
  const requireAuth = to.matched.some(route => route.meta.requireAuth);
  const user = userData ? new UserEntity(userData) : null;
  if (user && user.emailVerified) {
    if (to.name === 'sign-in' || to.name === 'sign-up' || to.name === 'email.verify') {
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

router.beforeEach((to, from, next) => {
  if (to.name === 'sign-in' && to.query.source === 'extension') {
    firebase.signOut();
  }
  firebase.checkAuth()
    .then((user) => {
      if (from.name === 'email.verify') {
        user.reload().then(() => {
          routing(to, from, next, user);
        });
      } else {
        routing(to, from, next, user);
      }
    });
});

export default router;
