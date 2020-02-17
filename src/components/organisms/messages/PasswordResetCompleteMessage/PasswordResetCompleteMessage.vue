<template>
  <base-message
    type="is-success"
    active
  >
    Your password has been changed!<br>
    You can now sign in with your new password.<br>
    <router-link :to="{ name: 'sign-in' }" />
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
