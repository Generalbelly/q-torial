<template>
  <base-button @click="$emit('click', $event)">
    Navigate
  </base-button>
</template>

<script>
import BaseButton from '../../BaseButton/BaseButton';

export default {
  name: 'NavigateButton',
  components: {
    BaseButton,
  },
};
</script>

<style scoped></style>
