<template>
  <base-icon
    icon="question-circle"
    @click.native="$emit('click', $event)"
    pack="far"
    v-bind="$attrs"
  >
  </base-icon>
</template>

<script>
import BaseIcon from '../BaseIcon';

export default {
  name: 'QuestionCircleIcon',
  components: { BaseIcon },
};
</script>

<style scoped>

</style>
