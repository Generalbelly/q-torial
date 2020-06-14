<template>
  <validation-observer ref="observer">
    <sign-in-template
      :should-show-firebase-sign-in-modal="shouldShowFirebaseSignInModal"
      :loading="requesting"
      :email.sync="email"
      :password.sync="password"
      :firebase-email.sync="firebaseEmail"
      :firebase-password.sync="firebasePassword"
      @click:sign-in="onClickSignIn"
      @click:firebase-sign-in="onClickFirebaseSignIn"
    />
  </validation-observer>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { ValidationObserver } from 'vee-validate';
import { appFirebaseService, getUserFirebaseService } from '../../../firebase';
import SignInTemplate from '../../templates/SignInTemplate';
import chromeExtension from '../../../chromeExtension';

export default {
  name: 'SignInPage',
  components: {
    SignInTemplate,
    ValidationObserver,
  },
  data() {
    return {
      email: null,
      password: null,
      firebaseEmail: null,
      firebasePassword: null,
      requesting: false,
      shouldShowFirebaseSignInModal: false,
    };
  },
  computed: {
    ...mapState([
      'user',
    ]),
  },
  watch: {
    user: {
      immediate: true,
      async handler(value) {
        if (value && value.firebaseConfig) {
          if (value.firebaseConfig.uid) {
            this.shouldShowFirebaseSignInModal = true;
          } else {
            await this.$router.push({
              name: 'register-firebase',
            });
          }
        }
      },
    },
  },
  methods: {
    ...mapActions([
      'setServerSideErrors',
      'resetServerSideErrors',
      'getFirebaseConfig',
    ]),
    async onClickSignIn() {
      const isValid = await this.$refs.observer.validate();
      if (!isValid) return;
      try {
        await this.resetServerSideErrors();
        this.requesting = true;
        await appFirebaseService.signIn(this.email, this.password);
        const { redirect = '' } = this.$route.query;
        if (redirect.startsWith('/email/verify')) {
          await this.$router.push({
            name: 'email.verify',
            query: {
              code: redirect.split('code=')[1],
            },
          });
          return;
        }
        if (await chromeExtension.getVersion()) {
          await chromeExtension.signIn(this.email, this.password);
        }
        await this.getFirebaseConfig();
        this.requesting = false;
        if (this.user.firebaseConfig.uid) {
          this.shouldShowFirebaseSignInModal = true;
        } else {
          await this.$router.push({
            name: 'register-firebase',
          });
        }
      } catch (e) {
        this.requesting = false;
        await this.handleError(e);
      }
    },
    async onClickFirebaseSignIn() {
      const isValid = await this.$refs.observer.validate();
      if (!isValid) return;
      try {
        this.requesting = true;
        await getUserFirebaseService(this.user.firebaseConfig).signIn(
          this.firebaseEmail,
          this.firebasePassword,
        );
        if (await chromeExtension.getVersion()) {
          await chromeExtension.firebaseSignIn(this.firebaseEmail, this.firebasePassword);
        }
        this.requesting = false;
        const { redirect = '' } = this.$route.query;
        if (this.$route.query.redirect) {
          if (redirect.includes(process.env.VUE_APP_URL)) {
            await this.$router.push(redirect);
          } else {
            window.location.href = redirect;
          }
        } else {
          await this.$router.push({
            name: 'tutorials.index',
          });
        }
      } catch (e) {
        this.requesting = false;
        await this.handleError(e);
      }
    },
    async handleError({ message, code } = {}) {
      if (!message || !code) return;
      let errorMessage;
      switch (code) {
        case 'auth/invalid-email':
          errorMessage = 'The email is not valid.';
          break;
        case 'auth/user-not-found':
          errorMessage = 'We couldn\'t find an account with the email.';
          break;
        case 'auth/wrong-password':
          errorMessage = 'The password is incorrect.';
          break;
        default:
          errorMessage = message;
          break;
      }
      await this.setServerSideErrors(errorMessage);
    },
  },
};
</script>

<style scoped>
</style>
