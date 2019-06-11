<template>
  <div class="field">
    <base-checkbox
      v-bind="$attrs"
      v-on="$listeners"
    >
      <slot></slot>
    </base-checkbox>
  </div>
</template>

<script>
import BaseCheckbox from '../../../atoms/BaseCheckbox';

export default {
  name: 'CheckboxField',
  components: {
    BaseCheckbox,
  },
};
</script>

<style scoped>

</style>
