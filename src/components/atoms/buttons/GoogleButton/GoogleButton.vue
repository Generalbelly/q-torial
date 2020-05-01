<template>
  <img
    src="/img/btn_google_signin.png"
    alt="sign-in-with-google"
    :width="width"
    @click="$emit('click', $event)"
  />
</template>

<script>
export default {
  name: 'GoogleButton',
  props: {
    width: {
      type: String,
      default: '200px',
    },
  },
};
</script>

<style scoped></style>
