<template>
  <div>
    <template v-if="isIndexPage || isNotationPage || isPrivacyPolicyPage || isTermsOfServicePage">
      <the-navbar
        :navItems="navItems"
        :user="user"
        :user-items="userItems"
        :is-on-index-page="isIndexPage"
        @click:logo="onClickLogo"
      />
      <router-view />
    </template>
    <template v-else-if="
      isSignInPage ||
      isSignUpPage ||
      isInstructionPage ||
      isEmailVerifiedPage ||
      isPasswordReset ||
      isPasswordForget ||
      isRegisterFirebasePage
    ">
      <the-main>
        <router-view />
      </the-main>
    </template>
    <template v-else>
      <the-navbar
        v-show="shouldShowNavbar"
        :navItems="navItems"
        @click:sign-out="clickSignOut"
        :user="user"
        :user-items="userItems"
        @click:logo="onClickLogo"
      />
      <the-main
        :class="{'has-padding-5': shouldShowNavbar || shouldShowFooter}"
      >
        <router-view />
      </the-main>
      <footer v-if="shouldShowFooter" class="footer">
        <div class="content has-text-centered has-text-grey">
          If you have any questions, feel free to contact us by email: {{ supportEmail }}
        </div>
      </footer>
    </template>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
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
      if (!this.$route.name) return false;
      // if (
      //   this.$route.name.includes('tutorials')
      //   && this.$route.name.includes('tags')
      //   && this.$route.name.includes('gas.index')
      // ) return true;
      return !this.isGaShowPage;
    },
    isRegisterFirebasePage() {
      return this.$route.name === 'register-firebase';
    },
    isEmailVerifiedPage() {
      return this.$route.name === 'email.verify';
    },
    isInstructionPage() {
      return this.$route.name === 'instruction';
    },
    isPasswordReset() {
      return this.$route.name === 'password.reset';
    },
    isPasswordForget() {
      return this.$route.name === 'password.forget';
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
    isPrivacyPolicyPage() {
      return this.$route.name === 'privacy-policy';
    },
    isNotationPage() {
      return this.$route.name === 'notation';
    },
    isTermsOfServicePage() {
      return this.$route.name === 'terms-of-service';
    },
    isPageNotFoundPage() {
      return this.$route.name === 'page-not-found';
    },
    shouldShowFooter() {
      if (!this.$route.name) return false;
      return this.user && this.user.emailVerified;
    },
  },
  watch: {
    serverSideErrors: {
      handler(value){
        if (value) {
          this.showSnackbar({
            message: value,
            position: 'is-top',
            type: 'is-warning',
            indefinite: true,
          });
        }
      },
    },
  },
  async mounted() {
    await chromeExtension.getVersion();
  },
  methods: {
    ...mapActions([
      'signOut',
    ]),
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
    async clickSignOut() {
      try {
        await this.signOut();
        await this.$router.push({
          name: 'sign-in',
        });
      } catch (e) {
        console.error(e);
      }
    },
    async onClickLogo() {
      if (this.isIndexPage) return;
      if (this.user) {
        if (this.$route.name !== 'tutorials.index') {
          await this.$router.push({
            name: 'tutorials.index',
          });
        }
        return;
      }
      await this.$router.push({
        name: 'index',
      });
    }
  },
};
</script>

<style scoped>
</style>
