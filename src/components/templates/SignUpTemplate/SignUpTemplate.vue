<template>
  <div>
    <transition-group name="fade" mode="out-in">
      <centering-layout
        v-if="step === 0"
        key="sign-up-form"
      >
        <template v-slot:content>
          <base-logo
            @click="onClickLogo"
            :width="300"
          />
          <sign-up-form
            class="has-margin-top-5"
            :email.sync="innerEmail"
            :password.sync="innerPassword"
          />
          <primary-button
            @click="onClick"
            class="has-margin-top-5 is-fullwidth"
            clickable-with-enter
          >
            Next
          </primary-button>
          <p class="has-margin-top-5 has-text-centered">
            Do you have an account?
            <router-link :to="{ name: 'sign-in' }">
              Sign in
            </router-link>
          </p>
        </template>
      </centering-layout>
      <centering-layout
        class="has-padding-4"
        v-if="step === 1"
        key="firebase-config-form"
      >
        <template v-slot:content>
          <base-sub-heading
            class="has-text-weight-bold"
          >
            Your firebase config info
          </base-sub-heading>
          <p class="has-margin-top-3">
            If you haven't created a firebase project yet, follow the instruction <span class="has-text-weight-semibold">Step1</span> and <span class="has-text-weight-semibold">Step2</span> of this <a href="https://firebase.google.com/docs/web/setup" target="_blank">page</a>
          </p>
          <firebase-config-form
            class="has-margin-top-5"
            :firebase-config.sync="innerFirebaseConfig"
          />
          <primary-button
            class="has-margin-top-5 is-fullwidth"
            @click="onClick"
            clickable-with-enter
          >
            Sign up
          </primary-button>
          <base-button
            class="has-margin-top-3 is-fullwidth"
            @click="$emit('click:back', $event)"
          >
            Back
          </base-button>
        </template>
      </centering-layout>
    </transition-group>
    <base-loading is-full-page :active="loading" />
  </div>
</template>

<script>
import SignUpForm from '../../organisms/forms/SignUpForm';
import BaseLogo from '../../atoms/BaseLogo';
import CenteringLayout from '../../molecules/layouts/CenteringLayout';
import PrimaryButton from '../../atoms/buttons/PrimaryButton';
import FirebaseConfigForm from '../../organisms/forms/FirebaseConfigForm';
import BaseButton from '../../atoms/BaseButton';
import BaseSubHeading from '../../atoms/BaseSubHeading';
import BaseLoading from '../../atoms/BaseLoading/BaseLoading';

export default {
  name: 'SignUpTemplate',
  components: {
    BaseLoading,
    BaseSubHeading,
    BaseButton,
    FirebaseConfigForm,
    PrimaryButton,
    CenteringLayout,
    BaseLogo,
    SignUpForm,
  },
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    email: {
      type: String,
      default: null,
    },
    password: {
      type: String,
      default: null,
    },
    firebaseConfig: {
      type: Object,
      default() {
        return {
          apiKey: null,
          authDomain: null,
          databaseURL: null,
          projectId: null,
          storageBucket: null,
          messagingSenderId: null,
          appId: null,
        };
      },
    },
    step: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      shouldShowHelp: false,
    };
  },
  computed: {
    innerEmail: {
      get() {
        return this.email;
      },
      set(newValue) {
        this.$emit('update:email', newValue);
      },
    },
    innerPassword: {
      get() {
        return this.password;
      },
      set(newValue) {
        this.$emit('update:password', newValue);
      },
    },
    innerFirebaseConfig: {
      get() {
        return this.firebaseConfig;
      },
      set(newValue) {
        this.$emit('update:firebase-config', newValue);
      },
    },
  },
  methods: {
    onClick() {
      if (this.step === 0) {
        this.onClickNext();
      } else if (this.step === 1) {
        this.onClickSignUp();
      }
    },
    onClickNext() {
      this.$emit('click:next');
    },
    onClickSignUp() {
      this.$emit('click:sign-up');
    },
    onClickLogo() {
      this.$emit('click:logo');
    },
  },
};
</script>

<style scoped></style>
