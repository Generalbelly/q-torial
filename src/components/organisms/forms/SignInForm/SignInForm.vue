<template>
  <div>
    <validatable-email-field
      name="email"
      rules="email|required"
      v-model="innerEmail"
      label="Email"
    />
    <validatable-password-field
      name="password"
      rules="required|min:6"
      v-model="innerPassword"
      label="Password"
    />
  </div>
</template>
<script>
import ValidatableEmailField from '../../../molecules/fields/ValidatableEmailField';
import ValidatablePasswordField from '../../../molecules/fields/ValidatablePasswordField';

export default {
  name: 'SignInForm',
  components: {
    ValidatablePasswordField,
    ValidatableEmailField,
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
