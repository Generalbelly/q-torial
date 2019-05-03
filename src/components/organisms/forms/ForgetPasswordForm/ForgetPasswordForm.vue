<template>
  <div>
    <p class="has-margin-bottom-4">Please enter the email registered on your account.</p>
    <validatable-email-field
      name="email"
      rules="email|required"
      v-model="innerEmail"
    ></validatable-email-field>
    <forget-password-button
      @click="$emit('click:reset-link')"
      class="has-margin-top-5 is-fullwidth"
    >
    </forget-password-button>
  </div>
</template>
<script>
import ValidatableEmailField from '../../../molecules/fields/ValidatableEmailField';
import ForgetPasswordButton from '../../../atoms/buttons/ForgetPasswordButton';

export default {
  name: 'ForgetPasswordForm',
  components: {
    ForgetPasswordButton,
    ValidatableEmailField,
  },
  props: {
    email: {
      type: String,
      default: null,
    },
  },
  computed: {
    innerEmail: {
      get() {
        return this.email;
      },
      set(newValue) {
        this.$emit('update:email', newValue);
      },
    },
  },
};
</script>

<style scoped>
</style>
