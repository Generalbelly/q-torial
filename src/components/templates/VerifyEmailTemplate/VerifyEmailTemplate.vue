<template>
  <div>
    <div class="form-container">
      <base-logo class="has-margin-bottom-6" />
      <email-verification-link-sent-message
        v-if="emailVerificationLinkSent"
      />
      <email-verification-link-expired-message
        v-else-if="emailVerificationLinkExpired"
        @click:resend="$emit('click:resend', $event)"
      />
      <verify-email-message
        v-else
        :email="email"
        @click:verify="$emit('click:verify', $event)"
      />
    </div>
    <base-loading is-full-page :active="loading" />
  </div>
</template>

<script>
import VerifyEmailMessage from '../../organisms/messages/VerifyEmailMessage';
import EmailVerificationLinkSentMessage from '../../organisms/messages/EmailVerificationLinkSentMessage';
import EmailVerificationLinkExpiredMessage from '../../organisms/messages/EmailVerificationLinkExpiredMessage';
import BaseLogo from '../../atoms/BaseLogo/BaseLogo';

export default {
  name: 'VerifyEmailTemplate',
  components: {
    BaseLogo,
    EmailVerificationLinkExpiredMessage,
    EmailVerificationLinkSentMessage,
    VerifyEmailMessage,
  },
  props: {
    email: {
      type: String,
      default: null,
    },
    emailVerificationLinkExpired: {
      type: Boolean,
      default: false,
    },
    emailVerificationLinkSent: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
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
.form-container > div {
  min-width: 350px;
}
</style>
