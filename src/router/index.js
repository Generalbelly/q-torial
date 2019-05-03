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

const routing = (to, from, next, user) => {
  const requireAuth = to.matched.some(route => route.meta.requireAuth);
  const userEntity = user ? new UserEntity(user) : null;
  if (userEntity) {
    console.log('3');
    console.log(userEntity);
    if (userEntity.emailVerified || to.name === 'email.verify') {
      console.log('3.1');
      next();
    } else {
      console.log('3.2');
      next({
        name: 'email.verify',
        query: { redirect: to.fullPath },
      });
    }
  } else if (requireAuth) {
    console.log('7.1');
    next({
      name: 'sign-in',
      query: { redirect: to.fullPath },
    });
  } else {
    console.log('7.2');
    next();
  }
};

router.beforeEach((to, from, next) => {
  firebase.checkAuth()
    .then((user) => {
      console.log(user);
      console.log('2');
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
