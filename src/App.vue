<template>
  <div v-if="isIndexPage">
    <the-navbar
      :navItems="navItems"
      :user="user"
      :user-items="userItems"
      :is-on-index-page="isIndexPage"
    />
    <router-view />
  </div>
  <div v-else>
    <the-navbar
      v-if="shouldShowNavbar"
      :navItems="navItems"
      @click:sign-out="signOut"
      :user="user"
      :user-items="userItems"
    />
    <the-main
      class="has-padding-5"
    >
      <router-view />
    </the-main>
    <footer class="footer">
      <div class="content has-text-centered has-text-grey">
        If you have any questions, feel free to contact us by email: {{ supportEmail }}
      </div>
    </footer>
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
  data() {
    return {
      supportEmail: process.env.VUE_APP_CONTACT_EMAIL,
    };
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
      if (this.isIndexPage) {
        return true;
      }
      if (this.$route.name === 'sign-in' || this.$route.name === 'sign-up' || this.$route.name === 'gas.show') {
        return false;
      }
      return this.user && this.user.emailVerified;
    },
    isIndexPage() {
      return this.$route.name === 'index';
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
      try {
        await firebase.signOut();
        await this.$router.push({
          name: 'sign-in',
        });
        if (await chromeExtension.getVersion()) {
          await chromeExtension.signOut();
        }
      } catch (e) {
        console.error(e);
      }
    },
  },
};
</script>

<style scoped>
</style>
