<template>
  <base-field v-bind="$attrs">
    <template v-slot:default="slotProps">
      <base-input
        icon="credit-card"
        v-bind="slotProps"
        v-on="$listeners"
      />
    </template>
  </base-field>
</template>

<script>
import BaseField from '../../../atoms/BaseField';
import BaseInput from '../../../atoms/BaseInput';

export default {
  name: 'CreditCardField',
  components: {
    BaseInput,
    BaseField,
  },
};
</script>

<style scoped>

</style>
