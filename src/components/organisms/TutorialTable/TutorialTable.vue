<template>
  <base-table
    v-bind="$attrs"
    item-type="tutorial"
    @sort="$emit('sort', $event)"
    @select="$emit('select', $event)"
    @click:create-first-item="$emit('click:create-first-tutorial')"
    @click:show-more="$emit('click:show-more')"
  >
    <template slot-scope="props">
      <b-table-column field="name" label="Name">
        {{ props.row.name }}
      </b-table-column>
      <b-table-column field="domain" label="Domain">
        {{ props.row.domain }}
      </b-table-column>
      <b-table-column field="isActive" label="Active">
        {{ props.row.isActive ? 'YES' : 'NO' }}
      </b-table-column>
      <b-table-column field="createdAtAsDateString" label="Created At">
        {{ props.row.createdAtAsDateString }}
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
  name: 'TutorialTable',
  components: {
    TrashIcon,
    PenIcon,
    BaseTable,
  },
};
</script>

<style scoped></style>
