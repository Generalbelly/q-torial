<template>
  <validation-provider
    :name="name"
    :rules="rules"
    :vid="confirmation ? 'confirmation' : 'password'"
    ref="provider"
  >
    <password-field
      v-bind="$attrs"
      slot-scope="{ errors, valid }"
      :message="errors"
      v-model="inputValue"
      :type="getType(errors, valid)"
    />
  </validation-provider>
</template>

<script>
import { ValidationProvider } from 'vee-validate';
import validatable from '../../../mixins/validatable';
import PasswordField from '../PasswordField';

export default {
  name: 'ValidatablePasswordField',
  mixins: [validatable],
  props: {
    value: {
      type: String,
      default: null,
    },
    confirmation: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    PasswordField,
    ValidationProvider,
  },
  computed: {
    inputValue: {
      get() {
        return this.value;
      },
      set(newValue) {
        return this.$emit('input', newValue);
      },
    },
  },
  watch: {
    inputValue(value) {
      this.$emit('input', value);
    },
  },
};
</script>

<style scoped></style>
