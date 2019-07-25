<template>
  <tutorial-template
    :tutorial="selectedTutorial"
    :loading="requesting"
    @update:tutorial="updateTutorial"
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
      'selectedTutorial',
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
    onClickCancel() {
      this.$router.push({
        name: 'tutorials.index',
      });
    }
  },
};
</script>
