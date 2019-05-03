<template>
  <div>
    <validatable-email-field
      name="email"
      rules="email|required"
      v-model="innerEmail"
      label="Email"
    ></validatable-email-field>
    <validatable-password-field
      name="password"
      rules="required|min:6"
      v-model="innerPassword"
      label="Password"
    ></validatable-password-field>
    <p>
      <router-link :to="{ name: 'password.forget' }">
        Forget your password?
      </router-link>
    </p>
    <sign-in-button
      @click="$emit('click:sign-in')"
      class="has-margin-top-5 is-fullwidth"
    >
    </sign-in-button>
  </div>
</template>
<script>
import ValidatableEmailField from '../../../molecules/fields/ValidatableEmailField';
import ValidatablePasswordField from '../../../molecules/fields/ValidatablePasswordField';
import SignInButton from '../../../atoms/buttons/SignInButton';

export default {
  name: 'SignInForm',
  components: {
    ValidatablePasswordField,
    ValidatableEmailField,
    SignInButton,
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
