<template>
  <div class="screen-overlay-layout" @click="$emit('click')">
    <div class="screen-overlay-layout__content">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ScreenOverlayLayout',
};
</script>

<style scoped>
.screen-overlay-layout {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
.screen-overlay-layout__content {
  position: relative;
}
</style>
