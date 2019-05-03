<template>
  <div
    class="navbar-menu"
    :class="isActive ? 'is-active' : ''"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'BaseNavbarMenu',
  props: {
    isActive: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
