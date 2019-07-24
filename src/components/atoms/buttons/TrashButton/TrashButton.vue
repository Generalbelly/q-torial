<template>
  <base-button
    v-bind="$attrs"
    @click="$emit('click', $event)"
    icon-right="trash"
  >
  </base-button>
</template>

<script>
import BaseButton from '../../BaseButton';

export default {
  name: 'TrashButton',
  components: { BaseButton },
};
</script>

<style scoped></style>
