<template>
  <div>
    <nav
      class="navbar is-spaced has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div class="container">
        <template>
          <base-navbar-brand>
            <base-navbar-item>
              <base-logo
                @click="onClickLogo"
                :width="180"
                :height="48"
                view-box="60 0 257 100"
              />
            </base-navbar-item>
            <base-navbar-burger
              :is-active="burgerMenuActive"
              @click="burgerMenuActive = !burgerMenuActive"
            />
          </base-navbar-brand>
          <base-navbar-menu :is-active="burgerMenuActive">
            <base-navbar-start>
              <template v-for="item in navItems">
                <router-link
                  v-if="item.to.name"
                  :class="routerLinkClass(item.to)"
                  :to="item.to"
                  :key="item.text"
                >
                  <base-icon
                    :icon="item.icon"
                  />
                  <span>{{ item.text }}</span>
                </router-link>
                <a
                  :key="item.text"
                  v-else
                  :href="item.to"
                  :class="routerLinkClass(item.to)"
                  target="_blank"
                >{{ item.text }}
                </a>
              </template>
            </base-navbar-start>
            <base-navbar-end>
              <base-navbar-item>
                <template v-if="user">
                  <base-dropdown
                    :items="userItems"
                    @click:item="onClickItem"
                  >
                    <div class="is-flex has-cursor-pointer">
                      <base-icon icon="user-circle" />
                      <span>{{ user.email }}</span>
                    </div>
                  </base-dropdown>
                </template>
                <template v-else>
                  <router-link
                    v-for="item in userItems"
                    :to="item.to"
                    :key="item.text"
                  >
                    <base-icon
                      :icon="item.icon"
                    />
                    <span>{{ item.text }}</span>
                  </router-link>
                </template>
              </base-navbar-item>
            </base-navbar-end>
          </base-navbar-menu>
        </template>
      </div>
    </nav>
    <div>

      <base-modal :active="showCancelCompleteModal" hide-cancel>
        <template v-slot:content>
          Cancelling successfully done.
        </template>
        <template v-slot:primary-action-button>
          <base-button @click="showCancelCompleteModal = false">Close</base-button>
        </template>
      </base-modal>

      <error-modal
        :active="showCancelFailedModal"
        show-support-email
        @click:close="showCancelFailedModal = false"
      >
        Error occurred while cancelling.
      </error-modal>

      <base-modal :active="showUpgradeCompleteModal" hide-cancel>
        <template v-slot:content>
          Upgrading successfully done.
        </template>
        <template v-slot:primary-action-button>
          <base-button @click="showUpgradeCompleteModal = false">Close</base-button>
        </template>
      </base-modal>

<!--      <error-modal-->
<!--        :active="showUpgradeFailedModal"-->
<!--        show-support-email-->
<!--        @click:close="showUpgradeFailedModal = false"-->
<!--      >-->
<!--        Error occurred while upgrading.-->
<!--      </error-modal>-->

      <base-loading is-full-page :active="loading" />
    </div>
  </div>
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
import BaseDropdown from '../../../molecules/BaseDropdown/BaseDropdown';
import stripe from '../../../../stripe';
import BaseModal from '../../../molecules/BaseModal/BaseModal';
import BaseButton from '../../../atoms/BaseButton/BaseButton';
import BaseLoading from '../../../atoms/BaseLoading/BaseLoading';
import ErrorModal from '../../modals/ErrorModal/ErrorModal';

// TODO stripeの処理をApp.vueに移す
export default {
  name: 'TheNavbar',
  components: {
    ErrorModal,
    BaseLoading,
    BaseButton,
    BaseModal,
    BaseDropdown,
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
    userItems: {
      type: Array,
      default() {
        return [];
      },
    },
    user: {
      type: Object,
      default: null,
    },
    isOnIndexPage: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      burgerMenuActive: false,
      stripe: null,
      showCancelCompleteModal: false,
      showCancelFailedModal: false,
      showUpgradeCompleteModal: false,
      // showUpgradeFailedModal: false,
      loading: false,
    };
  },
  watch: {
    user(value) {
      if (value && value.stripeCustomer && this.$route.query.source === 'stripe') {
        this.showUpgradeCompleteModal = true;
      }
    },
    showUpgradeCompleteModal(value) {
      if (this.user && this.user.stripeCustomer && !value) {
        this.$router.push({
          name: 'tutorials.index',
        });
      }
    },
  },
  created() {
    this.stripe = window.Stripe(process.env.VUE_APP_STRIPE_PUBLISHABLE_KEY);
  },
  methods: {
    // TODO 本当はApp.vueにあるべき
    async onClickItem(value) {
      if (this.user) {
        if (value === 'upgrade') {
          const result = await this.stripe.redirectToCheckout({
            items: [{
              // Replace with the ID of your plan
              plan: process.env.VUE_APP_STRIPE_PLAN,
              quantity: 1,
            }],
            successUrl: `${process.env.VUE_APP_URL}/tutorials?source=stripe`,
            cancelUrl: window.location.href,
            clientReferenceId: this.user.uid,
          });
          if (result && result.error) {
            console.error(result.error.message);
          }
        } else if (value === 'cancel') {
          this.loading = true;
          const result = await stripe.cancelSubscription(this.user.stripeCustomer.id);
          this.loading = false;
          if (result) {
            this.showCancelCompleteModal = true;
          } else {
            this.showCancelFailedModal = true;
          }
        } else if (value === 'signOut') {
          this.$emit('click:sign-out');
        }
      }
    },
    routerLinkClass(to) {
      const baseClasses = {
        'navbar-item': true,
        'is-flex': true,
      };
      if (to.name) {
        const prefix = to.name.split('.')[0];
        return {
          'has-text-primary': this.$route.name ? this.$route.name.startsWith(prefix) : false,
          'has-text-primary-100': this.$route.name ? !this.$route.name.startsWith(prefix) : false,
          ...baseClasses,
        };
      }
      return {
        'has-text-primary-100': true,
        ...baseClasses,
      };
    },
    onClickLogo() {
      this.$emit('click:logo');
    },
  },
};
</script>

<style scoped>
  .navbar-item >>> .icon {
      margin-right: .25em;
  }
  .navbar.is-spaced {
    padding: 0;
  }
  .navbar-burger.burger {
    width: 64px;
    height: 64px;
  }
</style>
