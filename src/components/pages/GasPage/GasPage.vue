<template>
  <gas-template
    :query="searchQuery"
    :loading="requesting"
    :loadable="loadable"
    :gas="gas"
    :order-by="orderBy"
    @click:add="onClickAdd"
    @click:edit="onClickEdit"
    @change:query="onChangeQuery"
    @click:search="onChangeQuery"
    @click:show-more="onClickShowMore"
    @sort="onSort"
    @click:delete="onClickDelete"
  />
</template>
<script>
import { debounce } from 'debounce';
import { mapState, mapActions } from 'vuex';
import { QUERY_LIMIT } from '../../../utils/constants';
import gapi from '../../../google-analytics';
import GasTemplate from '../../templates/GasTemplate/GasTemplate';

export default {
  name: 'GasPage',
  components: {
    GasTemplate,
  },
  computed: {
    loadable() {
      return !this.allFetched && this.gas.length >= QUERY_LIMIT;
    },
    ...mapState('ga', [
      'gas',
      'searchQuery',
      'requesting',
      'allFetched',
      'orderBy',
    ]),
  },
  created() {
    this.listGas();
  },
  mounted() {
    gapi.init(
      process.env.VUE_APP_GOOGLE_ANALYTICS_CLIENT_ID,
      process.env.VUE_APP_GOOGLE_ANALYTICS_API_KEY,
      'email https://www.googleapis.com/auth/analytics.readonly',
    );
  },
  methods: {
    ...mapActions('ga', [
      'listGas',
      'addGa',
      'deleteGa',
      'sortGas',
      'selectGa',
    ]),
    async onSort(orderBy) {
      if (this.loadable) {
        await this.listGas({
          orderBy,
        });
      } else {
        await this.sortGas(orderBy);
      }
    },
    async onClickShowMore() {
      await this.listGas();
    },
    async onClickAdd() {
      const response = await this.addGa();
      await this.$router.push({
        name: 'gas.show',
        params: {
          id: response.data.id,
        },
      });
    },
    async onClickEdit(ga) {
      await this.selectGa(ga);
      await this.$router.push({
        name: 'gas.show',
        params: {
          id: ga.id,
        },
      });
    },
    async onClickDelete(ga) {
      await this.deleteGa({
        data: ga.toPlainObject(),
      });
    },
    onChangeQuery: debounce(async function (query) {
      await this.listGas({
        searchQuery: query,
      });
    }, 500),
  },
};
</script>
