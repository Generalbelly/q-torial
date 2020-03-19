<template>
  <div>
    <form>
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
    </form>
    <p v-if="hasForgetPasswordLink">
      <router-link :to="{ name: 'password.forget', query: { appName: 'user' } }">
        Forget your password?
      </router-link>
    </p>
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
    hasForgetPasswordLink: {
      type: Boolean,
      default: true,
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
