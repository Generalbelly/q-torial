<template>
  <div>
    <p>
      The {{ type === 'tutorial' ? 'tutorial' : 'step' }} you selected starts
      when
      <span class="has-text-weight-bold"
      >{{ pathOperatorText }} {{ pathValue }}</span
      >, meaning it could start at more than one url path.
      <br />
      On which url path do you want to edit the
      {{ type === 'tutorial' ? 'tutorial' : 'step' }}?
    </p>
    <validatable-text-field
      label="Url path"
      name="url path"
      v-model="innerUrlPath"
      :rules="`required|url-path:${pathOperator},${pathValue}`"
    />
  </div>
</template>

<script>
import ValidatableTextField from '../../../molecules/fields/ValidatableTextField';
import pathOperators from '../../../atoms/Entities/PathOperators';

export default {
  name: 'UrlPathForm',
  components: {
    ValidatableTextField,
  },
  props: {
    urlPath: {
      type: String,
      default: null,
    },
    pathValue: {
      type: String,
      required: true,
    },
    pathOperator: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: 'tutorial',
    },
  },
  computed: {
    innerUrlPath: {
      get() {
        return this.urlPath;
      },
      set(newValue) {
        this.$emit('update:url-path', newValue);
      },
    },
    pathOperatorText() {
      return pathOperators.find(p => p.value === this.pathOperator).text;
    },
  },
};
</script>

<style scoped></style>
