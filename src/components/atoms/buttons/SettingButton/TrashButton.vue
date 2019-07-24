<template>
  <base-button v-bind="$attrs" @click="$emit('click', $event)" icon-right="cog">
  </base-button>
</template>

<script>
import BaseButton from '../../BaseButton';

export default {
  name: 'SettingButton',
  components: { BaseButton },
};
</script>

<style scoped></style>
