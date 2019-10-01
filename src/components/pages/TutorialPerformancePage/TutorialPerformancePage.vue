<template>
  <tutorial-performance-template
    :tutorial="tutorial"
    :loading="requesting"
  />
</template>
<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import TutorialPerformanceTemplate from '../../templates/TutorialPerformanceTemplate';

export default {
  name: 'TutorialPerformancePage',
  components: {
    TutorialPerformanceTemplate,
  },
  computed: {
    ...mapState('tutorial', [
      'requesting',
    ]),
    ...mapGetters('tutorial', [
      'tutorial',
    ]),
  },
  async created() {
    if (!this.tutorial || this.tutorial.id !== this.$route.params.id) {
      await this.getTutorial({
        id: this.$route.params.id,
      });
      this.selectTutorial({
        id: this.$route.params.id,
      });
    }
    this.getPerformance({
      id: this.tutorial.id,
      from: '2019-09-25',
      to: '2019-09-30',
    });
  },
  methods: {
    ...mapActions('tutorial', [
      'getPerformance',
      'getTutorial',
      'selectTutorial',
    ]),
  },
};
</script>
