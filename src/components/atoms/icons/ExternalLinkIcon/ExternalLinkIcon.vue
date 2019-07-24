<template>
  <base-icon
    icon="external-link-alt"
    v-bind="$attrs"
    @click="$emit('click', $event)"
  >
  </base-icon>
</template>

<script>
import BaseIcon from '../BaseIcon';

export default {
  name: 'ExternalLinkIcon',
  components: { BaseIcon },
};
</script>

<style scoped>

</style>
