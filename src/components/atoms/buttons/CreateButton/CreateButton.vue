<template>
  <base-button
    type="is-primary"
    @click="$emit('click', $event)"
  >
    <slot>
      Create
    </slot>
  </base-button>
</template>

<script>
import BaseButton from '../../BaseButton';

export default {
  name: 'CreateButton',
  components: {
    BaseButton,
  },
};
</script>

<style scoped></style>
