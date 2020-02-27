<template>
  <div>
    <centering-layout>
      <template v-slot:content>
        <base-logo
          @click="onClickLogo"
          :width="300"
        />
        <sign-up-form
          class="has-margin-top-5"
          :email.sync="innerEmail"
          :password.sync="innerPassword"
          :docs-checked.sync="innerDocsChecked"
        />
        <primary-button
          @click="onClickSignUp"
          class="has-margin-top-5 is-fullwidth"
          clickable-with-enter
        >
          Sign up
        </primary-button>
        <p class="has-margin-top-5 has-text-centered">
          Do you have an account?
          <router-link :to="{ name: 'sign-in' }">
            Sign in
          </router-link>
        </p>
      </template>
    </centering-layout>
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
    docsChecked: {
      type: Boolean,
      default: false,
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
    innerDocsChecked: {
      get() {
        return this.docsChecked;
      },
      set(newValue) {
        this.$emit('update:docs-checked', newValue);
      },
    },
  },
  methods: {
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
