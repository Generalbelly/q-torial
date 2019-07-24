<template>
    <base-button
        class="is-primary"
        @click="$emit('click')"
    >
        Send
    </base-button>
</template>

<script>
import BaseButton from '../../BaseButton';

export default {
  name: 'SendButton',
  components: { BaseButton },
};
</script>

<style scoped>

</style>
