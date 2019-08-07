<template>
  <index-page-layout
    key="table"
    title="Google Analytics"
  >
    <template v-slot:search>
      <search-field
        :value="query"
        @input="$emit('change:query', $event)"
        search-button-class="is-primary-050"
        @click:search="$emit('click:search')"
      />
    </template>
    <template v-slot:add>
      <add-button @click="$emit('click:add', $event)" class="is-primary" />
    </template>
    <template v-slot:table>
      <oauths-table
        :data="oauths"
        :loading="loading"
        :loadable="loadable"
        :order-by="orderBy"
        :total="total"
        @sort="$emit('sort', $event)"
        @click:create-first-ga="$emit('click:add', $event)"
        @click:show-more="$emit('click:show-more', $event)"
        @click:delete="$emit('click:delete', $event)"
      />
    </template>
  </index-page-layout>
</template>

<script>
import IndexPageLayout from '../../molecules/layouts/IndexPageLayout';
import AddButton from '../../atoms/buttons/AddButton';
import OauthsTable from '../../organisms/OauthsTable';
import SearchField from '../../molecules/fields/SearchField';

export default {
  name: 'OauthsTemplate',
  components: {
    SearchField,
    OauthsTable,
    AddButton,
    IndexPageLayout,
  },
  props: {
    query: {
      type: String,
      default: null,
    },
    oauths: {
      type: Array,
      default() {
        return [];
      },
    },
    total: {
      type: Number,
      default: 0,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    loadable: {
      type: Boolean,
      default: false,
    },
    orderBy: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style></style>
