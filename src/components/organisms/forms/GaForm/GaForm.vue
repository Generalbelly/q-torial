<template>
  <div class="form">
    <div>
      <validatable-select-field
        :items="googleAnalyticsAccountOptions"
        v-model="innerAccountId"
        label="Account"
        placeholder="Select account"
        name="Account"
        rules="required"
      />
    </div>
    <div>
      <validatable-select-field
        :disabled="googleAnalyticsAccount === null"
        :items="googleAnalyticsWebPropertyOptions"
        label="Property Name (Website Url)"
        placeholder="Select property"
        v-model="innerPropertyId"
        name="Property"
        rules="required"
      />
    </div>
    <div>
      <validatable-select-field
        :disabled="googleAnalyticWebProperty === null"
        :items="googleAnalyticsProfileOptions"
        label="View"
        placeholder="Select view"
        v-model="innerViewId"
        name="View"
        rules="required"
      />
    </div>
  </div>
</template>

<script>
import ValidatableSelectField from '../../../molecules/fields/ValidatableSelectField';
import ValidatableTextField from '../../../molecules/fields/ValidatableTextField';
import SelectField from '../../../molecules/fields/SelectField';

export default {
  name: 'GaForm',
  components: {
    SelectField,
    ValidatableTextField,
    ValidatableSelectField,
  },
  props: {
    id: {
      type: String,
      default: null,
    },
    name: {
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
    viewId: {
      type: String,
      default: null,
    },
    viewName: {
      type: String,
      default: null,
    },
    googleAnalyticsAccounts: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  computed: {
    innerName: {
      get() {
        return this.name;
      },
      set(newValue) {
        this.$emit('update:name', newValue);
      },
    },
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
    innerViewId: {
      get() {
        return this.viewId;
      },
      set(newValue) {
        this.$emit('update:view-id', newValue);
      },
    },
    googleAnalyticsAccount() {
      if (this.innerAccountId) {
        return this.googleAnalyticsAccounts.find(a => a.id === this.innerAccountId);
      }
      return null;
    },
    googleAnalyticsAccountOptions() {
      return this.googleAnalyticsAccounts.map(g => ({
        text: g.name,
        value: g.id,
      }));
    },
    googleAnalyticWebProperty() {
      if (this.googleAnalyticsAccount && this.innerPropertyId) {
        return this.googleAnalyticsAccount.webProperties.find(
          account => account.id === this.innerPropertyId,
        );
      }
      return null;
    },
    googleAnalyticsWebPropertyOptions() {
      if (this.googleAnalyticsAccount) {
        return this.googleAnalyticsAccount.webProperties.map(webProperty => ({
          text: `${webProperty.name} (${webProperty.websiteUrl})`,
          value: webProperty.id,
        }));
      }
      return [];
    },
    googleAnalyticsProfileOptions() {
      if (this.googleAnalyticsAccount && this.googleAnalyticWebProperty) {
        return this.googleAnalyticWebProperty.profiles.map(profile => ({
          text: profile.name,
          value: profile.id,
        }));
      }
      return [];
    },
  },
  watch: {
    innerAccountId(value) {
      const account = this.googleAnalyticsAccountOptions.find(a => a.value === value);
      this.$emit('update:account-name', account ? account.text : null);
    },
    innerPropertyId(value) {
      const property = this.googleAnalyticsWebPropertyOptions.find(a => a.value === value);
      this.$emit('update:property-name', property ? property.text : null);
    },
    innerViewId(value) {
      const property = this.googleAnalyticsProfileOptions.find(a => a.value === value);
      this.$emit('update:view-name', property ? property.text : null);
    },
  },
};
</script>

<style scoped>
</style>
