<template>
  <div class="field">
    <base-radio
      v-bind="$attrs"
      v-on="$listeners"
    >
    </base-radio>
  </div>
</template>

<script>
import BaseRadio from '../../../atoms/BaseRadio';

export default {
  name: 'RadioField',
  components: {
    BaseRadio,
  },
};
</script>

<style scoped>

</style>
