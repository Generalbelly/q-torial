<template>
  <base-button v-bind="$attrs" v-on="$listeners">
    Show more
  </base-button>
</template>

<script>
import BaseButton from '../../BaseButton';

export default {
  name: 'ShowMoreButton',
  components: {
    BaseButton,
  },
};
</script>

<style scoped></style>
