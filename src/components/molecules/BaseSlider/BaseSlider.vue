<template>
  <b-slider :size="size" :min="min" :max="max" :custom-formatter="formatter" v-bind="$attrs" v-on="$listeners">
    <template v-for="item in items">
      <b-slider-tick :value="item" :key="item">{{ item }}</b-slider-tick>
    </template>
  </b-slider>
</template>

<script>
export default {
  name: 'BaseSlider',
  props: {
    size: {
      type: String,
      default: 'is-medium',
    },
    min: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 100,
    },
    value: {
      type: Number,
      default: null,
    },
    items: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  mounted() {
    // 本当はこんなやりかたやだよ
    document.querySelectorAll('span.b-slider-tick-label').forEach((el) => {
      el.textContent = this.formatter(el.textContent);
    });
  },
  methods: {
    formatter(value) {
      return String(value).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
    },
  },
};
</script>

<style scoped>
</style>
