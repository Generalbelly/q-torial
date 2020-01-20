<template>
  <v-card>
    <v-card-content>
      <slot />
    </v-card-content>
  </v-card>
</template>
<script>

import VCard from '../../atoms/VCard/VCard';
import VCardContent from '../../atoms/VCardContent/VCardContent';

export default {
  name: 'BaseCard',
  components: {
    VCardContent,
    VCard,
  },
};
</script>
