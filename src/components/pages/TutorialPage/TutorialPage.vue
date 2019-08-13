<template>
  <tutorial-template
    :tutorial="tutorial"
    :loading="requesting"
    @update:tutorial="onUpdateTutorial"
    @click:cancel="onClickCancel"
  />
</template>
<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import TutorialTemplate from '../../templates/TutorialTemplate';

export default {
  name: 'TutorialPage',
  components: {
    TutorialTemplate,
  },
  computed: {
    ...mapState('tutorial', [
      'requesting',
    ]),
    ...mapGetters('tutorial', [
      'tutorial',
    ]),
  },
  mounted() {
    if (!this.tutorial) {
      this.selectTutorial({
        id: this.$route.params.id,
      });
    }
  },
  methods: {
    ...mapActions('tutorial', [
      'updateTutorial',
      'selectTutorial',
    ]),
    onUpdateTutorial(tutorial) {
      this.updateTutorial({
        data: tutorial.toPlainObject(),
      });
    },
    onClickCancel() {
      this.$router.push({
        name: 'tutorials.index',
      });
    }
  },
};
</script>
