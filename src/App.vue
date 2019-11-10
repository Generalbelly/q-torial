<template>
  <div>
    <the-navbar
      v-if="shouldShowNavbar"
      :navItems="navItems"
      @click:sign-out="signOut"
      :user="user"
      :user-items="userItems"
    ></the-navbar>
    <the-main
      class="has-padding-5"
    >
      <router-view />
    </the-main>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import firebase from './firebase';
import chromeExtension from './chromeExtension';
import TheNavbar from './components/organisms/global/TheNavbar';
import TheMain from './components/organisms/global/TheMain';

export default {
  name: 'App',
  components: {
    TheMain,
    TheNavbar,
  },
  computed: {
    ...mapState([
      'navItems',
      'userItems',
      'errorCode',
      'serverSideErrors',
      'user',
    ]),
    shouldShowNavbar() {
      if (this.$route.name === 'sign-in' || this.$route.name === 'sign-up' || this.$route.name === 'gas.show') {
        return false;
      }
      return this.user && this.user.emailVerified;
    },
  },
  watch: {
    serverSideErrors() {
      if (this.serverSideErrors.general) {
        return this.showSnackbar(this.serverSideErrors.general);
      }
      return [];
    },
  },
  async mounted() {
    await chromeExtension.getVersion();
  },
  methods: {
    ...mapActions(['getUserPaymentInfo']),
    showSnackbar(message = 'Oops! Something went wrong.') {
      this.$snackbar.open({
        position: 'is-top',
        type: 'is-warning',
        message,
      });
    },
    async signOut() {
      await firebase.signOut();
      this.$router.push({
        name: 'sign-in',
      });
    },
  },
};
</script>

<style scoped>
  .banner {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
  }
</style>
