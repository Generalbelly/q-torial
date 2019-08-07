<template>
  <nav
    class="navbar is-spaced has-shadow"
    role="navigation"
    aria-label="main navigation"
  >
    <div class="container">
      <template>
        <base-navbar-brand>
          <base-navbar-item el="a">
            <base-logo></base-logo>
          </base-navbar-item>
          <base-navbar-burger
            :is-active="burgerMenuActive"
            @click="burgerMenuActive = !burgerMenuActive"
          ></base-navbar-burger>
        </base-navbar-brand>
        <base-navbar-menu :is-active="burgerMenuActive">
          <base-navbar-start>
            <template v-for="item in navItems">
              <router-link
                :class="routerLinkClass(item.to)"
                :to="item.to"
                :key="item.text"
              >
                <base-icon
                  :icon="item.icon"
                  size="is-small"
                >
                </base-icon>
                <span>{{ item.text }}</span>
              </router-link>
            </template>
          </base-navbar-start>
          <base-navbar-end class="has-text-centered-mobile">
            <base-navbar-item
              @click="$emit('click:sign-out', $event)"
            >
              <b-icon icon="sign-out-alt" size="is-small"></b-icon>
              <span>Sign out</span>
            </base-navbar-item>
          </base-navbar-end>
        </base-navbar-menu>
      </template>
    </div>
  </nav>
</template>

<script>
import BaseLogo from '../../../atoms/BaseLogo';
import BaseNavbarItem from '../../../atoms/BaseNavbarItem';
import BaseNavbarBurger from '../../../atoms/BaseNavbarBurger';
import BaseNavbarBrand from '../../../atoms/BaseNavbarBrand';
import BaseNavbarMenu from '../../../atoms/BaseNavbarMenu';
import BaseNavbarStart from '../../../atoms/BaseNavbarStart';
import BaseNavbarEnd from '../../../atoms/BaseNavbarEnd';
import BaseIcon from '../../../atoms/icons/BaseIcon/BaseIcon';

export default {
  name: 'TheNavbar',
  components: {
    BaseIcon,
    BaseNavbarEnd,
    BaseNavbarStart,
    BaseNavbarMenu,
    BaseNavbarBrand,
    BaseNavbarBurger,
    BaseNavbarItem,
    BaseLogo,
  },
  props: {
    navItems: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      burgerMenuActive: false,
    };
  },
  methods: {
    routerLinkClass(to) {
      const prefix = to.name.split('.')[0];
      return {
        'has-text-primary': this.$route.name ? this.$route.name.startsWith(prefix) : false,
        'has-text-primary-100': this.$route.name ? !this.$route.name.startsWith(prefix) : false,
        'navbar-item': true,
      };
    },
  },
};
</script>

<style scoped>
  .navbar-item >>> .icon {
      margin-left: -.25em;
      margin-right: .25em;
  }
</style>
