<template>
  <span
    class="icon"
    @click="$emit('click')"
    :class="size"
  >
    <font-awesome-icon
      :icon="icon"
    ></font-awesome-icon>
  </span>
</template>

<script>
export default {
  name: 'BaseIcon',
  props: {
    icon: {
      type: String,
      default: null,
    },
    size: {
      type: String,
      default: null,
    },
  },
};
</script>
