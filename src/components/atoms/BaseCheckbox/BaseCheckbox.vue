<template>
  <b-checkbox
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot />
  </b-checkbox>
</template>

<script>
export default {
  name: 'BaseCheckbox',
};
</script>
