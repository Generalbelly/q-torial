<template>
  <div class="form">
    <validatable-email-field
      label="Email"
      name="email"
      rules="email|required"
      v-model="innerEmail"
    ></validatable-email-field>
    <validatable-password-field
      label="Password"
      name="password"
      rules="required|min:6|confirmed:confirmation"
      v-model="innerPassword"
    ></validatable-password-field>
    <validatable-password-field
      label="Password Confirmation"
      name="password confirmation"
      rules="required"
      confirmation
      v-model="passwordConfirmation"
    ></validatable-password-field>
    <sign-up-button
      @click="$emit('click:sign-up')"
      class="has-margin-top-5 is-fullwidth"
    >
    </sign-up-button>
  </div>
</template>
<script>
import ValidatablePasswordField from '../../../molecules/fields/ValidatablePasswordField';
import ValidatableEmailField from '../../../molecules/fields/ValidatableEmailField';
import SignUpButton from '../../../atoms/buttons/SignUpButton';

export default {
  name: 'SignUpForm',
  components: {
    ValidatableEmailField,
    ValidatablePasswordField,
    SignUpButton,
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
