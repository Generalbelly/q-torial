<template>
    <main
        class="container"
    >
        <base-fade-transition>
            <slot></slot>
        </base-fade-transition>
    </main>
</template>

<script>
import BaseFadeTransition from '../../../atoms/transitions/BaseFadeTransition';

export default {
  name: 'TheMain',
  components: { BaseFadeTransition },
};
</script>

<style scoped>

</style>
