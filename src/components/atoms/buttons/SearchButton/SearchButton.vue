<template>
  <base-button class="button" @click="$emit('click', $event)">
    Search
  </base-button>
</template>
<script>
import BaseButton from '../../BaseButton/BaseButton';

export default {
  name: 'SearchButton',
  components: {
    BaseButton,
  },
};
</script>
