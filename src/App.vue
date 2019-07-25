<template>
  <div>
    <the-navbar
      v-if="shouldShowNavbar"
      :navItems="navItems"
      @click:sign-out="signOut"
    ></the-navbar>
    <the-main
      class="has-padding-5"
    >
      <router-view />
    </the-main>

    <!--<extension-install-banner class="banner has-background-white-ter" v-if="showExtensionLink"></extension-install-banner>-->
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import firebase from './firebase';
import { UNAUTHORIZED_401, UNAUTHORIZED_419, INTERNAL_SERVER_ERROR } from './utils/constants';
// import ExtensionInstallBanner from './components/organisms/ExtensionInstallBanner';
import chromeExtension from './chromeExtension';
import TheNavbar from './components/organisms/global/TheNavbar';
import TheMain from './components/organisms/global/TheMain';

export default {
  name: 'App',
  components: {
    TheMain,
    TheNavbar,
    // ExtensionInstallBanner,
  },
  data() {
    return {
      showExtensionLink: false,
      navItems: [
        {
          icon: 'book',
          iconClass: 'has-text-primary',
          text: 'Tutorials',
          to: { name: 'tutorials.index' },
        },
        {
          icon: 'code',
          iconClass: 'has-text-primary',
          text: 'Tag',
          to: { name: 'tags.show', params: { id: this.userKey } },
        },
      ],
    };
  },
  computed: {
    ...mapState([
      'errorCode',
      'serverSideErrors',
      'user',
    ]),
    ...mapGetters([
      'userKey',
    ]),
    shouldShowNavbar() {
      if (this.$route.name === 'sign-in' || this.$route.name === 'sign-up') {
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
  mounted() {
    this.checkIfExtensionInstalled();
  },
  methods: {
    async checkIfExtensionInstalled() {
      this.showExtensionLink = await chromeExtension.getVersion();
    },
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
