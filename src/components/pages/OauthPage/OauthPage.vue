<template>
  <oauth-template
    :ga="selectedGA"
    :loading="requesting"
    :google-analytics-account-options="googleAnalyticsAccountOptions"
    :google-analytics-web-property-options="googleAnalyticsWebPropertyOptions"
    @update:ga="updateGA"
    @click:cancel="onClickCancel"
    @click:ga-connect="onClickGAConnect"
    @click:ga-delete="onClickGADelete"
    @click:ga-property-edit="onClickGAPropetyEdit"
  />
</template>
<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import gapi from '../../../google-analytics';
import OauthTemplate from '../../templates/OauthTemplate/OauthTemplate';

export default {
  name: 'OauthPage',
  components: {
    OauthTemplate,
  },
  data() {
    return {
      googleAnalyticsAccounts: [],
    };
  },
  computed: {
    ...mapState('ga', [
      'requesting',
    ]),
    ...mapGetters('ga', [
      'selectedGA',
    ]),
    googleAnalyticsAccountOptions() {
      return this.googleAnalyticsAccounts.map(account => ({
        text: account.name,
        value: account.id,
      }));
    },
    googleAnalyticsAccount() {
      if (!this.innerAccountId) return null;
      return this.googleAnalyticsAccounts.find(account => account.id === this.innerAccountId);
    },
    googleAnalyticsWebPropertyOptions() {
      if (!this.googleAnalyticsAccount) {
        return [];
      }
      return this.googleAnalyticsAccount.webProperties.map(property => ({
        text: property.name,
        value: property.id,
      }));
    },
  },
  mounted() {
    gapi.init();
    if (this.$route.name === 'gas.show' && !this.ga) {
      this.selectGA({
        id: this.$route.params.id,
      });
    }

    const fragmentString = window.location.hash.substring(1);
    const params = {};
    const regex = /([^&=]+)=([^&]*)/g
    let m;
    let flg = true;
    while (flg) {
      m = regex.exec(fragmentString);
      flg = !!m;
      if (flg) {
        params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
      }
    }
    if (Object.keys(params).length > 0 && params.state && params.state === process.env.VUE_APP_NAME) {
      console.log(params);
    }
  },
  methods: {
    ...mapActions('ga', [
      'addOAuth',
      'addGA',
      'updateGA',
      'selectGA',
      'deleteGA',
    ]),
    onClickCancel() {
      this.$router.push({
        name: 'oauths.index',
      });
    },
    onClickGAConnect: async () => {
      const authData = {
        client_id: process.env.VUE_APP_GOOGLE_ANALYTICS_CLIENT_ID,
        scope: [
          'https://www.googleapis.com/auth/analytics.readonly',
        ],
        immediate: false,
      };
      await gapi.authorize(authData);
      this.googleAnalyticsAccounts = await gapi.queryAccounts();
    },
    onClickGADelete(id) {
      this.deleteGA({
        id,
      });
    },
    onClickGAPropetyEdit(id) {
      console.log('onClickGAPropetyEdit', id);
    },
  },
};
</script>
