<template>
  <validation-provider :name="name" :rules="innerRules" ref="provider">
    <domain-field
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
import DomainField from '../DomainField';

export default {
  name: 'ValidatableDomainField',
  mixins: [validatable],
  props: {
    value: {
      type: String,
      default: null,
    },
    exceptionDomains: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  components: {
    DomainField,
    ValidationProvider,
  },
  computed: {
    inputValue: {
      get() {
        return this.value;
      },
      set(newValue) {
        console.log(newValue)
        return this.$emit('input', newValue);
      },
    },
    innerRules() {
      if (!this.rules && this.exceptionDomains.length === 0) {
        return 'domain';
      }
      if (!this.rules) {
        return `domain:${this.exceptionDomains.join(',')}`;
      }
      return `${this.rules}|domain:${this.exceptionDomains.join(',')}`;
    },
  },
};
</script>

<style scoped></style>
