<template>
    <div>
      <base-loading is-full-page :active="loading" />
      <base-heading>
        {{ innerGA.name }}
      </base-heading>
<!--      <validation-observer ref="observer">-->
<!--        <g-a-form-->
<!--          :id="innerGA.id"-->
<!--          :account-id.sync="innerGA.accountId"-->
<!--          :account-name.sync="innerGA.accountName"-->
<!--          :property-id.sync="innerGA.propertyId"-->
<!--          :property-name.sync="innerGA.propertyName"-->
<!--          :google-analytics-account-options="googleAnalyticsAccountOptions"-->
<!--          :google-analytics-web-property-options="googleAnalyticsWebPropertyOptions"-->
<!--          @click:ga-connect="$emit('click:ga-connect', $event)"-->
<!--          @click:ga-property-edit="$emit('click:ga-property-edit', $event)"-->
<!--          @click:ga-delete="$emit('click:ga-delete', $event)"-->
<!--        />-->
<!--      </validation-observer>-->
      <grouped-buttons-layout is-right class="has-margin-top-5">
          <back-button
              @click="onCancel"
          ></back-button>
          <save-button
              @click="onSave"
          ></save-button>
      </grouped-buttons-layout>
    </div>
</template>

<script>
import { ValidationObserver } from 'vee-validate';
import SaveButton from '../../atoms/buttons/SaveButton';
import BackButton from '../../atoms/buttons/BackButton';
import GroupedButtonsLayout from '../../molecules/layouts/GroupedButtonsLayout';
import BaseLoading from '../../atoms/BaseLoading/BaseLoading';
import BaseHeading from '../../atoms/BaseHeading/BaseHeading';
import GAForm from '../../organisms/forms/GAForm';
import GAEntity from '../../atoms/Entities/GAEntity';

export default {
  name: 'OauthTemplate',
  components: {
    BaseHeading,
    BaseLoading,
    GAForm,
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
    googleAnalyticsAccountOptions: {
      type: Array,
      default() {
        return [];
      },
    },
    googleAnalyticsWebPropertyOptions: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      innerGA: new GAEntity(),
    };
  },
  watch: {
    ga: {
      immediate: true,
      handler(value) {
        if (value) {
          this.innerGA = value;
        } else {
          this.innerGA = new GAEntity();
        }
      },
    },
  },
  methods: {
    async onSave() {
      const isValid = await this.$refs.observer.validate();
      if (isValid) {
        this.$emit('update:ga', this.innerGA);
      }
    },
    onCancel() {
      this.$emit('click:cancel', this.innerGA);
    },
  },
};
</script>

<style scoped></style>
