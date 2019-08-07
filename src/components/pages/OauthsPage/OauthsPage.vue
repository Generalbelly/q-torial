<template>
  <oauths-template
    :query="searchQuery"
    :loading="requesting"
    :loadable="loadable"
    :oauths="oauths"
    :order-by="orderBy"
    @click:add="onClickAdd"
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
import OauthsTemplate from '../../templates/OauthsTemplate';
import { QUERY_LIMIT } from '../../../utils/constants';
import gapi from '../../../google-analytics';
import firebase from '../../../firebase';

export default {
  name: 'OauthsPage',
  components: {
    OauthsTemplate,
  },
  computed: {
    loadable() {
      return !this.allFetched && this.oauths.length >= QUERY_LIMIT;
    },
    ...mapState([
      'user',
    ]),
    ...mapState('oauth', [
      'oauths',
      'searchQuery',
      'requesting',
      'allFetched',
      'orderBy',
    ]),
  },
  created() {
    this.listOauths();
  },
  mounted() {
    gapi.init(
      process.env.VUE_APP_GOOGLE_ANALYTICS_CLIENT_ID,
      process.env.VUE_APP_GOOGLE_ANALYTICS_API_KEY,
      'email https://www.googleapis.com/auth/analytics.readonly',
    );
  },
  methods: {
    ...mapActions('oauth', [
      'listOauths',
      'addOauth',
      'deleteOauth',
      'sortOauths',
    ]),
    async onSort(orderBy) {
      if (this.loadable) {
        this.listOauths({
          orderBy,
        });
      } else {
        this.sortOauths(orderBy);
      }
    },
    onClickShowMore() {
      this.listOauths();
    },
    async onClickAdd() {
      await gapi.oauth2SignIn();
      this.listOauths();
    },
    async onClickDelete(oauth) {
      console.log(oauth);
      this.deleteOauth({
        data: oauth.toPlainObject(),
      });
    },
    onChangeQuery: debounce(function (query) {
      this.listOauths({
        searchQuery: query,
      });
    }, 500),
  },
};
</script>
