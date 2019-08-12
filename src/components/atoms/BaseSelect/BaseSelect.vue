<template>
  <b-select v-bind="$attrs" v-on="$listeners">
    <slot />
  </b-select>
</template>

<script>
export default {
  name: 'BaseSelect',
};
</script>
