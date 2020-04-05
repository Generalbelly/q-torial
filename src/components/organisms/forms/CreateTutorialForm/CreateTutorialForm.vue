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
      Build url (This is the url you build this tutorial on and you cannot change later)
    </div>
    <validatable-text-field
      v-model="innerBuildUrl"
      name="url"
      placeholder="https://example.com/path1"
      :rules="{url: {require_protocol: true }, required: true}"
    />
    <validatable-text-field
      v-show="false"
      v-model="innerPathValue"
      name="path value"
      rules="required"
    />
    <p class="help has-text-primary">We recommend that you use a url in your web app's staging/development environment</p>
    <base-message
      active
      type="is-warning"
      class="has-margin-top-5"
      has-icon
    >
      Have you installed our chrome extension?<br />
      If not, here's the <a :href="installUrl" target="_blank">link</a> to it.<br />
      It is required to build tutorials.
    </base-message>
  </div>
</template>
<script>
import ValidatableTextField from '../../../molecules/fields/ValidatableTextField';
import BaseMessage from '../../../atoms/BaseMessage';

export default {
  name: 'CreateTutorialForm',
  components: {
    BaseMessage,
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
    pathValue: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      installUrl: process.env.VUE_APP_CHROME_EXTRNSION_INSTALL_URL,
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
    innerBuildUrl: {
      get() {
        return this.buildUrl;
      },
      set(newValue) {
        const url = new URL(newValue);
        this.innerPathValue = url.pathname;
        this.$emit('update:build-url', newValue);
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
  },
};
</script>
<style scoped></style>
