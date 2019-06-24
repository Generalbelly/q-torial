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
      default: undefined,
    },
    label: {
      type: String,
      default: undefined,
    },
    labelFor: {
      type: String,
      default: undefined,
    },
    customClass: {
      type: String,
      default: undefined,
    },
    message: {
      type: [String, Array, Object],
      default: undefined,
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
      default: undefined,
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
