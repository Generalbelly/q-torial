<template>
  <base-field v-bind="$attrs">
    <template v-slot:default="slotProps">
      <base-switch v-bind="slotProps" v-on="$listeners" />
    </template>
  </base-field>
</template>

<script>
import BaseField from '../../../atoms/BaseField';
import BaseSwitch from '../../../atoms/BaseSwitch/BaseSwitch';

export default {
  name: 'SwitchField',
  components: {
    BaseSwitch,
    BaseField,
  },
};
</script>

<style scoped></style>
