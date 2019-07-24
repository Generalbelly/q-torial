<template>
  <tutorials-template
    :query="searchQuery"
    :loading="requesting"
    :loadable="loadable"
    :tutorials="innerTutorials"
    :order-by="orderBy"
    @add:tutorial="onAddTutorial"
    @change:query="onChangeQuery"
    @click:search="onChangeQuery"
    @click:show-more="onClickShowMore"
    @sort="onSort"
    @click:delete="onClickDelete"
    @click:edit="onClickEdit"
  />
</template>
<script>
import { mapState, mapActions } from 'vuex';
import { debounce } from 'debounce';
import TutorialsTemplate from '../../templates/TutorialsTemplate';
import { QUERY_LIMIT } from '../../../utils/constants';
import TutorialEntity from '../../atoms/Entities/TutorialEntity';

export default {
  name: 'TutorialsPage',
  components: {
    TutorialsTemplate,
  },
  computed: {
    loadable() {
      return !this.allFetched && this.tutorials.length >= QUERY_LIMIT;
    },
    innerTutorials() {
      return this.tutorials.length > 0 ? this.tutorials.map(tutorial => new TutorialEntity(tutorial)) : [];
    },
    ...mapState('tutorial', [
      'tutorials',
      'searchQuery',
      'requesting',
      'allFetched',
      'orderBy',
    ]),
  },
  created() {
    this.listTutorials();
  },
  methods: {
    ...mapActions('tutorial', [
      'listTutorials',
      'addTutorial',
      'deleteTutorial',
      'sortTutorials',
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
    onClickDelete(tutorial) {
      this.deleteTutorial(tutorial.toPlainObject());
    },
    onChangeQuery: debounce(function (query) {
      this.listTutorials({
        searchQuery: query,
      });
    }, 500),
    async onAddTutorial(tutorial) {
      const data = tutorial.toPlainObject();
      await this.addTutorial({
        data,
      });
      window.open(tutorial.buildUrl, '_blank');
    },
  },
};
</script>
