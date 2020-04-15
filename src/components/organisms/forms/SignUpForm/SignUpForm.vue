<template>
  <form>
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
    <validatable-checkbox-field
      v-if="hasDocsCheck"
      name="agreement to terms of service and privacy policy"
      rules="required:true"
      v-model="innerDocsChecked"
      tag="div"
      class="has-margin-top-4"
    >
      <small>I accept the <a href="/terms-of-service" target="_blank">Terms Of Service</a> and <a href="/privacy-policy" target="_blank">Privacy Policy</a></small>
    </validatable-checkbox-field>
  </form>
</template>
<script>
import ValidatablePasswordField from '../../../molecules/fields/ValidatablePasswordField';
import ValidatableEmailField from '../../../molecules/fields/ValidatableEmailField';
import ValidatableCheckboxField from '../../../molecules/fields/ValidatableCheckboxField';

export default {
  name: 'SignUpForm',
  components: {
    ValidatableCheckboxField,
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
    docsChecked: {
      type: Boolean,
      default: false,
    },
    hasDocsCheck: {
      type: Boolean,
      default: true,
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
    innerDocsChecked: {
      get() {
        return this.docsChecked;
      },
      set(newValue) {
        this.$emit('update:docs-checked', newValue);
      },
    },
  },
};
</script>

<style scoped>
</style>
