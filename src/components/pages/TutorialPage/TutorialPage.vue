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
    if (!this.tutorial) {
      // TODO tutorialが20以上ある場合は見つからないこともあるので、ループかなにかで対応する
      await this.listTutorials();
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
      'listTutorials',
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
    }
  },
};
</script>
