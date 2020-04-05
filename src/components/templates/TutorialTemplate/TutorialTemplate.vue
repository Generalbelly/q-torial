<template>
  <div v-if="tutorial">
    <base-loading is-full-page :active="loading" />
    <base-heading>
      {{ tutorial.name }}
    </base-heading>
    <validation-observer ref="observer">
      <tutorial-form
        :id="innerTutorial.id"
        :name.sync="innerTutorial.name"
        :description.sync="innerTutorial.description"
        :path-value.sync="innerTutorial.pathValue"
        :path-operator.sync="innerTutorial.pathOperator"
        :parameters.sync="innerTutorial.parameters"
        :domain.sync="innerTutorial.domain"
        :ga-id.sync="innerTutorial.gaId"
        :gas="gas"
        :build-url="innerTutorial.buildUrl"
        :settings.sync="innerTutorial.settings"
        @update:ga-property-id="updateGaPropertyId"
      />
    </validation-observer>
    <grouped-buttons-layout is-right class="has-margin-top-5">
      <back-button
        @click="onCancel"
      />
      <save-button
        @click="onSave"
      />
    </grouped-buttons-layout>
  </div>
</template>

<script>
import { ValidationObserver } from 'vee-validate';
import TutorialEntity from '../../atoms/Entities/TutorialEntity';
import SaveButton from '../../atoms/buttons/SaveButton';
import BackButton from '../../atoms/buttons/BackButton';
import GroupedButtonsLayout from '../../molecules/layouts/GroupedButtonsLayout';
import TutorialForm from '../../organisms/forms/TutorialForm/TutorialForm';
import BaseLoading from '../../atoms/BaseLoading/BaseLoading';
import BaseHeading from '../../atoms/BaseHeading/BaseHeading';
// import BaseHeading from '../../atoms/BaseHeading/BaseHeading';

export default {
  name: 'TutorialTemplate',
  components: {
    BaseHeading,
    // BaseHeading,
    BaseLoading,
    TutorialForm,
    GroupedButtonsLayout,
    BackButton,
    SaveButton,
    ValidationObserver,
  },
  props: {
    tutorial: {
      type: Object,
      default: null,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    gas: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      innerTutorial: new TutorialEntity(),
    };
  },
  watch: {
    tutorial: {
      immediate: true,
      handler(value) {
        if (value) {
          this.innerTutorial = new TutorialEntity(value);
        } else {
          this.innerTutorial = new TutorialEntity();
        }
      },
    },
  },
  methods: {
    async onSave() {
      const isValid = await this.$refs.observer.validate();
      if (isValid) {
        this.$emit('update:tutorial', this.innerTutorial);
      }
    },
    onCancel() {
      this.$emit('click:cancel', this.innerTutorial);
    },
    updateGaPropertyId(gaPropertyId) {
      this.innerTutorial.gaPropertyId = gaPropertyId;
    },
  },
};
</script>

<style scoped>
    .form-actions {
        margin-top: 3em;
        display: flex;
        flex-direction: row;
    }
</style>
