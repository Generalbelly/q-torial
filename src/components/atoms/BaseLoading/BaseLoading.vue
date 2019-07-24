<template>
  <b-loading v-bind="$attrs" v-on="$listeners">
    <slot />
  </b-loading>
</template>

<script>
export default {
  name: 'BaseLoading',
};
</script>
