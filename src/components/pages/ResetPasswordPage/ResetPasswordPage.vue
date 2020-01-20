<template>
    <reset-password-template
      @click:reset-password="onClickResetPassword"
      :password-reset-complete="passwordResetComplete"
    />
</template>

<script>
import { mapGetters } from 'vuex';
import { appFirebaseService, getUserFirebaseService } from '../../../firebase';
import ResetPasswordTemplate from '../../templates/ResetPasswordTemplate';

export default {
  name: 'ResetPasswordPage',
  components: {
    ResetPasswordTemplate,
  },
  data() {
    return {
      code: null,
      passwordResetComplete: false,
    };
  },
  computed: {
    ...mapGetters([
      'firebaseConfig',
    ]),
  },
  created() {
    const {
      code = null,
    } = this.$route.query;
    this.code = code;
  },
  methods: {
    async onClickResetPassword({ password }) {
      try {
        await appFirebaseService.resetPassword(this.code, password);
        await getUserFirebaseService(this.firebaseConfig).updatePassword(password);
        this.passwordResetComplete = true;
      } catch (e) {
        console.log(e);
        this.handleError(e);
      }
    },
    async handleError({ message, code }) {
      let field;
      let errorMessage;
      switch (code) {
        case 'auth/invalid-action-code':
          field = 'general';
          errorMessage = 'The link you followed has already been used.';
          break;
        case 'auth/expired-action-code':
          field = 'general';
          errorMessage = 'The link you followed has already expired.';
          break;
        case 'auth/user-not-found':
          field = 'email';
          errorMessage = 'We couldn\'t find an account with the email.';
          break;
        case 'auth/weak-password':
          field = 'password';
          errorMessage = 'The password is not strong enough.';
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
  },
};
</script>

<style scoped>
</style>
