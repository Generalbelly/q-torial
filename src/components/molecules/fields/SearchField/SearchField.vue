<template>
  <base-field v-bind="$attrs">
    <template v-slot:default="slotProps">
      <base-input
        type="search"
        icon-pack="fas"
        icon="search"
        v-bind="slotProps"
        v-on="$listeners"
      />
      <p class="control">
        <search-button
          :class="searchButtonClass"
          @click="$emit('click:search')"
        />
      </p>
    </template>
  </base-field>
</template>

<script>
import SearchButton from '../../../atoms/buttons/SearchButton';
import BaseField from '../../../atoms/BaseField';
import BaseInput from '../../../atoms/BaseInput';

export default {
  name: 'SearchField',
  components: {
    BaseInput,
    BaseField,
    SearchButton,
  },
  props: {
    searchButtonClass: {
      type: [String, Object, Array],
      default: null,
    },
  },
};
</script>
