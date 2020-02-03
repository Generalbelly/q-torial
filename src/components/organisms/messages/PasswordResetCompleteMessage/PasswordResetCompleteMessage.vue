<template>
  <base-message
    type="is-success"
    active
  >
    Your password has been changed!<br>
    We are redirecting you to tutorial index page.<br>
  </base-message>
</template>

<script>
import BaseMessage from '../../../atoms/BaseMessage';

export default {
  name: 'PasswordResetCompleteMessage',
  components: {
    BaseMessage,
  },
};
</script>

<style scoped>

</style>
