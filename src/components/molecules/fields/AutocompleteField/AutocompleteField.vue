<template>
  <base-field v-bind="$attrs">
    <template v-slot:default="slotProps">
      <base-autocomplete :data="items" v-bind="slotProps" v-on="$listeners">
        <template
          v-for="slot in Object.keys($scopedSlots)"
          :slot="slot"
          slot-scope="scope"
        >
          <slot :name="slot" v-bind="scope"> </slot>
        </template>
      </base-autocomplete>
    </template>
  </base-field>
</template>

<script>
import BaseField from '../../../atoms/BaseField';
import BaseAutocomplete from '../../../atoms/BaseAutocomplete';

export default {
  name: 'AutocompleteField',
  components: {
    BaseAutocomplete,
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
