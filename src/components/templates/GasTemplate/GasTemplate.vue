<template>
  <div>
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
        <ga-table
          :data="gas"
          :loading="loading"
          :loadable="loadable"
          :order-by="orderBy"
          :total="total"
          @sort="$emit('sort', $event)"
          @click:create-first-ga="$emit('click:add', $event)"
          @click:show-more="$emit('click:show-more', $event)"
          @click:edit="$emit('click:edit', $event)"
          @click:delete="$emit('click:delete', $event)"
        />
      </template>
    </index-page-layout>
    <router-view />
  </div>
</template>

<script>
import IndexPageLayout from '../../molecules/layouts/IndexPageLayout';
import AddButton from '../../atoms/buttons/AddButton';
import SearchField from '../../molecules/fields/SearchField';
import GaTable from '../../organisms/GaTable/GaTable';

export default {
  name: 'GasTemplate',
  components: {
    GaTable,
    SearchField,
    AddButton,
    IndexPageLayout,
  },
  props: {
    query: {
      type: String,
      default: null,
    },
    gas: {
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
