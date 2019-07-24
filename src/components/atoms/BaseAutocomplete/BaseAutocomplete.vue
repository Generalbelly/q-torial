<template>
  <b-autocomplete v-bind="$attrs" v-on="$listeners">
    <slot />
  </b-autocomplete>
</template>

<script>
export default {
  name: 'BaseAutocomplete',
};
</script>
