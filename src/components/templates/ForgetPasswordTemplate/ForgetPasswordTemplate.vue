<template>
  <div class="form-container">
    <base-logo class="has-margin-bottom-6">
    </base-logo>
    <base-heading>
      Forget your password?
    </base-heading>
    <base-fade-transition>
      <password-reset-link-sent-message
        v-show="passwordResetLinkSent"
      >
      </password-reset-link-sent-message>
    </base-fade-transition>
    <validation-observer ref="observer">
      <forget-password-form
        :email.sync="innerEmail"
        @click:reset-link="onClickResetLink"
      >
      </forget-password-form>
    </validation-observer>
    <p class="has-margin-top-5">
      <router-link :to="{ name: 'sign-in' }">
        Sign in
      </router-link>
    </p>
  </div>
</template>

<script>
import { ValidationObserver } from 'vee-validate';
import ForgetPasswordForm from '../../organisms/forms/ForgetPasswordForm';
import BaseHeading from '../../atoms/BaseHeading';
import BaseMessage from '../../atoms/BaseMessage';
import BaseFadeTransition from '../../atoms/transitions/BaseFadeTransition';
import PasswordResetLinkSentMessage
  from '../../organisms/messages/PasswordResetLinkSentMessage/PasswordResetLinkSentMessage';
import BaseLogo from '../../atoms/BaseLogo/BaseLogo';

export default {
  name: 'ForgetPasswordTemplate',
  components: {
    BaseLogo,
    PasswordResetLinkSentMessage,
    BaseFadeTransition,
    BaseMessage,
    BaseHeading,
    ForgetPasswordForm,
    ValidationObserver,
  },
  props: {
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
      console.log('vee-validate');
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
