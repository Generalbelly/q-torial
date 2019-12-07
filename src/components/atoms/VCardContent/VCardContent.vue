<template>
  <div v-bind="$attrs" v-on="$listeners" class="card-content">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'VCardContent',
};
</script>
