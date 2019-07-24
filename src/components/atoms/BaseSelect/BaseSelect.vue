<template>
  <b-select v-bind="$attrs" v-on="$listeners">
    <slot></slot>
  </b-select>
</template>

<script>
export default {
  name: 'BaseSelect',
};
</script>
