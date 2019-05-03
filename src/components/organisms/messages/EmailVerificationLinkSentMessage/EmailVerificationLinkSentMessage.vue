<template>
  <div class="has-text-centered">
    <base-heading>
      Verify you email
    </base-heading>
    <base-message
      type="is-success"
      active
    >
      Please check your inbox for a verification email.<br/>
      Click the link in the email to verify you email address.
    </base-message>
  </div>
</template>

<script>
import BaseMessage from '../../../atoms/BaseMessage';
import BaseHeading from '../../../atoms/BaseHeading';

export default {
  name: 'EmailVerificationLinkSentMessage',
  components: {
    BaseHeading,
    BaseMessage,
  },
};
</script>

<style scoped>

</style>
