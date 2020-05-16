<template>
  <verify-email-template
    :email="email"
    :loading="requesting"
    @click:verify="onClickVerify"
    @click:resend="onClickResend"
    :email-verification-link-expired="emailVerificationLinkExpired"
    :email-verification-link-sent="emailVerificationLinkSent"
  />
</template>

<script>
import { mapGetters } from 'vuex';
import { appFirebaseService } from '../../../firebase';
import VerifyEmailTemplate from '../../templates/VerifyEmailTemplate';

export default {
  name: 'VerifyEmailPage',
  components: {
    VerifyEmailTemplate,
  },
  data() {
    return {
      code: null,
      emailVerificationLinkExpired: false,
      emailVerificationLinkSent: false,
      requesting: false,
    };
  },
  computed: {
    ...mapGetters([
      'email',
    ]),
  },
  created() {
    const {
      code = null,
    } = this.$route.query;
    this.code = code;
    if (!this.code) {
      this.emailVerificationLinkSent = true;
    }
  },
  methods: {
    async onClickVerify() {
      try {
        this.requesting = true;
        await this.$store.dispatch('resetServerSideErrors');
        await appFirebaseService.applyActionCode(this.code);
      } catch (e) {
        await this.handleError(e);
      } finally {
        this.requesting = false;
      }
      await this.$router.push({
        name: 'register-firebase',
      });
    },
    async handleError({ message, code }) {
      let errorMessage;
      switch (code) {
        case 'auth/user-not-found':
          errorMessage = 'We couldn\'t find an account with the email.';
          break;
        case 'auth/invalid-action-code':
          errorMessage = 'The link you followed has already been used.';
          break;
        case 'auth/expired-action-code':
          errorMessage = 'The link you followed has already expired.';
          break;
        default:
          errorMessage = message;
          break;
      }
      await this.$store.dispatch('setServerSideErrors', errorMessage);
    },
    async onClickResend({ email }) {
      await appFirebaseService.sendPasswordResetEmail(email);
    },
  },
};
</script>

<style scoped>
</style>
