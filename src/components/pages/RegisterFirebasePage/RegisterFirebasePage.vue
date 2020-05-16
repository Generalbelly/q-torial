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
import axios from 'axios';

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
    ]),
    ...mapActions('tutorial', [
      'testTutorial',
      'initRepository',
    ]),
    async handleError({ message, code }) {
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
      const isValid = await this.$refs.observer.validate();
      if (!isValid) return;
      try {
        this.requesting = true;
        await this.addFirebaseConfig(this.firebaseConfig);
        this.requesting = false;
        this.shouldShowCreateUserModal = true;
      } catch (e) {
        this.requesting = false;
        this.handleError(e);
      }
    },
    async onClickCreate() {
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
        this.handleError(e);
      } finally {
        this.requesting = false;
      }
    },
    async onClickDone() {
      const cloudFunctionValidation = await this.validateCloudFunctions();
      if (!cloudFunctionValidation.valid) {
        await this.setServerSideErrors(cloudFunctionValidation.message);
        return;
      }
      const storageValidation = await this.validateCloudStorage();
      if (!storageValidation.valid) {
        await this.setServerSideErrors(storageValidation.message);
        return;
      }
      try {
        this.requesting = true;
        await this.updateUser(new UserEntity({
          ...this.user,
          setupComplete: true,
        }));
        this.requesting = false;
        await this.$router.push({
          name: 'tutorials.index',
        });
      } catch (error) {
        console.error(error);
        this.requesting = false;
      }
    },
    async validateCloudFunctions() {
      let valid = false;
      let message = 'It looks like that you haven\'t finished the setup yet.';
      try {
        await axios.post(
          `https://us-central1-${this.user.firebaseConfig.projectId}.cloudfunctions.net/getTutorial`,
          {},
        );
      } catch (error) {
        const { response } = error;
        if (response) {
          const { status } = response;
          if (status === 422) {
            valid = true;
            message = 'ok';
          }
        }
      }
      return {
        valid,
        message,
      };
    },
    async validateCloudStorage() {
      let valid = true;
      let message = 'ok';
      try {
        await getUserFirebaseService(this.firebaseConfig).updateAssets();
      } catch (error) {
        valid = false;
        message = 'It looks like that Cloud Storage hasn\'t been correctly set up.';
      }
      return {
        valid,
        message,
      };
    },
  },
};
</script>

<style scoped>

</style>
