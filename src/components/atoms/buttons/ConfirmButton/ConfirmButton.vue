<template>
  <base-button class="button" @click="$emit('click')">
    <span>Confirm</span>
  </base-button>
</template>

<script>
import BaseButton from '../../BaseButton';

export default {
  name: 'ConfirmButton',
  components: { BaseButton },
};
</script>

<style scoped></style>
