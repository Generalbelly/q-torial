<template>
  <base-button type="is-neutral-100" @click="$emit('click', $event)">
    Back
  </base-button>
</template>

<script>
import BaseButton from '../../BaseButton/BaseButton';

export default {
  name: 'BackButton',
  components: { BaseButton },
};
</script>

<style scoped></style>
