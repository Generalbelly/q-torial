<template>
  <base-icon
    icon="frown"
    pack="far"
    v-bind="$attrs"
    @click="$emit('click', $event)"
  >
  </base-icon>
</template>

<script>
import BaseIcon from '../BaseIcon';

export default {
  name: 'FrownIcon',
  components: { BaseIcon },
};
</script>

<style scoped>

</style>
