<template>
  <b-icon
    v-on="$listeners"
    v-bind="$attrs"
    @click.native="$emit('click', $event)"
  />
</template>

<script>
export default {
  name: 'BaseIcon',
};
</script>
