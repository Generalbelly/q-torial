<template>
    <base-button
        class="is-primary"
        @click="$emit('click')"
    >
      Verify
    </base-button>
</template>

<script>
import BaseButton from '../../BaseButton';

export default {
  name: 'VerifyButton',
  components: { BaseButton },
};
</script>

<style scoped>

</style>
