<template>
    <tag-template
      :user="user"
    >
    </tag-template>
</template>

<script>
import { mapState } from 'vuex';
import TagTemplate from '../../templates/TagTemplate';

export default {
  name: 'TagPage',
  components: {
    TagTemplate,
  },
  computed: {
    ...mapState([
      'user',
    ]),
  },
};
</script>

<style scoped>
</style>
