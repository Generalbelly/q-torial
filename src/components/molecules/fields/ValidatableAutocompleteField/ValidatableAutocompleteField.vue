<template>
  <validation-provider :name="name" :rules="rules">
    <autocomplete-field
      v-bind="$attrs"
      slot-scope="{ errors, valid }"
      :message="errors"
      v-model="inputValue"
      :type="getType(errors, valid)"
    >
      <template
        v-for="slot in Object.keys($scopedSlots)"
        :slot="slot"
        slot-scope="scope"
      >
        <slot :name="slot" v-bind="scope" />
      </template>
    </autocomplete-field>
  </validation-provider>
</template>

<script>
import { ValidationProvider } from 'vee-validate';
import validatable from '../../../mixins/validatable';
import AutocompleteField from '../AutocompleteField';

export default {
  name: 'ValidatableAutocompleteField',
  mixins: [validatable],
  props: {
    value: {
      type: String,
      default: null,
    },
    items: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  components: {
    AutocompleteField,
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
