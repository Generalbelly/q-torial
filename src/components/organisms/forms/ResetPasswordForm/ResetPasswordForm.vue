<template>
  <div>
    <validatable-password-field
      label="New password"
      name="password"
      rules="required|min:6|confirmed:confirmation"
      v-model="innerPassword"
    />
    <validatable-password-field
      label="Password Confirmation"
      name="password confirmation"
      rules="required"
      confirmation
      v-model="passwordConfirmation"
    />
    <reset-password-button
      class="has-margin-top-5 is-fullwidth"
      @click="$emit('click:reset-password')"
    />
  </div>
</template>
<script>
import ResetPasswordButton from '../../../atoms/buttons/ResetPasswordButton';
import ValidatablePasswordField from '../../../molecules/fields/ValidatablePasswordField/ValidatablePasswordField';

export default {
  name: 'ResetPasswordForm',
  components: {
    ValidatablePasswordField,
    ResetPasswordButton,
  },
  props: {
    password: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      passwordConfirmation: null,
    };
  },
  computed: {
    innerPassword: {
      get() {
        return this.password;
      },
      set(newValue) {
        this.$emit('update:password', newValue);
      },
    },
  },
};
</script>
