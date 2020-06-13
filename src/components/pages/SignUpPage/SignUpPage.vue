<template>
  <validation-observer ref="observer">
    <sign-up-template
      :loading="requesting"
      :email.sync="email"
      :password.sync="password"
      :docs-checked.sync="docsChecked"
      @click:sign-up="onClickSignUp"
      @click:logo="onClickLogo"
    />
  </validation-observer>
</template>

<script>
import { mapActions } from 'vuex';
import { ValidationObserver } from 'vee-validate';
import { appFirebaseService } from '../../../firebase';
import chromeExtension from '../../../chromeExtension';
import SignUpTemplate from '../../templates/SignUpTemplate';
import UserEntity from '../../atoms/Entities/UserEntity';

export default {
  name: 'SignUpPage',
  components: {
    SignUpTemplate,
    ValidationObserver,
  },
  data() {
    return {
      email: null,
      password: null,
      docsChecked: false,
      requesting: false,
    };
  },
  methods: {
    ...mapActions([
      'resetServerSideErrors',
      'setServerSideErrors',
      'addUser',
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
              The given sign-in provider is disabled for this Firebase project.<br />
              Enable it in the Firebase console, under the sign-in method tab of the Auth section.<br />
              <ol>
                <li>If you haven't yet connected your app to your Firebase project, do so from the <a href="https://console.firebase.google.com" target="_blank">Firebase console.</a></li>
                <li>Enable Email/Password sign-in:
                  <ol>
                    <li style="list-style-type: lower-alpha;">In the Firebase console, open the <b>Auth</b> section.</li>
                    <li style="list-style-type: lower-alpha;">On the <b>Sign in method</b> tab, enable the <b>Email/password</b> sign-in method and click <b>Save</b>.</li>
                  </ol>
                </li>
              </ol>
            </div>
          `;
          break;
        default:
          errorMessage = message;
          break;
      }
      await this.setServerSideErrors(errorMessage);
    },
    async onClickSignUp() {
      const isValid = await this.$refs.observer.validate();
      if (!isValid) return;
      try {
        await this.resetServerSideErrors();
        this.requesting = true;
        const appFirebaseUnsubscribe = await appFirebaseService
          .watchAuth(async user => {
            if (user) {
              appFirebaseUnsubscribe();
              if (await chromeExtension.getVersion()) {
                await chromeExtension.signIn(this.email, this.password);
              }
              await this.addUser(new UserEntity({
                ...user,
                tosAgreed: true,
                privacyPolicyAgreed: true,
              }));
              await appFirebaseService.sendEmailVerification();
              await this.$router.push({
                name: 'email.verify',
              });
            }
          });
        await appFirebaseService.signUp(this.email, this.password);
      } catch (e) {
        this.handleError(e);
      } finally {
        this.requesting = false;
      }
    },
    onClickLogo() {
      this.$router.push({
        name: 'index',
      });
    },
  },
};
</script>

<style scoped>

</style>
