<template>
  <b-dropdown aria-role="list" v-on="$listeners" v-bind="$attrs">
    <template v-slot:trigger>
      <slot />
    </template>
    <template v-for="item in items">
      <b-dropdown-item
        aria-role="listitem"
        @click="$emit('click:item', item.value)"
      >
        <template>
          <slot :name="item.value">
            {{ item.text }}
          </slot>
        </template>
      </b-dropdown-item>
    </template>
  </b-dropdown>
</template>
<script>
export default {
  name: 'BaseDropdown',
  props: {
    items: {
      type: Array,
      default() {
        return [];
      },
    },
    itemText: {
      type: String,
      default: 'text',
    },
    itemValue: {
      type: String,
      default: 'value',
    },
  },
};
</script>
