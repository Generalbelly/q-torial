<template>
    <tag-template
      :user="user"
    >
    </tag-template>
</template>

<script>
import { mapState } from 'vuex';
import TagTemplate from '../../templates/TagTemplate';
import { getUserFirebaseService } from '../../../firebase';

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
