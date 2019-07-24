<template>
  <base-button
    type="is-primary"
    @click="$emit('click', $event)"
    v-bind="$attrs"
  >
    <slot>Go</slot>
  </base-button>
</template>

<script>
import BaseButton from '../../BaseButton';

export default {
  name: 'GoButton',
  components: {
    BaseButton,
  },
};
</script>

<style scoped></style>
