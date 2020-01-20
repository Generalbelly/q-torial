<template>
  <tutorial-template
    :tutorial="tutorial"
    :loading="requesting"
    :gas="gas"
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
    ...mapState('ga', [
      'gas',
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
    if (this.gas.length === 0) {
      this.listGas();
    }
  },
  methods: {
    ...mapActions('ga', [
      'listGas',
    ]),
    ...mapActions('tutorial', [
      'updateTutorial',
      'selectTutorial',
      'getTutorial',
    ]),
    async onUpdateTutorial(tutorial) {
      await this.updateTutorial({
        data: tutorial.toPlainObject(),
      });
      this.$router.push({
        name: 'tutorials.index',
      });
    },
    onClickCancel() {
      this.$router.push({
        name: 'tutorials.index',
      });
    },
  },
};
</script>
