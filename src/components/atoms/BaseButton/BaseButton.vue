<template>
  <a
    v-if="href"
    :href="href"
    class="button"
  >
    <slot></slot>
  </a>
  <button
    v-else
    class="button"
    :class="size"
    @click="$emit('click', $event)"
  >
    <slot></slot>
  </button>
</template>

<script>

export default {
  name: 'BaseButton',
  components: {},
  props: {
    size: {
      type: String,
      default: null,
    },
    href: {
      type: String,
      default: null,
    },
  },
};
</script>
