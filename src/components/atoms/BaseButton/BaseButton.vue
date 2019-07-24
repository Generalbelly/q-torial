<template>
  <b-button v-bind="$attrs" v-on="$listeners">
    <slot />
  </b-button>
</template>

<script>
export default {
  name: 'BaseButton',
};
</script>
