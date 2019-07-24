<template>
  <b-tooltip v-bind="$attrs" v-on="$listeners">
    <slot />
  </b-tooltip>
</template>

<script>
export default {
  name: 'BaseTooltip',
};
</script>
