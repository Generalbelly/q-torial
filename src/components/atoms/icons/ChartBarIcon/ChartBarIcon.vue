<template>
  <base-icon
    icon="chart-bar"
    v-bind="$attrs"
    @click.native="$emit('click', $event)"
  >
  </base-icon>
</template>

<script>
import BaseIcon from '../BaseIcon';

export default {
  name: 'ChartBarIcon',
  components: { BaseIcon },
};
</script>

<style scoped>

</style>
