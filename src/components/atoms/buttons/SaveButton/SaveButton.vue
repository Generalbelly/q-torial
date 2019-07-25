<template>
  <base-button
    class="button is-primary"
    @click="$emit('click', $event)"
    icon-left="save"
    icon-pack="fas"
  >
    Save
  </base-button>
</template>

<script>
import BaseButton from '../../BaseButton/BaseButton';

export default {
  name: 'SaveButton',
  components: { BaseButton },
};
</script>

<style scoped></style>
