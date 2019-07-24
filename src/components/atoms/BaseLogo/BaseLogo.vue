<template>
  <img
    src="https://bulma.io/images/bulma-logo.png"
    :width="width"
    :height="height"
  />
</template>

<script>
export default {
  name: 'BaseLogo',
  props: {
    width: {
      type: String,
      default: '112',
    },
    height: {
      type: String,
      default: '20',
    },
  },
};
</script>

<style scoped></style>
