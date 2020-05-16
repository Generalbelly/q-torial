<template>
  <forget-password-template
    @click:reset-link="onClickResetLink"
    :password-reset-link-sent="passwordResetLinkSent"
    :loading="requesting"
    :app-name="appName"
    :firebase-config="firebaseConfig"
  />
</template>

<script>
import { mapGetters } from 'vuex';
import { appFirebaseService, getUserFirebaseService } from '../../../firebase';
import ForgetPasswordTemplate from '../../templates/ForgetPasswordTemplate';

export default {
  name: 'ForgetPasswordPage',
  components: {
    ForgetPasswordTemplate,
  },
  data() {
    return {
      passwordResetLinkSent: false,
      requesting: false,
      appName: null,
    };
  },
  created() {
    const {
      appName = null,
    } = this.$route.query;
    this.appName = appName;
  },
  computed: {
    ...mapGetters([
      'firebaseConfig',
    ]),
  },
  methods: {
    async onClickResetLink({ email }) {
      try {
        await this.$store.dispatch('resetServerSideErrors');
        this.requesting = true;
        if (this.appName === 'user') {
          await getUserFirebaseService(this.firebaseConfig).sendPasswordResetEmail(email);
        } else {
          await appFirebaseService.sendPasswordResetEmail(email);
        }
        this.passwordResetLinkSent = true;
      } catch (e) {
        await this.handleError(e);
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
        default:
          errorMessage = message;
          break;
      }
      await this.$store.dispatch('setServerSideErrors', errorMessage);
    },
  },
};
</script>

<style scoped>
</style>
