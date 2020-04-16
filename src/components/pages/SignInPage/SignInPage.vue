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
import { mapActions, mapGetters } from 'vuex';
import { ValidationObserver } from 'vee-validate';
import { appFirebaseService, getUserFirebaseService } from '../../../firebase';
import SignInTemplate from '../../templates/SignInTemplate';
import chromeExtension from '../../../chromeExtension';
import store from '../../../store';

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
    ...mapGetters([
      'firebaseConfig',
    ]),
  },
  watch: {
    firebaseConfig: {
      immediate: true,
      handler(value) {
        if (value) {
          this.shouldShowFirebaseSignInModal = true;
        }
      },
    },
  },
  methods: {
    ...mapActions([
      'setServerSideErrors',
      'getFirebaseConfig',
    ]),
    async onClickSignIn() {
      const isValid = await this.$refs.observer.validate();
      if (!isValid) return;
      try {
        this.requesting = true;
        await appFirebaseService.signIn(this.email, this.password);
        if (await chromeExtension.getVersion()) {
          await chromeExtension.signIn(this.email, this.password);
        }
        await this.getFirebaseConfig();
        this.requesting = false;
      } catch (e) {
        this.requesting = false;
        this.handleError(e);
      }
    },
    async onClickFirebaseSignIn() {
      const isValid = await this.$refs.observer.validate();
      if (!isValid) return;
      try {
        this.requesting = true;
        await getUserFirebaseService(this.firebaseConfig).signIn(
          this.firebaseEmail,
          this.firebasePassword,
        );
        if (await chromeExtension.getVersion()) {
          await chromeExtension.firebaseSignIn(this.firebaseEmail, this.firebasePassword);
        }
        const { redirect = '' } = this.$route.query;
        console.log(redirect);
        if (redirect) {
          if (redirect.includes(process.env.VUE_APP_URL)) {
            await this.$router.push(redirect);
          } else {
            try {
              const url = new URL(redirect);
              window.location.href = redirect;
            } catch (_) {
              await this.$router.push(`${process.env.VUE_APP_URL}/${redirect}`);
            }
          }
        } else {
          await this.$router.push({
            name: 'tutorials.index',
          });
        }
      } catch (e) {
        this.handleError(e);
      } finally {
        this.requesting = false;
      }
    },
    async handleError({ message, code }) {
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
