<template>
    <reset-password-template
      @click:reset-password="onClickResetPassword"
      :password-reset-complete="passwordResetComplete"
      :loading="requesting"
    />
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { appFirebaseService, getUserFirebaseService } from '../../../firebase';
import ResetPasswordTemplate from '../../templates/ResetPasswordTemplate';
import UserEntity from '../../atoms/Entities/UserEntity';
import chromeExtension from '../../../chromeExtension';

export default {
  name: 'ResetPasswordPage',
  components: {
    ResetPasswordTemplate,
  },
  data() {
    return {
      code: null,
      passwordResetComplete: false,
      requesting: false,
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
    ...mapActions([
      'updateUser',
      'getFirebaseConfig',
    ]),
    async onClickResetPassword({ password }) {
      try {
        await this.$store.dispatch('resetServerSideErrors');
        this.requesting = true;
        await appFirebaseService.resetPassword(this.code, password);
        this.passwordResetComplete = true;
      } catch (e) {
        await this.handleError(e);
      } finally {
        this.requesting = false;
      }
    },
    async handleError({ message, code }) {
      let errorMessage;
      switch (code) {
        case 'auth/invalid-action-code':
          errorMessage = 'The link you followed has already been used.';
          break;
        case 'auth/expired-action-code':
          errorMessage = 'The link you followed has already expired.';
          break;
        case 'auth/user-not-found':
          errorMessage = 'We couldn\'t find an account with the email.';
          break;
        case 'auth/weak-password':
          errorMessage = 'The password is not strong enough.';
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
