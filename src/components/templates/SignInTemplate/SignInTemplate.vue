<template>
  <div>
    <centering-layout>
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
        <p>
          <router-link :to="{ name: 'password.forget' }">
            Forget your password?
          </router-link>
        </p>
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
    <base-loading is-full-page :active="loading" />
  </div>
</template>

<script>
import SignInForm from '../../organisms/forms/SignInForm';
import BaseLogo from '../../atoms/BaseLogo/BaseLogo';
import CenteringLayout from '../../molecules/layouts/CenteringLayout';
import PrimaryButton from '../../atoms/buttons/PrimaryButton';
import BaseLoading from '../../atoms/BaseLoading';

export default {
  name: 'SignInTemplate',
  components: {
    BaseLoading,
    PrimaryButton,
    CenteringLayout,
    BaseLogo,
    SignInForm,
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
  },
  methods: {
    async onClickSignIn() {
      this.$emit('click:sign-in');
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
