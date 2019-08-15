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
        {{ props.row.domain || '-' }}
      </b-table-column>
      <b-table-column field="isActive" label="Active">
        <base-switch :value="props.row.isActive" @input="event => { onSwitch(event, props.row) }" />
      </b-table-column>
      <b-table-column label="Actions">
        <pen-icon
          class="has-margin-right-4 has-cursor-pointer"
          @click.stop="$emit('click:edit', props.row)"
        />
        <external-link-icon
          class="has-margin-right-4 has-cursor-pointer"
          @click.stop="$emit('click:go', props.row)"
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
import BaseSwitch from '../../atoms/BaseSwitch/BaseSwitch';
import TutorialEntity from '../../atoms/Entities/TutorialEntity';
import ExternalLinkIcon from '../../atoms/icons/ExternalLinkIcon/ExternalLinkIcon';

export default {
  name: 'TutorialTable',
  components: {
    ExternalLinkIcon,
    BaseSwitch,
    TrashIcon,
    PenIcon,
    BaseTable,
  },
  methods: {
    onSwitch(value, row) {
      this.$emit('switch', new TutorialEntity({
        ...row,
        isActive: value,
      }));
    },
  }
};
</script>

<style scoped></style>
