// Fontawesome
import './fontawesome';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import '../sass/main.scss';

// import './registerServiceWorker';
import Vue from 'vue';
import Buefy from 'buefy';
import VeeValidate from 'vee-validate';
import store from './store';
import router from './router';
import App from './App.vue';
import firebase from './firebase';

firebase.init({
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
});
firebase.watchAuth();

// Buefy
Vue.use(Buefy, {
  defaultIconPack: 'fas',
  defaultIconComponent: FontAwesomeIcon,
});

// VeeValidate
Vue.use(VeeValidate, {
  aria: true,
  classNames: {},
  classes: false,
  delay: 1,
  dictionary: null,
  errorBagName: 'errors', // change if property conflicts
  events: 'input|blur',
  fieldsBagName: 'fields',
  i18n: null, // the vue-i18n plugin instance
  i18nRootKey: 'validations', // the nested key under which the validation messages will be located
  inject: true,
  locale: 'en',
  validity: false,
});

// import LogRocket from 'logrocket';
// LogRocket.init('agnj7d/omotenashi');

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
