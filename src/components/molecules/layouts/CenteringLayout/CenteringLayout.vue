<template>
  <div class="centering-container">
    <div class="centering-content">
      <slot name="content" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'CenteringLayout',
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
  min-width: 350px;
  max-width: 350px;
  margin: auto;
}
</style>
