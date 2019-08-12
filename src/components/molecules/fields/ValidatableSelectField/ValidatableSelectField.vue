<template>
  <validation-provider :name="name" :rules="rules" ref="provider">
    <div slot-scope="{ errors, valid }">
      <input hidden v-model="fakeValue" />
      <select-field
        v-bind="$attrs"
        :message="errors"
        :value="value"
        @input="$emit('input', $event)"
        :type="getType(errors, valid)"
      />
    </div>
  </validation-provider>
</template>

<script>
import { ValidationProvider } from 'vee-validate';
import validatable from '../../../mixins/validatable';
import SelectField from '../SelectField';

export default {
  name: 'ValidatableSelectField',
  mixins: [validatable],
  props: {
    value: {
      type: String,
      default: null,
    },
  },
  components: {
    SelectField,
    ValidationProvider,
  },
  data() {
    return {
      fakeValue: null,
    };
  },
  watch: {
    value: {
      immediate: true,
      handler(value) {
        this.fakeValue = value;
      },
    },
  }
};
</script>

<style scoped></style>
