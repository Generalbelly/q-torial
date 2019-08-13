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
    googleAnalyticsWebPropertyOptions() {
      if (this.googleAnalyticsAccount) {
        return this.googleAnalyticsAccount.webProperties.map(w => ({
          text: `${w.name} (${w.websiteUrl})`,
          value: w.id,
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
  }
};
</script>

<style scoped>
</style>
