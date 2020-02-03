<template>
    <reset-password-template
      @click:reset-password="onClickResetPassword"
      :password-reset-complete="passwordResetComplete"
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
        const email = await appFirebaseService.resetPassword(this.code, password);
        this.passwordResetComplete = true;
        const unsubscribe = await appFirebaseService
          .watchAuth(async user => {
            if (user) {
              unsubscribe();
              const firebaseConfig = await this.getFirebaseConfig();
              await getUserFirebaseService(firebaseConfig).updatePassword(password);
              await getUserFirebaseService(firebaseConfig).signIn(email, password);
              if (await chromeExtension.getVersion()) {
                await chromeExtension.signIn(email, password);
              }
              await this.$router.push({
                name: 'tutorials.index',
              });
            }
          });
        await appFirebaseService.signIn(email, password);
      } catch (e) {
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
