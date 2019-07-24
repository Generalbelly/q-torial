<template>
  <b-table
    v-bind="$attrs"
    backend-sorting
    :default-sort="orderBy"
    :data="data"
    :columns="columns"
    :hoverable="hoverable"
    :mobile-cards="mobileCards"
    @sort="onSort"
    @select="$emit('select', $event)"
  >
    <template v-slot:empty>
      <section class="section">
        <div class="content has-text-grey has-text-centered">
          <p>No {{ itemType }} found</p>
          <create-first-button @click="$emit('click:create-first-item')">
            Create your first {{ itemType }}
          </create-first-button>
        </div>
      </section>
    </template>
    <template v-slot:footer>
      <div class="has-text-centered" v-if="loadable">
        <show-more-button @click="$emit('click:show-more', $event)" />
      </div>
    </template>
    <template
      v-for="slot in Object.keys($scopedSlots)"
      :slot="slot"
      slot-scope="scope"
    >
      <slot :name="slot" v-bind="scope"> </slot>
    </template>
  </b-table>
</template>

<script>
import CreateFirstButton from '../../atoms/buttons/CreateFirstButton';
import ShowMoreButton from '../../atoms/buttons/ShowMoreButton';

export default {
  name: 'BaseTable',
  components: {
    ShowMoreButton,
    CreateFirstButton,
  },
  props: {
    itemType: {
      type: String,
      default: 'item',
    },
    orderBy: {
      type: Array,
      default() {
        return [];
      },
    },
    data: {
      type: Array,
      default() {
        return [];
      },
    },
    columns: {
      type: Array,
      default() {
        return [];
      },
    },
    hoverable: {
      type: Boolean,
      default: true,
    },
    mobileCards: {
      type: Boolean,
      default: true,
    },
    loadable: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    onSort(orderBy, direction) {
      this.$emit('sort', [orderBy, direction]);
    },
  },
};
</script>

<style scoped>
>>> .pagination.is-simple > small.info {
  display: none;
}
</style>
