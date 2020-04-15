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
          <p
            v-if="appName === 'user'"
          >
            Please enter the email registered for your firebase project ({{ firebaseConfig.projectId }})
          </p>
          <p v-else>
             Please enter the email registered for Qtorial
          </p>
          <forget-password-form
            class="has-margin-top-4"
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
import FirebaseConfigEntity from '../../atoms/Entities/FirebaseConfigEntity';

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
    appName: {
      type: String,
      default: null,
    },
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
    firebaseConfig: {
      type: Object,
      default() {
        return new FirebaseConfigEntity();
      },
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
