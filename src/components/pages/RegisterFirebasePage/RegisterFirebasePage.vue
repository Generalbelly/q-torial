<template>
  <validation-observer ref="observer">
    <register-firebase-template
      :loading="requesting"
      :support-email="supportEmail"
      :should-show-create-user-modal="shouldShowCreateUserModal"
      :should-show-instruction-modal="shouldShowInstructionModal"
      :email.sync="email"
      :password.sync="password"
      :firebase-config.sync="firebaseConfig"
      :use-existing-user.sync="useExistingUser"
      @click:create="onClickCreate"
      @click:register="onClickRegister"
      @click:done="onClickDone"
      @click:sign-in-with-google="onClickSignInWithGoogle"
    />
  </validation-observer>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { ValidationObserver } from 'vee-validate';
import { getUserFirebaseService } from '../../../firebase';
import chromeExtension from '../../../chromeExtension';
import FirebaseConfigEntity from '../../atoms/Entities/FirebaseConfigEntity';
import RegisterFirebaseTemplate from '../../templates/RegisterFirebaseTemplate';
import UserEntity from '../../atoms/Entities/UserEntity';
import { getGoogleOauthService } from '../../../getGoogleOauthService';

export default {
  name: 'RegisterFirebasePage',
  components: {
    RegisterFirebaseTemplate,
    ValidationObserver,
  },
  data() {
    return {
      email: null,
      password: null,
      firebaseConfig: new FirebaseConfigEntity(),
      shouldShowCreateUserModal: false,
      shouldShowInstructionModal: false,
      requesting: false,
      supportEmail: process.env.VUE_APP_CONTACT_EMAIL,
      useExistingUser: false,
    };
  },
  computed: {
    ...mapState([
      'user',
    ]),
    ...mapState('tutorial', [
      'repositoryReady',
    ]),
  },
  watch: {
    user: {
      immediate: true,
      deep: true,
      async handler(value) {
        if (value && value.firebaseConfig) {
          if (value.setupComplete) {
            await this.$router.push({
              name: 'tutorials.index',
            });
          } else if (value.gcp) {
            this.shouldShowInstructionModal = true;
            this.shouldShowCreateUserModal = false;
          } else if (value.firebaseConfig.uid) {
            this.shouldShowInstructionModal = true;
            this.shouldShowCreateUserModal = false;
          } else {
            this.shouldShowCreateUserModal = true;
            this.shouldShowInstructionModal = false;
          }
        }
      },
    },
  },
  methods: {
    ...mapActions([
      'setServerSideErrors',
      'addFirebaseConfig',
      'updateFirebaseConfig',
      'updateUser',
      'resetServerSideErrors',
      'addGcp',
      'getGcp',
      'setup',
    ]),
    ...mapActions('tutorial', [
      'testTutorial',
      'initRepository',
    ]),
    async handleError({ message, code } = {}) {
      if (!message || !code) return;
      let errorMessage;
      switch (code) {
        case 'auth/email-already-in-use':
          errorMessage = 'The email is already registered';
          break;
        case 'auth/invalid-email':
          errorMessage = 'The email is not valid.';
          break;
        case 'auth/weak-password':
          errorMessage = 'The password is not strong enough. It should be at least 6 characters';
          break;
        case 'auth/operation-not-allowed':
          errorMessage = `
            <div class="content has-padding-4">
              Enable Email/Password sign-in for your Firebase project:
              <ol>
                <li>In the Firebase console, open the <b>Authentication</b> section.</li>
                <li>On the <b>Sign in method</b> tab, enable the <b>Email/password</b> sign-in method and click <b>Save</b>.</li>
              </ol>
            </div>
          `;
          break;
        case 'auth/user-not-found':
          errorMessage = 'We couldn\'t find an account with the email.';
          break;
        case 'auth/wrong-password':
          errorMessage = 'The password is incorrect.';
          break;
        default:
          errorMessage = message;
          break;
      }
      if (errorMessage) {
        await this.setServerSideErrors(errorMessage);
      }
    },
    async onClickRegister() {
      await this.resetServerSideErrors();
      const isValid = await this.$refs.observer.validate();
      if (!isValid) return;
      try {
        this.requesting = true;
        await this.addFirebaseConfig(this.firebaseConfig);
        this.requesting = false;
        this.shouldShowCreateUserModal = true;
      } catch (e) {
        this.requesting = false;
        await this.handleError(e);
      }
    },
    async onClickCreate() {
      await this.resetServerSideErrors();
      const isValid = await this.$refs.observer.validate();
      if (!isValid) return;
      try {
        this.requesting = true;
        const userFirebaseUnsubscribe = await getUserFirebaseService(this.user.firebaseConfig)
          .watchAuth(async user => {
            if (user) {
              userFirebaseUnsubscribe();
              if (await chromeExtension.getVersion()) {
                await chromeExtension.firebaseSignIn(this.email, this.password);
              }
              await this.updateFirebaseConfig(new FirebaseConfigEntity({
                ...this.user.firebaseConfig,
                uid: user.uid,
              }));
              await this.initRepository();
            }
          });
        if (this.useExistingUser) {
          await getUserFirebaseService(this.user.firebaseConfig).signIn(this.email, this.password);
        } else {
          await getUserFirebaseService(this.user.firebaseConfig).signUp(this.email, this.password);
        }
      } catch (e) {
        await this.handleError(e);
      } finally {
        this.requesting = false;
      }
    },
    async onClickSignInWithGoogle() {
      if (!this.user.gcp) {
        const { email, code } = await getGoogleOauthService().signIn('https://www.googleapis.com/auth/cloud-platform');
        this.requesting = true;
        await this.addGcp({
          email,
          code,
        });
        this.requesting = false;
      } else {
        await this.setServerSideErrors('It looks like you already did sign-in with Google. Click the "Done" button below.');
      }
    },
    async onClickDone() {
      await this.resetServerSideErrors();
      try {
        this.requesting = true;
        await this.setup();
        // await new Promise(r => setTimeout(r, 30000));
        await this.getGcp();
        const setupComplete = (
          this.user.gcp.functionsVersion
          && this.user.gcp.firestoreRulesVersion
          && this.user.gcp.firestoreIndexesVersion
          && this.user.gcp.tagVersion
        );
        if (setupComplete) {
          await this.updateUser(new UserEntity({
            ...this.user,
            setupComplete: true,
          }));
        } else {
          await this.setServerSideErrors('It looks like the setup hasn\'t been finished yet.<br /> Make sure you enable Firestore and Storage.');
        }
        this.requesting = false;
        if (setupComplete) {
          await this.$router.push({
            name: 'tutorials.index',
          });
        }
      } catch (error) {
        this.requesting = false;
        await this.setServerSideErrors(error);
      }
    },
  },
};
</script>

<style scoped>

</style>
