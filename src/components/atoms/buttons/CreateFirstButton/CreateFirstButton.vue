<template>
  <base-button type="is-accent-500" @click="$emit('click')" icon-left="rocket">
    <slot>
      Create your first item
    </slot>
  </base-button>
</template>

<script>
import BaseButton from '../../BaseButton/BaseButton';

export default {
  name: 'CreateFirstButton',
  components: {
    BaseButton,
  },
};
</script>

<style scoped></style>
