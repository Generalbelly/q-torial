<template>
  <base-button @click="$emit('click')" v-bind="$attrs">
    <!--  <base-button-->
    <!--    @click="$emit('click')"-->
    <!--    icon-left="play"-->
    <!--    icon-pack="fa"-->
    <!--    v-bind="$attrs"-->
    <!--  >-->
    <slot>Preview</slot>
  </base-button>
</template>

<script>
import BaseButton from '../../BaseButton';

export default {
  name: 'PreviewButton',
  components: {
    BaseButton,
  },
};
</script>

<style scoped></style>
