<template>
  <base-message
    type="is-success"
    active
  >
    We've emailed your password reset link!
  </base-message>
</template>

<script>
import BaseMessage from '../../../atoms/BaseMessage';

export default {
  name: 'PasswordResetLinkSentMessage',
  components: {
    BaseMessage,
  },
};
</script>

<style scoped>

</style>
