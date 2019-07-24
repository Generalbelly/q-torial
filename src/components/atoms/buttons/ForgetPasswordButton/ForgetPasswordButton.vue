<template>
    <base-button
        class="is-primary"
        @click="$emit('click')"
    >
        Send password reset link
    </base-button>
</template>

<script>
import BaseButton from '../../BaseButton';

export default {
  name: 'ForgetPasswordButton',
  components: { BaseButton },
};
</script>

<style scoped>

</style>
