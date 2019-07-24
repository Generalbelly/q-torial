<template>
    <base-button
        class="is-primary"
        @click="$emit('click')"
    >
        Re-send confirmation email
    </base-button>
</template>

<script>
import BaseButton from '../../BaseButton';

export default {
  name: 'ReSendVerificationEmailButton',
  components: { BaseButton },
};
</script>

<style scoped>

</style>
