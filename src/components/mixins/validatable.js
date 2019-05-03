import { mapState } from 'vuex';

export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    rules: {
      type: [String, Object],
      default: '',
    },
  },
  computed: {
    ...mapState([
      'serverSideErrors',
    ]),
    fieldErrors() {
      if (this.serverSideErrors[this.name]) {
        return this.serverSideErrors[this.name];
      }
      return [];
    },
  },
  watch: {
    fieldErrors: {
      immediate: true,
      handler(value) {
        if (!this.$refs.provider) return;
        this.$refs.provider.applyResult({
          errors: value,
          valid: false, // boolean state
          failedRules: {}, // should be empty since this is a manual error.
        });
      },
    },
  },
  methods: {
    getType(errors, valid) {
      if (errors.length === 0 && valid) return 'is-success';
      if (errors.length > 0) return 'is-danger';
      return '';
    },
  },
};
