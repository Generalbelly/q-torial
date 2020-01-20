<template>
  <validation-observer ref="observer">
    <sign-in-template
      :loading="requesting"
      :email.sync="email"
      :password.sync="password"
      @click:sign-in="onClickSignIn"
    />
  </validation-observer>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex';
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
    };
  },
  computed: {
    ...mapGetters([
      'firebaseConfig',
    ]),
    ...mapState([
      'requesting',
    ]),
  },
  watch: {
    async firebaseConfig(value) {
      if (value) {
        await getUserFirebaseService(value).signIn(this.email, this.password);
        const { source, redirect = '' } = this.$route.query;
        if (source === 'extension') return;
        if (redirect) {
          await this.$router.push(redirect);
        } else {
          await this.$router.push({
            name: 'tutorials.index',
          });
        }
      }
    },
  },
  methods: {
    ...mapActions([
      'setRequesting',
      'setServerSideErrors',
    ]),
    async onClickSignIn() {
      const isValid = await this.$refs.observer.validate();
      if (!isValid) return;
      try {
        this.setRequesting(true);
        await appFirebaseService.signIn(this.email, this.password);
        if (await chromeExtension.getVersion()) {
          await chromeExtension.signIn(this.email, this.password);
        }
      } catch (e) {
        this.handleError(e);
      } finally {
        this.setRequesting(false);
      }
    },
    async handleError({ message, code }) {
      let field;
      let errorMessage;
      switch (code) {
        case 'auth/invalid-email':
          field = 'email';
          errorMessage = 'The email is not valid.';
          break;
        case 'auth/user-not-found':
          field = 'email';
          errorMessage = 'We couldn\'t find an account with the email.';
          break;
        case 'auth/wrong-password':
          field = 'password';
          errorMessage = 'The password is incorrect.';
          break;
        default:
          field = 'general';
          errorMessage = message;
          break;
      }
      await this.setServerSideErrors({
        [field]: errorMessage,
      });
    },
  },
};
</script>

<style scoped>
</style>
