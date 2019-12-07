<template>
  <base-button
    type="is-accent"
    @click="$emit('click', $event)"
    v-bind="$attrs"
  >
    <slot />
  </base-button>
</template>

<script>
import BaseButton from '../../BaseButton';

export default {
  name: 'SecondaryButton',
  components: {
    BaseButton,
  },
};
</script>

<style scoped></style>
