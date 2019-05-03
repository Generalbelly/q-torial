<template>
    <button
        class="button is-primary"
        @click="$emit('click')"
    >
      Reset Password
    </button>
</template>

<script>
export default {
  name: 'ResetPasswordButton',
};
</script>

<style scoped>

</style>
