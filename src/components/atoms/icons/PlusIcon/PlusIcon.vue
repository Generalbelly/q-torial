<template>
  <base-icon
    icon="plus"
    v-bind="$attrs"
    @click.native="$emit('click', $event)"
  >
  </base-icon>
</template>

<script>
import BaseIcon from '../BaseIcon';

export default {
  name: 'PlusIcon',
  components: { BaseIcon },
};
</script>

<style scoped>

</style>
