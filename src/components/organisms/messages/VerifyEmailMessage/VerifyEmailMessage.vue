<template>
  <div class="has-text-centered">
    <base-heading>
      Verify your email
    </base-heading>
    <p class="content">{{ email }}</p>
    <verify-button
      class="is-fullwidth"
      @click="$emit('click:verify', $event)"
    >
    </verify-button>
  </div>
</template>

<script>
import BaseHeading from '../../../atoms/BaseHeading';
import VerifyButton from '../../../atoms/buttons/VerifyButton';

export default {
  name: 'VerifyEmailMessage',
  components: {
    VerifyButton,
    BaseHeading,
  },
  props: {
    email: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>

</style>
