<template>
  <b-modal v-bind="$attrs" @close="$emit('click:close')">
    <div class="has-background-white-ter has-padding-5">
      <div class="content">
        <slot name="content"></slot>
      </div>
      <grouped-buttons-layout v-if="!hideFooter" is-right>
        <slot v-if="!hideCancel" name="secondary-action-button">
          <cancel-button
            v-if="modalType === 'dialog'"
            class="is-neutral-100"
            @click="$emit('click:cancel')"
          />
        </slot>
        <slot v-if="!hideConfirm" name="primary-action-button">
          <confirm-button class="is-primary" @click="$emit('click:confirm')" />
        </slot>
      </grouped-buttons-layout>
    </div>
  </b-modal>
</template>

<script>
import GroupedButtonsLayout from '../layouts/GroupedButtonsLayout';
import CancelButton from '../../atoms/buttons/CancelButton';
import ConfirmButton from '../../atoms/buttons/ConfirmButton';

export default {
  name: 'BaseModal',
  components: {
    ConfirmButton,
    CancelButton,
    GroupedButtonsLayout,
  },
  props: {
    hideFooter: {
      type: Boolean,
      default: false,
    },
    hideCancel: {
      type: Boolean,
      default: false,
    },
    hideConfirm: {
      type: Boolean,
      default: false,
    },
    modalType: {
      type: String,
      default: 'dialog',
    },
  },
};
</script>

<style></style>
