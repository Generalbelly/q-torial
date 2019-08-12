<template>
  <ga-template
    :ga="selectedGa"
    :loading="requesting"
    :google-analytics-accounts="googleAnalyticsAccounts"
    @update:ga="onUpdateGa"
    @click:cancel="onClickCancel"
  />
</template>
<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import GaTemplate from '../../templates/GaTemplate';

export default {
  name: 'GaPage',
  components: {
    GaTemplate,
  },
  computed: {
    ...mapState('ga', [
      'gas',
      'googleAnalyticsAccounts',
      'requesting',
    ]),
    ...mapGetters('ga', [
      'selectedGa',
    ]),
  },
  watch: {
    gas: {
      async handler(value) {
        if (value) {
          if (value.length > 0) {
            this.selectGa({
              id: this.$route.params.id,
            });
          }
        }
      },
    },
  },
  methods: {
    ...mapActions('ga', [
      'updateGa',
      'selectGa',
    ]),
    onUpdateGa(ga) {
      this.updateGa({
        data: ga.toPlainObject(),
      });
    },
    onClickCancel() {
      this.$router.push({
        name: 'gas.index',
      });
    }
  },
};
</script>
