<template>
  <b-button v-bind="$attrs" v-on="$listeners">
    <slot />
  </b-button>
</template>

<script>
export default {
  name: 'BaseButton',
  props: {
    clickableWithEnter: {
      type: Boolean,
      default: false,
    },
  },
  beforeDestroy() {
    window.removeEventListener('keyup', this.onKeyup);
  },
  watch: {
    clickableWithEnter: {
      immediate: true,
      handler(value) {
        if (value) {
          window.addEventListener('keyup', this.onKeyup);
        }
      },
    },
  },
  methods: {
    onKeyup(e) {
      if (e.keyCode === 13) {
        this.$emit('click');
      }
    },
  },
};
</script>
