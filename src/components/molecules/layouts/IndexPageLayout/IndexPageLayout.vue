<template>
  <div>
    <template v-if="$slots.title">
      <slot name="title"></slot>
    </template>
    <template v-else>
      <base-heading>
        {{ title }}
      </base-heading>
    </template>
    <div class="level has-margin-bottom-5">
      <div class="level-left">
        <slot name="search"></slot>
      </div>
      <div class="level-right">
        <slot name="add"></slot>
      </div>
    </div>
    <slot name="table"></slot>
  </div>
</template>

<script>
import BaseHeading from '../../../atoms/BaseHeading';

export default {
  name: 'IndexPageLayout',
  components: {
    BaseHeading,
  },
  props: {
    title: {
      type: String,
      default: null,
    },
  },
};
</script>

<style scoped></style>
