<template>
    <sign-in-template
        @click:sign-in="onClickSignIn"
    ></sign-in-template>
</template>

<script>
import firebase from '../../../firebase';
import SignInTemplate from '../../templates/SignInTemplate';

export default {
  name: 'SignInPage',
  components: {
    SignInTemplate,
  },
  methods: {
    async onClickSignIn({ email, password }) {
      try {
        await firebase.signIn(email, password);
        const { redirect = null } = this.$route.query;
        if (redirect) {
          if (redirect.startsWith('http')) {
            window.location.href = redirect;
          } else {
            this.$router.push(redirect);
          }
        } else {
          this.$router.push({
            name: 'projects.index',
          });
        }
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
        case 'auth/wrong-password':
          field = 'password';
          errorMessage = 'The password is incorrect.';
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
