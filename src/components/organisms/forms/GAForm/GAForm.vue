<template>
  <div>
    <div v-if="id">
      <div v-if="googleAnalyticsAccountOptions.length === 0">
        <base-columns>
          <base-column>
            <base-tag
              size="is-small"
              class="is-success-200 has-margin-right-4"
            >
              Connected
            </base-tag>
            <pen-icon
              class="has-margin-right-3 has-cursor-pointer"
              size="is-small"
              @click="$emit('click:ga-property-edit', id)"
            ></pen-icon>
            <trash-icon
              class="has-cursor-pointer"
              size="is-small"
              @click="$emit('click:ga-delete', id)"
            >
            </trash-icon>
          </base-column>
        </base-columns>
        <base-columns>
          <base-column class="is-half label">
            Property ID
          </base-column>
          <base-column>
            {{ propertyId }}
          </base-column>
        </base-columns>
        <base-columns>
          <base-column class="is-half label">
            Property Name
          </base-column>
          <base-column>
            {{ propertyName }}
          </base-column>
        </base-columns>
      </div>
      <base-message v-else type="is-success">
        <p class="has-margin-bottom-4">
          Next step is to select a Google Analytics account and a web property.
        </p>
        <div>
          <validatable-select-field
            :items="googleAnalyticsAccountOptions"
            v-model="innerAccountId"
            label="Account"
            placeholder="Select account"
            name="Account"
            rules="required"
            horizontal
          />
          <validatable-select-field
            v-if="googleAnalyticsAccount"
            :items="googleAnalyticsWebPropertyOptions"
            style="white-space: nowrap;"
            label="Property"
            placeholder="Select property"
            v-model="innerPropertyId"
            name="Property"
            rules="required"
            horizontal
          />
        </div>
      </base-message>
    </div>
    <div
      v-else
      class="connect-google-analytics-button"
    >
      <connect-google-analytics-button
        @click="$emit('click:ga-connect', $event)"
      ></connect-google-analytics-button>
    </div>
  </div>
</template>

<script>
import BaseColumns from '../../../atoms/BaseColumns/BaseColumns';
import BaseColumn from '../../../atoms/BaseColumn/BaseColumn';
import BaseTag from '../../../atoms/BaseTag/BaseTag';
import PenIcon from '../../../atoms/icons/PenIcon/PenIcon';
import TrashIcon from '../../../atoms/icons/TrashIcon/TrashIcon';
import BaseMessage from '../../../atoms/BaseMessage';
import ConnectGoogleAnalyticsButton
  from '../../../atoms/buttons/ConnectGoogleAnalyticsButton';
import ValidatableSelectField
  from '../../../molecules/fields/ValidatableSelectField';

export default {
  name: 'GAForm',
  components: {
    ValidatableSelectField,
    ConnectGoogleAnalyticsButton,
    BaseMessage,
    TrashIcon,
    PenIcon,
    BaseTag,
    BaseColumn,
    BaseColumns,
  },
  props: {
    id: {
      type: String,
      default: null,
    },
    accountId: {
      type: String,
      default: null,
    },
    accountName: {
      type: String,
      default: null,
    },
    propertyId: {
      type: String,
      default: null,
    },
    propertyName: {
      type: String,
      default: null,
    },
    websiteUrl: {
      type: String,
      default: null,
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
  computed: {
    innerAccountId: {
      get() {
        return this.accountId;
      },
      set(newValue) {
        this.$emit('update:account-id', newValue);
      },
    },
    innerPropertyId: {
      get() {
        return this.propertyId;
      },
      set(newValue) {
        this.$emit('update:property-id', newValue);
      },
    },
  },
};
</script>

<style scoped>
  /*.connect-google-analytics-button {*/
  /*  height: 100%;*/
  /*  display: flex;*/
  /*  flex-direction: column;*/
  /*  justify-content: center;*/
  /*  align-items: center;*/
  /*}*/
</style>
