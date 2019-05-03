<script>
export default {
  name: 'BaseNavbarItem',
  props: {
    el: {
      type: String,
      default: 'span',
    },
  },
  render(createElement) {
    const self = this;
    return createElement(
      self.el,
      {
        class: {
          'navbar-item': true,
        },
        on: {
          click(event) {
            self.$emit('click', event);
          },
        },
      },
      self.$slots.default,
    );
  },
};
</script>
