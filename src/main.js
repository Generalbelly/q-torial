// Fontawesome
import './fontawesome';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import '../sass/main.scss';

// import './registerServiceWorker';
import Vue from 'vue';
import Buefy from 'buefy';
import VeeValidate from 'vee-validate';
import './vee-validate';
import store from './store';
import router from './router';
import App from './App.vue';

import { appFirebaseService } from './firebase';

let checkUserPaymentInfo;
let checkFirebaseConfig;
appFirebaseService.watchAuth(async (user) => {
  await store.dispatch('updateLocalUser', user);
  if (user) {
    if (checkUserPaymentInfo) {
      checkUserPaymentInfo();
    }
    if (checkFirebaseConfig) {
      checkFirebaseConfig();
    }
    checkUserPaymentInfo = await store.dispatch('checkUserPaymentInfo');
    checkFirebaseConfig = await store.dispatch('checkFirebaseConfig');
  }
});

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
