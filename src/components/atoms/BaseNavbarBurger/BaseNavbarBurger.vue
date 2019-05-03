<template>
  <a
    role="button"
    class="navbar-burger burger"
    :class="isActive ? 'is-active' : ''"
    aria-label="menu"
    aria-expanded="false"
    @click="$emit('click', $event)"
  >
    <span aria-hidden="true"></span>
    <span aria-hidden="true"></span>
    <span aria-hidden="true"></span>
  </a>
</template>

<script>
export default {
  name: 'BaseNavbarBurger',
  props: {
    isActive: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
