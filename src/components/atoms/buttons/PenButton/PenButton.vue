<template>
  <base-button v-bind="$attrs" @click="$emit('click', $event)" icon-right="pen">
  </base-button>
</template>

<script>
import BaseButton from '../../BaseButton';

export default {
  name: 'PenButton',
  components: { BaseButton },
};
</script>

<style scoped></style>
