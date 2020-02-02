<template>
  <tutorials-template
    :query="searchQuery"
    :loading="requesting"
    :loadable="loadable"
    :tutorials="tutorials"
    :order-by="orderBy"
    @add:tutorial="onAddTutorial"
    @change:query="onChangeQuery"
    @click:search="onChangeQuery"
    @click:show-more="onClickShowMore"
    @sort="onSort"
    @click:delete="onClickDelete"
    @click:edit="onClickEdit"
    @click:go="onClickGo"
    @switch="onSwitch"
    @click:performance="onClickPerformance"
    ref="template"
    :should-show-create-tutorial-form.sync="shouldShowCreateTutorialForm"
    :should-show-extension-not-installed-modal.sync="shouldShowExtensionNotInstalledModal"
  />
</template>
<script>
import { mapState, mapActions } from 'vuex';
import { debounce } from 'debounce';
import TutorialsTemplate from '../../templates/TutorialsTemplate';
import { QUERY_LIMIT } from '../../../utils/constants';
import chromeExtension from '../../../chromeExtension';

export default {
  name: 'TutorialsPage',
  components: {
    TutorialsTemplate,
  },
  computed: {
    loadable() {
      return !this.allFetched && this.tutorials.length >= QUERY_LIMIT;
    },
    ...mapState('tutorial', [
      'tutorials',
      'searchQuery',
      'requesting',
      'allFetched',
      'orderBy',
      'repositoryReady',
    ]),
  },
  data() {
    return {
      shouldShowCreateTutorialForm: false,
      shouldShowExtensionNotInstalledModal: false,
    };
  },
  mounted() {
    if (this.repositoryReady && this.tutorials.length === 0) {
      this.listTutorials();
    }
  },
  methods: {
    ...mapActions('tutorial', [
      'listTutorials',
      'addTutorial',
      'updateTutorial',
      'deleteTutorial',
      'sortTutorials',
      'selectTutorial',
    ]),
    async onSort(orderBy) {
      if (this.loadable) {
        this.listTutorials({
          orderBy,
        });
      } else {
        this.sortTutorials(orderBy);
      }
    },
    onClickShowMore() {
      this.listTutorials();
    },
    onClickEdit(tutorial) {
      this.$router.push({
        name: 'tutorials.show',
        params: {
          id: tutorial.id,
        },
      });
    },
    async onClickGo(tutorial) {
      const selected = await chromeExtension.selectTutorial(tutorial);
      if (selected) {
        window.open(tutorial.buildUrl, '_blank');
      } else {
        this.shouldShowExtensionNotInstalledModal = true;
      }
    },
    onClickDelete(tutorial) {
      this.deleteTutorial(tutorial);
    },
    onChangeQuery: debounce(function (query) {
      this.listTutorials({
        searchQuery: query,
      });
    }, 500),
    async onAddTutorial(tutorial) {
      await this.addTutorial(tutorial);
      await chromeExtension.selectTutorial(tutorial);
      this.shouldShowCreateTutorialForm = false;
      window.open(tutorial.buildUrl, '_blank');
    },
    onSwitch(tutorial) {
      this.updateTutorial(tutorial);
    },
    onClickPerformance(tutorial) {
      this.$router.push({
        name: 'tutorials.performance',
        params: {
          id: tutorial.id,
        },
      });
    },
  },
};
</script>
