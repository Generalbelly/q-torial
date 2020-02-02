<template>
  <div>
    <template v-if="isIndexPage">
      <the-navbar
        :navItems="navItems"
        :user="user"
        :user-items="userItems"
        :is-on-index-page="isIndexPage"
      />
      <router-view />
    </template>
    <template v-else-if="isSignInPage || isSignUpPage || isInstructionPage || isEmailVerifiedPage">
      <the-main>
        <router-view />
      </the-main>
    </template>
    <template v-else>
      <the-navbar
        v-show="shouldShowNavbar"
        :navItems="navItems"
        @click:sign-out="signOut"
        :user="user"
        :user-items="userItems"
      />
      <the-main
        :class="{'has-padding-5': shouldShowNavbar || shouldShowFooter}"
      >
        <router-view />
      </the-main>
    </template>
    <footer v-if="shouldShowFooter" class="footer">
      <div class="content has-text-centered has-text-grey">
        If you have any questions, feel free to contact us by email: {{ supportEmail }}
      </div>
    </footer>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { appFirebaseService, getUserFirebaseService } from './firebase';
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
      'serverSideErrors',
      'user',
    ]),
    shouldShowNavbar() {
      return !this.isGaShowPage;
    },
    isEmailVerifiedPage() {
      return this.$route.name === 'email.verify';
    },
    isInstructionPage() {
      return this.$route.name === 'instruction';
    },
    isSignInPage() {
      return this.$route.name === 'sign-in';
    },
    isSignUpPage() {
      return this.$route.name === 'sign-up';
    },
    isGaShowPage() {
      return this.$route.name === 'gas.show';
    },
    isIndexPage() {
      return this.$route.name === 'index';
    },
    shouldShowFooter() {
      return this.user && this.user.emailVerified;
    },
  },
  watch: {
    serverSideErrors() {
      if (this.serverSideErrors.general) {
        return this.showSnackbar({
          message: this.serverSideErrors.general,
          position: 'is-top',
          type: 'is-warning',
          indefinite: true,
        });
      }
      return [];
    },
  },
  async mounted() {
    await chromeExtension.getVersion();
  },
  methods: {
    // TODO コンポーネント化する
    showSnackbar({
      message = 'Oops! Something went wrong.', position = 'is-top', type = 'is-success', indefinite = false,
    }) {
      this.$buefy.snackbar.open({
        position,
        type,
        indefinite,
        message,
      });
    },
    async signOut() {
      try {
        await getUserFirebaseService(this.user.firebaseConfig).signOut();
        await appFirebaseService.signOut();
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
