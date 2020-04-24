<template>
  <base-table
    v-bind="$attrs"
    item-type="Google Analytics"
    @sort="$emit('sort', $event)"
    @select="$emit('select', $event)"
    @click:create-first-item="$emit('click:create-first-ga')"
    @click:show-more="$emit('click:show-more')"
  >
    <template slot-scope="props">
      <b-table-column label="Account Name">
        {{ props.row.accountName || 'not selected' }}
      </b-table-column>
      <b-table-column label="Account ID">
        {{ props.row.accountId || 'not selected' }}
      </b-table-column>
      <b-table-column label="Property Name (Website Url)">
        {{ props.row.propertyName || 'not selected' }}
      </b-table-column>
      <b-table-column label="Property ID">
        {{ props.row.propertyId || 'not selected' }}
      </b-table-column>
      <b-table-column label="View Name">
        {{ props.row.viewName || 'not selected' }}
      </b-table-column>
      <b-table-column label="View ID">
        {{ props.row.viewId || 'not selected' }}
      </b-table-column>
      <b-table-column label="Actions">
        <pen-icon
          class="has-margin-right-3 has-cursor-pointer"
          @click.stop="$emit('click:edit', props.row)"
        />
        <trash-icon
          class="has-cursor-pointer"
          @click.stop="$emit('click:delete', props.row)"
        />
      </b-table-column>
    </template>
  </base-table>
</template>
<script>
import BaseTable from '../../molecules/BaseTable';
import PenIcon from '../../atoms/icons/PenIcon';
import TrashIcon from '../../atoms/icons/TrashIcon';

export default {
  name: 'GaTable',
  components: {
    TrashIcon,
    PenIcon,
    BaseTable,
  },
};
</script>

<style scoped></style>
