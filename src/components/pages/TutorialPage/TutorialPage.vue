<template>
  <tutorial-template
    :tutorial="tutorial"
    :loading="requesting"
    @update:tutorial="updateTutorial"
  />
</template>
<script>
import { mapState, mapActions } from 'vuex';
import TutorialTemplate from '../../templates/TutorialTemplate';

export default {
  name: 'TutorialPage',
  components: {
    TutorialTemplate,
  },
  computed: {
    ...mapState(['requesting', 'user', 'tutorial']),
  },
  methods: {
    ...mapActions([
      'updateTutorial',
    ]),
  },
};
</script>
