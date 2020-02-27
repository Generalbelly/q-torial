<template>
  <div class="field">
    <base-checkbox v-bind="$attrs" v-on="$listeners">
      <slot />
    </base-checkbox>
    <p v-if="message.length" class="help is-danger">
      {{ message.join(',') }}
    </p>
  </div>
</template>

<script>
import BaseCheckbox from '../../../atoms/BaseCheckbox';

export default {
  name: 'CheckboxField',
  props: {
    message: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  components: {
    BaseCheckbox,
  },
};
</script>

<style scoped></style>
