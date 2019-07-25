<template>
  <base-button @click="$emit('click', $event)">
    Confirm
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
