<template>
  <div>
    <validatable-text-field
      label="Tutorial Name"
      v-model="innerName"
      placeholder="First timers"
      name="tutorial name"
      rules="required"
    />
    <div class="label">
      Start building this tutorial on
    </div>
    <validatable-text-field
      v-model="innerBuildUrl"
      name="url"
      placeholder="https://example.com/path1"
      :rules="{url: {require_protocol: true }}"
    />
  </div>
</template>
<script>
import ValidatableTextField from '../../../molecules/fields/ValidatableTextField';

export default {
  name: 'CreateTutorialForm',
  components: {
    ValidatableTextField,
  },
  props: {
    name: {
      type: String,
      default: null,
    },
    buildUrl: {
      type: String,
      default: null,
    },
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
    innerBuildUrl: {
      get() {
        return this.buildUrl;
      },
      set(newValue) {
        this.$emit('update:build-url', newValue);
      },
    },
  },
};
</script>
<style scoped></style>
