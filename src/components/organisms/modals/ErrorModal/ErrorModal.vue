<template>
  <base-modal :active="active" hide-cancel>
    <template v-slot:content>
      <slot>
        {{ message }}
      </slot>
      <div v-if="showSupportEmail">
        Please contact us at {{ contactEmail }}
      </div>
    </template>
    <template v-slot:primary-action-button>
      <base-button @click="$emit('click:close')">
        Close
      </base-button>
    </template>
  </base-modal>
</template>

<script>
import BaseModal from '../../../molecules/BaseModal';
import BaseButton from '../../../atoms/BaseButton/BaseButton';

export default {
  name: 'ErrorModal',
  components: { BaseButton, BaseModal },
  props: {
    active: {
      type: Boolean,
      default: false,
    },
    showSupportEmail: {
      type: Boolean,
      default: false,
    },
    message: {
      type: String,
      default: 'Error occurred.',
    },
  },
  data() {
    return {
      contactEmail: `${process.env.VUE_APP_CONTACT_EMAIL}`,
    };
  },
};
</script>

<style scoped>

</style>
