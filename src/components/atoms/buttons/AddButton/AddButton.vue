<template>
  <base-button
    type="is-primary"
    @click="$emit('click', $event)"
    icon-left="plus"
    icon-pack="fa"
    v-bind="$attrs"
  >
    <slot>Add</slot>
  </base-button>
</template>

<script>
import BaseButton from '../../BaseButton';

export default {
  name: 'AddButton',
  components: {
    BaseButton,
  },
};
</script>

<style scoped></style>
