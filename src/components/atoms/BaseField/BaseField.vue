<template>
  <b-field
    v-bind="$props"
    v-on="$listeners"
  >
    <slot v-bind="$attrs" />
  </b-field>
</template>

<script>
export default {
  name: 'BaseField',
  props: {
    type: {
      type: [String, Object],
      default: null,
    },
    label: {
      type: String,
      default: null,
    },
    labelFor: {
      type: String,
      default: null,
    },
    customClass: {
      type: String,
      default: null,
    },
    messages: {
      type: [String, Array, Object],
      default() {
        return [];
      },
    },
    grouped: {
      type: Boolean,
      default: false,
    },
    groupMultiline: {
      type: Boolean,
      default: false,
    },
    position: {
      type: String,
      default: 'is-centered',
    },
    addons: {
      type: Boolean,
      default: false,
    },
    horizontal: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
