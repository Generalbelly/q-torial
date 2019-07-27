<template>
  <div>
    <base-label v-if="label">{{ label }}</base-label>
    <base-field class="domain" v-bind="$attrs">
      <base-select class="domain__protocol" v-model="protocol" placeholder="Protocol">
        <option>https://</option>
        <option>http://</option>
      </base-select>
      <base-input class="domain__hostname" v-model="domain" placeholder="example.com" expanded />
    </base-field>
  </div>
</template>

<script>
import BaseSelect from '../../../atoms/BaseSelect';
import BaseInput from '../../../atoms/BaseInput';
import BaseField from '../../../atoms/BaseField';
import BaseLabel from '../../../atoms/BaseLabel';

export default {
  name: 'DomainField',
  components: {
    BaseLabel,
    BaseField,
    BaseInput,
    BaseSelect,
  },
  props: {
    label: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      protocol: 'https://',
      domain: null,
    };
  },
  watch: {
    value: {
      immediate: true,
      handler(value) {
        if (value && value.includes('://')) {
          const [protocol, domain] = value.split('://');
          this.protocol = `${protocol}://`;
          this.domain = domain;
        }
      },
    },
  },
  computed: {
    domainUrl: {
      get() {
        const url = this.protocol + this.domain;
        return url || null;
      },
      set(newValue) {
        this.$emit('input', newValue);
      },
    },
  },
};
</script>

<style scoped>
  .domain {
    display: grid;
    grid-template-areas:
      "protocol hostname"
      "help help";
    grid-template-columns: auto 1fr;
  }
  .domain__hostname {
    grid-area: hostname;
  }
  .domain__protocol {
    grid-area: protocol;
  }
  >>> p.help {
    grid-area: help;
  }
</style>
