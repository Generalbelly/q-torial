<template>
  <div class="has-text-centered">
    <error-heading></error-heading>
    <base-message
      type="is-warning"
      active
    >
      The link you followed has already expired.<br/>
    </base-message>
    <re-send-email-verification-link-button
      class="is-fullwidth"
      @click="$emit('click:resend', $event)"
    >
    </re-send-email-verification-link-button>
  </div>
</template>

<script>
import BaseMessage from '../../../atoms/BaseMessage';
import ErrorHeading from '../../../atoms/ErrorHeading/ErrorHeading';
import ReSendEmailVerificationLinkButton from '../../../atoms/buttons/ReSendEmailVerificationLinkButton';

export default {
  name: 'EmailVerificationLinkExpiredMessage',
  components: {
    ReSendEmailVerificationLinkButton,
    ErrorHeading,
    BaseMessage,
  },
};
</script>

<style scoped>

</style>
