<template>
  <sign-up-template
    @click:sign-up="onClickSignUp"
  ></sign-up-template>
</template>

<script>
import firebase from '../../../firebase';
import SignUpTemplate from '../../templates/SignUpTemplate';

export default {
  name: 'SignUpPage',
  components: {
    SignUpTemplate,
  },
  methods: {
    async onClickSignUp({ email, password }) {
      try {
        await firebase.signUp(email, password);
        await firebase.sendEmailVerification();
        this.$router.push({
          name: 'email.verify',
        });
      } catch (e) {
        console.log(e);
        this.handleError(e);
      }
    },
    async handleError({ message, code }) {
      let field;
      let errorMessage;
      switch (code) {
        case 'auth/email-already-in-use':
          field = 'email';
          errorMessage = 'The email is already registered';
          break;
        case 'auth/invalid-email':
          field = 'email';
          errorMessage = 'The email is not valid.';
          break;
        case 'auth/weak-password':
          field = 'password';
          errorMessage = 'The password is not strong enough. It should be at least 6 characters';
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
  },
};
</script>

<style scoped>
</style>
