<template>
  <div>
    <centering-layout>
      <template v-slot:content>
        <base-logo class="has-margin-bottom-5" />
        <base-sub-heading class="has-text-weight-semibold">
          Forget your password?
        </base-sub-heading>
        <base-fade-transition>
          <password-reset-link-sent-message
            v-show="passwordResetLinkSent"
          />
        </base-fade-transition>
        <validation-observer ref="observer">
          <p class="has-margin-bottom-4">Please enter the email registered on your account.</p>
          <forget-password-form
            :email.sync="innerEmail"
          />
          <forget-password-button
            @click="onClickResetLink"
            class="has-margin-top-5 is-fullwidth"
          />
        </validation-observer>
        <p class="has-margin-top-5">
          Go back to <router-link :to="{ name: 'sign-in' }">
            Sign in
          </router-link>
        </p>
      </template>
    </centering-layout>
    <base-loading is-full-page :active="loading" />
  </div>
</template>

<script>
import { ValidationObserver } from 'vee-validate';
import ForgetPasswordForm from '../../organisms/forms/ForgetPasswordForm';
import BaseFadeTransition from '../../atoms/transitions/BaseFadeTransition';
import PasswordResetLinkSentMessage from '../../organisms/messages/PasswordResetLinkSentMessage';
import BaseLogo from '../../atoms/BaseLogo/BaseLogo';
import CenteringLayout from '../../molecules/layouts/CenteringLayout';
import ForgetPasswordButton from '../../atoms/buttons/ForgetPasswordButton';
import BaseSubHeading from '../../atoms/BaseSubHeading';
import BaseLoading from '../../atoms/BaseLoading';

export default {
  name: 'ForgetPasswordTemplate',
  components: {
    BaseLoading,
    BaseSubHeading,
    ForgetPasswordButton,
    CenteringLayout,
    BaseLogo,
    PasswordResetLinkSentMessage,
    BaseFadeTransition,
    ForgetPasswordForm,
    ValidationObserver,
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
    passwordResetLinkSent: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      innerEmail: null,
    };
  },
  watch: {
    email(value) {
      this.innerEmail = value;
    },
  },
  methods: {
    async onClickResetLink() {
      const isValid = await this.$refs.observer.validate();
      if (isValid) {
        console.log(isValid);
        this.$emit('click:reset-link', {
          email: this.innerEmail,
        });
      }
    },
  },

};
</script>

<style scoped>
</style>
