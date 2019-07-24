<template>
  <base-button class="button" @click="$emit('click')">
    Delete
  </base-button>
</template>

<script>
import BaseButton from '../../BaseButton';

export default {
  name: 'DeleteButton',
  components: { BaseButton },
};
</script>

<style scoped></style>
