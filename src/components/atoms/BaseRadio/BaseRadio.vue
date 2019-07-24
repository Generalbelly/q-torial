<template>
  <b-radio v-bind="$attrs" v-on="$listeners">
    <slot />
  </b-radio>
</template>

<script>
export default {
  name: 'BaseRadio',
};
</script>
