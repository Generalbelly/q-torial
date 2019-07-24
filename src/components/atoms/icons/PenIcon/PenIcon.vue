<template>
  <base-icon
    icon="pen"
    v-bind="$attrs"
    @click="$emit('click', $event)"
  >
  </base-icon>
</template>

<script>
import BaseIcon from '../BaseIcon';

export default {
  name: 'PenIcon',
  components: { BaseIcon },
};
</script>

<style scoped>

</style>
