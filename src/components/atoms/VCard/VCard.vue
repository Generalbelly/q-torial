<template>
  <div v-bind="$attrs" v-on="$listeners" class="card">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'VCard',
};
</script>
