<template>
  <div class="form">
    <div>
      <validatable-text-field
        label="Tutorial Name"
        v-model="innerName"
        placeholder="First timers"
        name="tutorial name"
        rules="required"
      />
    </div>
    <div>
      <textarea-field
        label="Tutorial Description"
        v-model="innerDescription"
        placeholder="Tutorial for first time customers."
        name="tutorial description"
      />
    </div>
    <div class="form__condition-field">
      <span class="label">
        Start this tutorial for a user when the following conditions are met.
      </span>
      <div class="url-path">
        <div class="url-path__operator">
          <select-field
            :items="pathOperators"
            v-model="innerPathOperator"
            expanded
          />
        </div>
        <div class="url-path__value">
          <validatable-text-field
            v-model="innerPathValue"
            name="url path"
            :rules="innerPathOperator === 'ALL' ? '' : 'required'"
          />
        </div>
      </div>
      <div>
        <checkbox-field v-model="parametersRequired">
          with parameters
        </checkbox-field>
        <parameter-fields
          v-show="parametersRequired"
          v-model="innerParameters"
        />
      </div>
      <div>
        <checkbox-field v-model="domainRequired">
          Only apply for the following domain
        </checkbox-field>
        <base-fade-transition>
          <div v-show="domainRequired">
            <validatable-domain-field
              name="domain"
              label="Domain"
              v-model="innerDomain"
            />
          </div>
        </base-fade-transition>
      </div>
      <div>
        <checkbox-field v-model="settingsOnce">
          When the user has never seen this tutorial
        </checkbox-field>
      </div>
    </div>
    <div>
      <div class="is-flex">
        <base-label>
          Send data to the following Google Analytics (account / web property)
        </base-label>
        <question-circle-icon
          @click="showGaInfo = !showGaInfo"
          size="is-small"
          style="height: 100%; margin-left: 10px;"
        />
      </div>
      <base-message :active="showGaInfo" type="is-info">
        We send data of how many steps users complete on your behalf to your connected Google Analytics account.
      </base-message>
      <select-field
        v-model="innerGaId"
        :items="gasOptions"
        placeholder="Select Google Analytics Web Property to connect."
      />
    </div>
    <div>
      <text-field
        label="Build this tutorial on (You cannot change this url)"
        disabled
        :value="buildUrl"
      />
    </div>
  </div>
</template>
<script>
import CheckboxField from '../../../molecules/fields/CheckboxField';
import TextareaField from '../../../molecules/fields/TextareaField';
import ValidatableTextField from '../../../molecules/fields/ValidatableTextField';
import PathOperators from '../../../atoms/Entities/PathOperators';
import SelectField from '../../../molecules/fields/SelectField';
import ParameterFields from '../../../molecules/fields/ParameterFields';
import ValidatableDomainField from '../../../molecules/fields/ValidatableDomainField';
import BaseLabel from '../../../atoms/BaseLabel/BaseLabel';
import BaseFadeTransition from '../../../atoms/transitions/BaseFadeTransition';
import TextField from '../../../molecules/fields/TextField/TextField';
import BaseMessage from '../../../atoms/BaseMessage/BaseMessage';
import QuestionCircleIcon from '../../../atoms/icons/QuestionCircleIcon/QuestionCircleIcon';

export default {
  name: 'TutorialForm',
  components: {
    QuestionCircleIcon,
    BaseMessage,
    TextField,
    BaseFadeTransition,
    BaseLabel,
    ValidatableDomainField,
    ParameterFields,
    SelectField,
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
    gaId: {
      type: String,
      default: null,
    },
    gas: {
      type: Array,
      default() {
        return [];
      },
    },
    buildUrl: {
      type: String,
      default: null,
    },
    settings: {
      type: Object,
      default() {
        return {
          once: true,
        }
      },
    }
  },
  data() {
    return {
      domainRequired: false,
      parametersRequired: false,
      pathOperators: PathOperators,
      showGaInfo: false,
    };
  },
  computed: {
    origin() {
      return window.parent.location.origin;
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
    innerGaId: {
      get() {
        return this.gaId;
      },
      set(newValue) {
        this.$emit('update:ga-id', newValue);
      },
    },
    gasOptions() {
      return this.gas.length > 0 ? this.gas.map(ga => ({
        text: `${ga.accountName} / ${ga.propertyName}`,
        value: ga.id,
      })) : [];
    },
    settingsOnce: {
      get() {
        return this.settings.once
      },
      set(newValue) {
        this.$emit('update:settings', {
          ...this.settings,
          once: newValue,
        })
      },
    },
  },
  watch: {
    domainRequired: {
      handler(value) {
        if (!value) {
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
<style scoped>
  .form > div + div {
    margin-top: 40px;
  }
  .form__condition-field > div + div {
    margin-top: 15px;
  }
  .url-path {
    display: grid;
    grid-template-areas:
      "operator value"
      "help help";
    grid-template-columns: auto 1fr;
  }
  .url-path__value {
    grid-area: value;
  }
  .url-path__operator {
    grid-area: operator;
  }
  .url-path__value >>> p.help {
    grid-area: help;
  }
  @media screen and (max-width: 768px){
    .url-path {
      grid-template-areas:
        "operator"
        "value"
        "help";
      grid-template-columns: 100%;
    }
  }
</style>
