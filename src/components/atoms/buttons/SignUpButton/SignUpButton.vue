<template>
    <base-button
        class="button is-primary"
        @click="$emit('click')"
    >
        Sign up
    </base-button>
</template>

<script>
import BaseButton from '../../BaseButton';

export default {
  name: 'SignUpButton',
  components: { BaseButton },
};
</script>

<style scoped>

</style>
