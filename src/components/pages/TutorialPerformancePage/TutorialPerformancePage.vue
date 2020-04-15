<template>
  <tutorial-performance-template
    :tutorial="tutorial"
    :loading="requesting"
    :dates.sync="dates"
  />
</template>
<script>
import startOfDay from 'date-fns/startOfDay';
import endOfDay from 'date-fns/endOfDay';
import subDays from 'date-fns/subDays';
import startOfMonth from 'date-fns/startOfMonth';
import { mapState, mapActions, mapGetters } from 'vuex';
import TutorialPerformanceTemplate from '../../templates/TutorialPerformanceTemplate';

export default {
  name: 'TutorialPerformancePage',
  components: {
    TutorialPerformanceTemplate,
  },
  data() {
    return {
      dates: [],
    };
  },
  computed: {
    ...mapState('tutorial', [
      'requesting',
      'repositoryReady',
      'tutorials',
    ]),
    ...mapGetters('tutorial', [
      'tutorial',
    ]),
  },
  async mounted() {
    if (!this.tutorials.find(tutorial => tutorial.id === this.$route.params.id)) {
      await this.getTutorial(this.$route.params.id);
    }
    this.selectTutorial({
      id: this.$route.params.id,
    });
    const to = endOfDay(subDays(new Date(), 1));
    const from = startOfDay(startOfMonth(to));
    this.dates = [from, to];
  },
  watch: {
    dates(value) {
      if (this.repositoryReady && value.length === 2) {
        this.getPerformance({
          tutorial: this.tutorial,
          from: value[0],
          to: value[1],
        });
      }
    },
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
