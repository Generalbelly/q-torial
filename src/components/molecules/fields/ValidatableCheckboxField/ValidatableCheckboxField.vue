<template>
  <validation-provider
    :name="name"
    :rules="rules"
    :tag="tag"
    ref="provider"
  >
    <checkbox-field
      v-bind="$attrs"
      slot-scope="{ errors, valid }"
      :message="errors"
      v-model="inputValue"
      :type="getType(errors, valid)"
    >
      <slot />
    </checkbox-field>
  </validation-provider>
</template>

<script>
import { ValidationProvider } from 'vee-validate';
import validatable from '../../../mixins/validatable';
import CheckboxField from '../CheckboxField/CheckboxField';

export default {
  name: 'ValidatableCheckboxField',
  mixins: [validatable],
  props: {
    value: {
      type: Boolean,
      default: null,
    },
  },
  components: {
    CheckboxField,
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
};
</script>

<style scoped></style>
