<template>
  <base-button
    type="is-primary"
    @click="$emit('click', $event)"
    v-bind="$attrs"
  >
    <slot />
  </base-button>
</template>

<script>
import BaseButton from '../../BaseButton';

export default {
  name: 'PrimaryButton',
  components: {
    BaseButton,
  },
};
</script>

<style scoped></style>
