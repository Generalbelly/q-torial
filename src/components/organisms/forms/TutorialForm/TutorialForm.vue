<template>
  <div>
    <validatable-text-field
      label="Tutorial Name"
      v-model="innerName"
      placeholder="First timers"
      name="tutorial name"
      rules="required"
    />
    <textarea-field
      label="Tutorial Description"
      v-model="innerDescription"
      placeholder="Tutorial for first time customers."
      name="tutorial description"
    />
    <div class="label">
      Start this tutorial for a user visiting the following conditions.
    </div>
    <base-columns>
      <base-column>
        <select-field :items="pathOperators" v-model="innerPathOperator" />
      </base-column>
      <base-column>
        <validatable-text-field
          v-model="innerPathValue"
          name="url path"
          :rules="innerPathOperator === 'ALL' ? '' : 'required'"
        />
      </base-column>
    </base-columns>
    <base-columns>
      <base-column>
        <checkbox-field v-model="parametersRequired">
          with parameters
        </checkbox-field>
        <parameter-fields
          v-show="parametersRequired"
          v-model="innerParameters"
        />
      </base-column>
    </base-columns>
    <base-columns>
      <base-column>
        <checkbox-field v-model="domainRequired">
          Only apply for the following domain
        </checkbox-field>
        <validatable-domain-field
          name="domain"
          v-model="innerDomain"
        />
      </base-column>
    </base-columns>
  </div>
</template>
<script>
import CheckboxField from '../../../molecules/fields/CheckboxField';
import TextareaField from '../../../molecules/fields/TextareaField';
import ValidatableTextField from '../../../molecules/fields/ValidatableTextField';
import PathOperators from '../../../atoms/Entities/PathOperators';
import BaseColumns from '../../../atoms/BaseColumns';
import BaseColumn from '../../../atoms/BaseColumn';
import SelectField from '../../../molecules/fields/SelectField';
import ParameterFields from '../../../molecules/fields/ParameterFields';
import ValidatableDomainField from '../../../molecules/fields/ValidatableDomainField/ValidatableDomainField';

export default {
  name: 'TutorialForm',
  components: {
    ValidatableDomainField,
    ParameterFields,
    SelectField,
    BaseColumn,
    BaseColumns,
    CheckboxField,
    TextareaField,
    ValidatableTextField,
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
    description: {
      type: String,
      default: null,
    },
    pathOperator: {
      type: String,
      default: null,
    },
    pathValue: {
      type: String,
      default: null,
    },
    parameters: {
      type: Array,
      default() {
        return [];
      },
    },
    domain: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      domainRequired: false,
      parametersRequired: false,
      pathOperators: PathOperators,
    };
  },
  computed: {
    hostname() {
      return window.parent.location.hostname;
    },
    innerName: {
      get() {
        return this.name;
      },
      set(newValue) {
        this.$emit('update:name', newValue);
      },
    },
    innerDescription: {
      get() {
        return this.description;
      },
      set(newValue) {
        this.$emit('update:description', newValue);
      },
    },
    innerPathOperator: {
      get() {
        return this.pathOperator;
      },
      set(newValue) {
        this.$emit('update:path-operator', newValue);
      },
    },
    innerPathValue: {
      get() {
        return this.pathValue;
      },
      set(newValue) {
        this.$emit('update:path-value', newValue);
      },
    },
    innerParameters: {
      get() {
        return this.parameters;
      },
      set(newValue) {
        this.$emit('update:parameters', newValue);
      },
    },
    innerDomain: {
      get() {
        return this.domain;
      },
      set(newValue) {
        this.$emit('update:domain', newValue);
      },
    },
  },
  watch: {
    domainRequired: {
      handler(value) {
        if (value && !this.innerDomain && this.hostname !== process.env.VUE_APP_URL) {
          this.innerDomain = this.hostname;
        } else if (!value) {
          this.innerDomain = null;
        }
      },
    },
    parametersRequired: {
      handler(value) {
        if (value && this.parameters.length === 0) {
          this.innerParameters = [
            ...this.innerParameters,
            {
              key: '',
              value: '',
            },
          ];
        }
      },
    },
    innerParameters: {
      handler(newValue, oldValue) {
        if (
          oldValue.length === 1
            && newValue.length === 0
            && this.parametersRequired
        ) {
          this.parametersRequired = false;
        }
      },
    },
  },
};
</script>
<style scoped></style>
