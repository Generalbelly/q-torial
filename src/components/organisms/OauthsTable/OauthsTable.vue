<template>
  <base-table
    v-bind="$attrs"
    @sort="$emit('sort', $event)"
    @select="$emit('select', $event)"
    @click:show-more="$emit('click:show-more')"
  >
    <template slot-scope="props">
      <b-table-column field="accountName" label="Account Name">
        {{ props.row.service === 'google_analytics' ? 'Google Analytics' : '' }}
      </b-table-column>
      <b-table-column field="accountId" label="Account ID">
        {{ props.row.email }}
      </b-table-column>
      <b-table-column label="Actions">
        <trash-icon
          class="has-cursor-pointer"
          @click.stop="$emit('click:delete', props.row)"
        />
      </b-table-column>
    </template>
    <template v-slot:empty>
      <section class="section">
        <div class="content has-text-grey has-text-centered">
          <p>No Google Analytics connected</p>
          <create-first-button @click="$emit('click:create-first-ga')">
            Connect your first Google Analytics
          </create-first-button>
        </div>
      </section>
    </template>
  </base-table>
</template>
<script>
import BaseTable from '../../molecules/BaseTable';
import PenIcon from '../../atoms/icons/PenIcon';
import TrashIcon from '../../atoms/icons/TrashIcon';
import CreateFirstButton from '../../atoms/buttons/CreateFirstButton';

export default {
  name: 'OauthsTable',
  components: {
    CreateFirstButton,
    TrashIcon,
    BaseTable,
  },
};
</script>

<style scoped></style>
