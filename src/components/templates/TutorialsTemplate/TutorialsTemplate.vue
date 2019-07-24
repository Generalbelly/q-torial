<template>
  <div>
    <index-page-layout
      key="table"
      title="Tutorials"
    >
      <template v-slot:search>
        <search-field
          :value="query"
          @input="$emit('change:query', $event)"
          search-button-class="is-primary-050"
          @click:search="$emit('click:search')"
        />
      </template>
      <template v-slot:add>
        <add-button @click="onClickAdd" class="is-primary" />
      </template>
      <template v-slot:table>
        <tutorial-table
          :data="tutorials"
          :loading="loading"
          :loadable="loadable"
          :order-by="orderBy"
          :total="total"
          @sort="$emit('sort', $event)"
          @select="$emit('select', $event)"
          @click:create-first-tutorial="onClickAdd"
          @click:show-more="$emit('click:show-more', $event)"
          @click:edit="$emit('click:edit', $event)"
          @click:delete="$emit('click:delete', $event)"
        />
      </template>
    </index-page-layout>
    <base-modal
      :active="shouldShowCreateTutorialForm"
      @click:cancel="shouldShowCreateTutorialForm=false"
    >
      <template v-slot:content>
        <validation-observer ref="tutorialForm">
          <create-tutorial-form
            :name.sync="innerTutorial.name"
            :build-url.sync="innerTutorial.buildUrl"
          />
        </validation-observer>
      </template>
      <template v-slot:primary-action-button>
        <create-button @click="onClickCreate" />
      </template>
    </base-modal>
  </div>
</template>

<script>
import { ValidationObserver } from 'vee-validate';
import TutorialTable from '../../organisms/TutorialTable';
import IndexPageLayout from '../../molecules/layouts/IndexPageLayout';
import SearchField from '../../molecules/fields/SearchField';
import AddButton from '../../atoms/buttons/AddButton';
import BaseModal from '../../molecules/BaseModal';
import TutorialEntity from '../../atoms/Entities/TutorialEntity';
import CreateTutorialForm from '../../organisms/forms/CreateTutorialForm/CreateTutorialForm';
import CreateButton from '../../atoms/buttons/CreateButton/CreateButton';

export default {
  name: 'TutorialsTemplate',
  components: {
    CreateButton,
    CreateTutorialForm,
    ValidationObserver,
    BaseModal,
    AddButton,
    SearchField,
    IndexPageLayout,
    TutorialTable,
  },
  props: {
    query: {
      type: String,
      default: null,
    },
    tutorials: {
      type: Array,
      default() {
        return [];
      },
    },
    total: {
      type: Number,
      default: 0,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    loadable: {
      type: Boolean,
      default: false,
    },
    orderBy: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      shouldShowCreateTutorialForm: false,
      innerTutorial: new TutorialEntity(),
    };
  },
  methods: {
    async onClickCreate() {
      const valid = await this.$refs.tutorialForm.validate();
      if (valid) {
        this.$emit('add:tutorial', this.innerTutorial);
      }
    },
    onClickAdd() {
      this.shouldShowCreateTutorialForm = true;
    },
  },
};
</script>

<style></style>
