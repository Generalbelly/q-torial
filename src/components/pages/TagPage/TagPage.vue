<template>
    <tag-template
      :user-key="userKey"
    >
    </tag-template>
</template>

<script>
import { mapGetters } from 'vuex';
import TagTemplate from '../../templates/TagTemplate';

export default {
  name: 'TagPage',
  components: {
    TagTemplate,
  },
  data() {
    return {
      userKey: null,
    };
  },
  mounted() {
    this.userKey = this.$route.params.id
  },
};
</script>

<style scoped>
</style>
