<template>
  <b-message v-bind="$attrs" v-on="$listeners" :active="active">
    <slot />
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

<style scoped></style>
