<template>
    <base-button
        class="is-primary"
        @click="$emit('click')"
    >
        <plus-icon></plus-icon>
        <span>
            <slot>Add</slot>
        </span>
    </base-button>
</template>

<script>
import PlusIcon from '../../icons/PlusIcon';
import BaseButton from '../../BaseButton';

export default {
  name: 'AddButton',
  components: { BaseButton, PlusIcon },
};
</script>

<style scoped>

</style>
