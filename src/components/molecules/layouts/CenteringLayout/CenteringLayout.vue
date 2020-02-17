<template>
  <div class="centering-container">
    <div class="centering-content" :style="{'min-width': minWidth, 'max-width': maxWidth }">
      <slot name="content" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'CenteringLayout',
  props: {
    minWidth: {
      type: String,
      default: '350px',
    },
    maxWidth: {
      type: String,
      default: '350px',
    },
  }
};
</script>

<style scoped>
.centering-container {
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.centering-content {
  margin: auto;
}
</style>
