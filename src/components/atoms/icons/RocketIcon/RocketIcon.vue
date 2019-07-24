<template>
  <base-icon
    icon="rocket"
    v-bind="$attrs"
    @click.native="$emit('click', $event)"
  >
  </base-icon>
</template>

<script>
import BaseIcon from '../BaseIcon';

export default {
  name: 'RocketIcon',
  components: { BaseIcon },
};
</script>

<style scoped>

</style>
