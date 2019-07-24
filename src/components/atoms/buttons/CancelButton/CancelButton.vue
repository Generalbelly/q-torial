<template>
  <base-button @click="$emit('click')">
    Cancel
  </base-button>
</template>

<script>
import BaseButton from '../../BaseButton';

export default {
  name: 'CancelButton',
  components: { BaseButton },
};
</script>

<style scoped></style>
