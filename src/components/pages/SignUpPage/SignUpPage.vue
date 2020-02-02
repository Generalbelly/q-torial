<template>
  <validation-observer ref="observer">
    <sign-up-template
      :loading="requesting"
      :step="step"
      :email.sync="email"
      :password.sync="password"
      :firebase-config.sync="firebaseConfig"
      @click:sign-up="onClickSignUp"
      @click:logo="onClickLogo"
      @click:next="onClickNext"
      @click:back="prev"
    />
  </validation-observer>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { ValidationObserver } from 'vee-validate';
import { appFirebaseService, getUserFirebaseService } from '../../../firebase';
import chromeExtension from '../../../chromeExtension';
import SignUpTemplate from '../../templates/SignUpTemplate';
import FirebaseConfigEntity from '../../atoms/Entities/FirebaseConfigEntity';
import UserEntity from '../../atoms/Entities/UserEntity';
import store from '../../../store';

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
      firebaseConfig: new FirebaseConfigEntity({
        apiKey: "AIzaSyDfS8QLjhE8JY2sx3oh9400rFIoIceaykU",
        authDomain: "customer-001-233b1.firebaseapp.com",
        databaseURL: "https://customer-001-233b1.firebaseio.com",
        projectId: "customer-001-233b1",
        storageBucket: "customer-001-233b1.appspot.com",
        messagingSenderId: "498351222083",
        appId: "1:498351222083:web:3eecc32a9ab989f886d3f6"
      }),
      step: 0,
    };
  },
  computed: {
    ...mapState([
      'requesting',
    ]),
  },
  methods: {
    ...mapActions([
      'setRequesting',
      'setServerSideErrors',
      'addFirebaseConfig',
      'addUser',
    ]),
    async handleError({ message, code }) {
      const field = 'general';
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
      await this.setServerSideErrors({
        [field]: errorMessage,
      });
    },
    async onClickNext() {
      const isValid = await this.$refs.observer.validate();
      if (isValid) {
        this.next();
      }
    },
    next() {
      this.step += 1;
    },
    prev() {
      this.step -= 1;
    },
    async onClickSignUp() {
      const isValid = await this.$refs.observer.validate();
      if (!isValid) return;
      try {
        this.setRequesting(true);
        const userFirebaseUnsubscribe = await getUserFirebaseService(this.firebaseConfig)
          .watchAuth(async user => {
            if (user) {
              userFirebaseUnsubscribe();
              this.firebaseConfig = new FirebaseConfigEntity({
                ...this.firebaseConfig,
                uid: user.uid,
              });
            }
          });
        const appFirebaseUnsubscribe = await appFirebaseService
          .watchAuth(async user => {
            if (user) {
              appFirebaseUnsubscribe();
              if (await chromeExtension.getVersion()) {
                await chromeExtension.signIn(this.email, this.password);
              }
              await this.addFirebaseConfig(this.firebaseConfig);
              await this.addUser(new UserEntity(user));
              await appFirebaseService.sendEmailVerification();
              await this.$router.push({
                name: 'email.verify',
              });
            }
          });
        await getUserFirebaseService(this.firebaseConfig).signUp(this.email, this.password);
        await appFirebaseService.signUp(this.email, this.password);
      } catch (e) {
        this.handleError(e);
      } finally {
        this.setRequesting(false);
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
