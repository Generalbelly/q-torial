<template>
  <base-icon
    icon="code"
    v-bind="$attrs"
    @click="$emit('click', $event)"
  >
  </base-icon>
</template>

<script>
import BaseIcon from '../BaseIcon';

export default {
  name: 'CodeIcon',
  components: { BaseIcon },
};
</script>

<style scoped>

</style>
