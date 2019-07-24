<template>
  <base-columns>
    <base-column v-if="shouldHaveMultipleColumns" class="is-two-fifths">
      <base-sub-heading
        v-if="$slots.title"
        class="has-text-weight-bold has-margin-bottom-4"
      >
        <slot name="title" />
      </base-sub-heading>
      <p v-if="$slots.description">
        <slot name="description" />
      </p>
    </base-column>
    <base-column>
      <slot name="form" />
    </base-column>
  </base-columns>
</template>

<script>
import BaseSubHeading from '../../../atoms/BaseSubHeading/BaseSubHeading';
import BaseColumn from '../../../atoms/BaseColumn/BaseColumn';
import BaseColumns from '../../../atoms/BaseColumns/BaseColumns';

export default {
  name: 'FormSectionLayout',
  components: {
    BaseColumns,
    BaseColumn,
    BaseSubHeading,
  },
  computed: {
    shouldHaveMultipleColumns() {
      return this.$slots.title || this.$slots.description;
    },
  },
};
</script>

<style scoped>
.columns {
  margin-bottom: 2em;
}
.column > .field {
  margin-bottom: 3em;
}
</style>
