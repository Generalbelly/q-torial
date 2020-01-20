<template>
  <div>
    <validatable-email-field
      label="Email"
      name="email"
      rules="email|required"
      v-model="innerEmail"
    />
    <validatable-password-field
      label="Password"
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
  </div>
</template>
<script>
import ValidatablePasswordField from '../../../molecules/fields/ValidatablePasswordField';
import ValidatableEmailField from '../../../molecules/fields/ValidatableEmailField';

export default {
  name: 'SignUpForm',
  components: {
    ValidatableEmailField,
    ValidatablePasswordField,
  },
  props: {
    email: {
      type: String,
      default: null,
    },
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
    innerEmail: {
      get() {
        return this.email;
      },
      set(newValue) {
        this.$emit('update:email', newValue);
      },
    },
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

<style scoped>
</style>
