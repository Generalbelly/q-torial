<template>
  <div>
    <validatable-email-field
      name="email"
      rules="email|required"
      v-model="innerEmail"
    />
  </div>
</template>
<script>
import ValidatableEmailField from '../../../molecules/fields/ValidatableEmailField';

export default {
  name: 'ForgetPasswordForm',
  components: {
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
