<template>
  <div>
    <div class="form-container">
      <base-logo class="has-margin-bottom-6">
      </base-logo>
      <base-heading>
        Reset your password
      </base-heading>
      <base-fade-transition>
        <password-reset-complete-message
          v-show="passwordResetComplete"
        />
      </base-fade-transition>
      <validation-observer ref="observer">
        <reset-password-form
          :password.sync="password"
          @click:reset-password="onClickResetPassword"
        />
      </validation-observer>
    </div>
    <base-loading is-full-page :active="loading" />
  </div>
</template>

<script>
import { ValidationObserver } from 'vee-validate';
import ResetPasswordForm from '../../organisms/forms/ResetPasswordForm';
import BaseHeading from '../../atoms/BaseHeading';
import BaseLogo from '../../atoms/BaseLogo';
import BaseFadeTransition from '../../atoms/transitions/BaseFadeTransition';
import PasswordResetCompleteMessage
  from '../../organisms/messages/PasswordResetCompleteMessage/PasswordResetCompleteMessage';
import BaseLoading from '../../atoms/BaseLoading/BaseLoading';

export default {
  name: 'ResetPasswordTemplate',
  components: {
    BaseLoading,
    PasswordResetCompleteMessage,
    BaseFadeTransition,
    BaseLogo,
    BaseHeading,
    ResetPasswordForm,
    ValidationObserver,
  },
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    passwordResetComplete: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      password: null,
    };
  },
  methods: {
    async onClickResetPassword() {
      const isValid = await this.$refs.observer.validate();
      if (isValid) {
        this.$emit('click:reset-password', {
          password: this.password,
        });
      }
    },
  },

};
</script>

<style scoped>
  .form-container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  .form-container > span {
    min-width: 350px;
  }
</style>
