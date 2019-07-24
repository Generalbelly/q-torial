<template>
  <forget-password-template
    @click:reset-link="onClickResetLink"
    :password-reset-link-sent="passwordResetLinkSent"
  ></forget-password-template>
</template>

<script>
import firebase from '../../../firebase';
import ForgetPasswordTemplate from '../../templates/ForgetPasswordTemplate/ForgetPasswordTemplate';

export default {
  name: 'ForgetPasswordPage',
  components: {
    ForgetPasswordTemplate,
  },
  data() {
    return {
      passwordResetLinkSent: false,
    };
  },
  methods: {
    async onClickResetLink({ email }) {
      try {
        await firebase.sendPasswordResetEmail(email);
        this.passwordResetLinkSent = true;
      } catch (e) {
        console.log(e);
        this.handleError(e);
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
        default:
          field = 'general';
          errorMessage = message;
          break;
      }
      console.log(field);
      console.log(errorMessage);
      await this.$store.dispatch('setServerSideErrors', {
        [field]: errorMessage,
      });
    },
  },
};
</script>

<style scoped>
</style>
