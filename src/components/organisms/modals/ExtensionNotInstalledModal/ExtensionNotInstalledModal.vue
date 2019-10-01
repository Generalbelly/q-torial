<template>
  <base-modal
    v-bind="$attrs"
    hide-cancel
    @click:close="$emit('click:close')"
  >
    <template v-slot:content>
      It seems like you haven't installed our extension yet.<br />
      Install from <a :href="installUrl" target="_blank">here</a>
    </template>
    <template v-slot:primary-action-button>
      <base-button @click="$emit('click:close')">
        Close
      </base-button>
    </template>
  </base-modal>
</template>

<script>
import BaseModal from '../../../molecules/BaseModal/BaseModal';
import BaseButton from '../../../atoms/BaseButton/BaseButton';
export default {
  name: 'ExtensionNotInstalledModal',
  components: {
    BaseButton,
    BaseModal,
  },
  data() {
    return {
      installUrl: process.env.VUE_APP_CHROME_EXTRNSION_INSTALL_URL,
    }
  },
};
</script>

<style scoped>

</style>
