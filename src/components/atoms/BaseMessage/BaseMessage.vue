<template>
    <b-message
        v-bind="$attrs"
        :active="active"
    >
        <slot></slot>
    </b-message>
</template>

<script>
export default {
  name: 'BaseMessage',
  props: {
    active: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>

</style>
