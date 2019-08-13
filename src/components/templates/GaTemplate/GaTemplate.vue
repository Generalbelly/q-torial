<template>
    <base-modal
      active
    >
      <template v-slot:content>
        <base-loading is-full-page :active="loading" />
  <!--      <base-heading>-->
  <!--        {{ innerGa.name }}-->
  <!--      </base-heading>-->
        <validation-observer ref="observer">
          <ga-form
            :id="innerGa.id"
            :name.sync="innerGa.name"
            :account-id.sync="innerGa.accountId"
            :account-name.sync="innerGa.accountName"
            :property-id.sync="innerGa.propertyId"
            :property-name.sync="innerGa.propertyName"
            :google-analytics-accounts="googleAnalyticsAccounts"
          />
        </validation-observer>
      </template>
      <template v-slot:secondary-action-button>
        <back-button
          @click="onClickCancel"
        ></back-button>
      </template>
      <template v-slot:primary-action-button>
        <save-button
          @click="onClickConfirm"
        ></save-button>
      </template>
    </base-modal>
</template>

<script>
import { ValidationObserver } from 'vee-validate';
import GaEntity from '../../atoms/Entities/GaEntity';
import SaveButton from '../../atoms/buttons/SaveButton';
import BackButton from '../../atoms/buttons/BackButton';
import GroupedButtonsLayout from '../../molecules/layouts/GroupedButtonsLayout';
import GaForm from '../../organisms/forms/GaForm/GaForm';
import BaseLoading from '../../atoms/BaseLoading/BaseLoading';
import BaseModal from '../../molecules/BaseModal/BaseModal';
// import BaseHeading from '../../atoms/BaseHeading/BaseHeading';

export default {
  name: 'GaTemplate',
  components: {
    BaseModal,
    // BaseHeading,
    BaseLoading,
    GaForm,
    GroupedButtonsLayout,
    BackButton,
    SaveButton,
    ValidationObserver,
  },
  props: {
    ga: {
      type: Object,
      default: null,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    googleAnalyticsAccounts: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      innerGa: new GaEntity(),
    };
  },
  watch: {
    ga: {
      immediate: true,
      handler(value) {
        if (value) {
          this.innerGa = new GaEntity(value);
        } else {
          this.innerGa = new GaEntity();
        }
      },
    },
  },
  methods: {
    async onClickConfirm() {
      const isValid = await this.$refs.observer.validate();
      if (isValid) {
        this.$emit('update:ga', this.innerGa);
      }
    },
    onClickCancel() {
      this.$emit('click:cancel', this.innerGa);
    },
  },
};
</script>

<style scoped>
</style>
