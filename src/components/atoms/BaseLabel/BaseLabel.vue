<template>
  <label class="label" :class="size">
    <slot></slot>
  </label>
</template>

<script>
export default {
  name: 'BaseLabel',
  props: {
    size: {
      type: String,
      default: null,
    },
  },
};
</script>
