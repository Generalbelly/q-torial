<template>
  <base-field v-bind="$attrs">
    <base-select
      v-model="protocol"
      placeholder="Protocol"
    >
      <option>https://</option>
      <option>http://</option>
    </base-select>
    <base-input
      v-model="domain"
      placeholder="docker.omotenashi.today"
      expanded
    >
    </base-input>
  </base-field>
</template>

<script>
import BaseSelect from '../../../atoms/BaseSelect';
import BaseInput from '../../../atoms/BaseInput';
import BaseField from '../../../atoms/BaseField';
export default {
  name: 'DomainField',
  components: {
    BaseField,
    BaseInput,
    BaseSelect
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
      }
    },
  },
};
</script>

<style scoped>

</style>
