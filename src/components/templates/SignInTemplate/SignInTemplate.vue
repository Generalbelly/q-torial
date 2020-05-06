<template>
  <div>
    <centering-layout v-if="!shouldShowFirebaseSignInModal">
      <template v-slot:content>
        <base-logo
          @click="onClickLogo"
          :width="300"
        />
        <sign-in-form
          class="has-margin-top-5"
          :email.sync="innerEmail"
          :password.sync="innerPassword"
        />
        <primary-button
          clickable-with-enter
          @click="onClickSignIn"
          class="has-margin-top-5 is-fullwidth"
        >
          Sign in
        </primary-button>
        <p class="has-margin-top-5">
          You don't have an account?
          <router-link :to="{ name: 'sign-up' }">
            Create account
          </router-link>
        </p>
      </template>
    </centering-layout>
    <base-modal
      :active="shouldShowFirebaseSignInModal"
      :can-cancel="false"
      hide-cancel
    >
      <template v-slot:content>
        <base-heading>
          Sign in for your firebase project
        </base-heading>
        <p>
          You need to sign in to create tutorials.
        </p>
        <sign-in-form
          class="has-margin-top-5"
          :email.sync="innerFirebaseEmail"
          :password.sync="innerFirebasePassword"
          user-firebase
        />
      </template>
      <template v-slot:primary-action-button>
        <primary-button
          @click="onClickFirebaseSignIn"
          class="has-margin-top-3 is-fullwidth"
          clickable-with-enter
        >
          Sign in
        </primary-button>
      </template>
    </base-modal>
    <base-loading is-full-page :active="loading" />
  </div>
</template>

<script>
import SignInForm from '../../organisms/forms/SignInForm';
import BaseLogo from '../../atoms/BaseLogo/BaseLogo';
import CenteringLayout from '../../molecules/layouts/CenteringLayout';
import PrimaryButton from '../../atoms/buttons/PrimaryButton';
import BaseLoading from '../../atoms/BaseLoading';
import BaseModal from '../../molecules/BaseModal/BaseModal';
import BaseHeading from '../../atoms/BaseHeading/BaseHeading';

export default {
  name: 'SignInTemplate',
  components: {
    BaseHeading,
    BaseModal,
    BaseLoading,
    PrimaryButton,
    CenteringLayout,
    BaseLogo,
    SignInForm,
  },
  props: {
    shouldShowFirebaseSignInModal: {
      type: Boolean,
      default: false,
    },
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
    firebaseEmail: {
      type: String,
      default: null,
    },
    firebasePassword: {
      type: String,
      default: null,
    },
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
    innerFirebaseEmail: {
      get() {
        return this.firebaseEmail;
      },
      set(newValue) {
        this.$emit('update:firebase-email', newValue);
      },
    },
    innerFirebasePassword: {
      get() {
        return this.firebasePassword;
      },
      set(newValue) {
        this.$emit('update:firebase-password', newValue);
      },
    },
  },
  methods: {
    onClickSignIn() {
      this.$emit('click:sign-in');
    },
    async onClickLogo() {
      await this.$router.push({
        name: 'index',
      });
    },
    onClickFirebaseSignIn() {
      this.$emit('click:firebase-sign-in');
    },
  },

};
</script>

<style scoped>
</style>
