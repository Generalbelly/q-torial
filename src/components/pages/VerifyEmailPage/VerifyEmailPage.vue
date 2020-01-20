<template>
  <verify-email-template
    :email="email"
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
        await appFirebaseService.applyActionCode(this.code);
        await this.$router.push({
          name: 'instruction',
        });
      } catch (e) {
        this.handleError(e);
      }
    },
    async handleError({ message, code }) {
      let field;
      let errorMessage;
      switch (code) {
        case 'auth/user-not-found':
          field = 'general';
          errorMessage = 'We couldn\'t find an account with the email.';
          break;
        case 'auth/invalid-action-code':
          field = 'general';
          errorMessage = 'The link you followed has already been used.';
          break;
        case 'auth/expired-action-code':
          field = 'general';
          errorMessage = 'The link you followed has already expired.';
          break;
        default:
          field = 'general';
          errorMessage = message;
          break;
      }
      await this.$store.dispatch('setServerSideErrors', {
        [field]: errorMessage,
      });
    },
    async onClickResend({ email }) {
      await appFirebaseService.sendPasswordResetEmail(email);
    },
  },
};
</script>

<style scoped>
</style>
