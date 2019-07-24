<template>
  <verify-email-template
    :email="email"
    @click:verify="onClickVerify"
    @click:resend="onClickResend"
    :email-verification-link-expired="emailVerificationLinkExpired"
    :email-verification-link-sent="emailVerificationLinkSent"
  ></verify-email-template>
</template>

<script>
import { mapGetters } from 'vuex';
import firebase from '../../../firebase';
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
        await firebase.applyActionCode(this.code);
        this.$router.push({
          name: 'tutorials.index',
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
      console.log(field);
      await this.$store.dispatch('setServerSideErrors', {
        [field]: errorMessage,
      });
    },
    async onClickResend({ email }) {
      firebase.sendPasswordResetEmail(email);
    },
  },
};
</script>

<style scoped>
</style>
