<template>
  <base-field v-bind="$attrs">
    <template v-slot:default="slotProps">
      <base-select v-bind="slotProps" v-on="$listeners">
        <option
          v-for="(option, optionIndex) in items"
          :key="optionIndex"
          :value="option.value"
        >
          {{ option.text }}
        </option>
      </base-select>
    </template>
  </base-field>
</template>

<script>
import BaseField from '../../../atoms/BaseField';
import BaseSelect from '../../../atoms/BaseSelect';

export default {
  name: 'SelectField',
  components: {
    BaseSelect,
    BaseField,
  },
  props: {
    items: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style scoped></style>
