<template>
  <div>
    <div class="segment-container" style="background-color: #fff !important;">
      <base-columns>
        <base-column class="is-flex">
          <h1 class="has-text-weight-bold is-size-2">
            Build product tutorials code-free
          </h1>
          <p class="has-margin-top-4 has-text-weight-semibold">
            Increase user engagements and satisfactions without engineers help.<br />
          </p>
          <div class="has-margin-top-6 buttons">
            <primary-button size="is-large">
              Start free
            </primary-button>
            <base-button size="is-large">
              Try the demo
            </base-button>
          </div>
          <span class="help">No credit card required • Risk free 14-day trial • Cancel anytime</span>
        </base-column>
        <base-column>
          <img src="/img/screen.png" />
        </base-column>
      </base-columns>
    </div>
    <div class="segment-container">
      <base-columns class="has-margin-top-6">
        <base-column class="is-flex">
          <h2 class="is-size-3 has-text-weight-semibold has-margin-bottom-5">
            Show your product value at a glance
          </h2>
          <p>
            Create engaging onboarding experiences, so that new users know they can improve their lives with your product from day one.
          </p>
        </base-column>
        <base-column>
          <img src="/img/welcome.png" />
        </base-column>
      </base-columns>
      <base-columns class="has-margin-top-6">
        <base-column>
          <img src="/img/new_feature.png" />
        </base-column>
        <base-column class="is-flex">
          <h2 class="is-size-3 has-text-weight-semibold has-margin-bottom-5">
            Drive adoption of your product new feature
          </h2>
          <p>
            Guide them with step by step tutorial. The sooner users get familiar with your product new feature, the more active they become.
          </p>
        </base-column>
      </base-columns>
      <base-columns class="has-margin-top-6">
        <base-column class="is-flex">
          <h2 class="is-size-3 has-text-weight-semibold has-margin-bottom-5">
            Measure effectiveness
          </h2>
          <p>
            Measure how effective tutorials are to improve entire you product experience.<br />
            Google Analytics integration is also supported.
          </p>
        </base-column>
        <base-column>
          <img src="/img/measure.png" />
        </base-column>
      </base-columns>
    </div>
    <div class="has-margin-top-6 segment-container has-background-info">
      <p class="has-padding-top-5 has-text-centered is-size-3 has-text-weight-semibold has-text-grey">
        Pricing
      </p>
      <base-columns class="has-padding-y-5">
        <base-column>
          <base-card class="has-text-centered">
            <div class="has-text-primary is-size-5">Self-host Plan</div>
            <div class="is-size-3">Free</div>
          </base-card>
        </base-column>
        <base-column>
          <base-card class="has-text-centered">
            <div class="has-text-primary is-size-5">Basic Plan</div>
            <div class="is-size-3">$10<span class="is-size-7">/Mo</span></div>
          </base-card>
        </base-column>
      </base-columns>
    </div>
    <div class="has-text-centered segment-container">
      <p class="has-margin-top-6 has-text-centered is-size-3 has-text-weight-semibold has-margin-bottom-5">30 Days Money-Back Guarantee</p>
      <p>Try Qtorial for free up to 14 Days. After the free trial period, we give you an extra 30 days to decide. Completely risk-free!</p>
      <div class="has-margin-5">
        <primary-button size="is-large">
          Start free
        </primary-button>
      </div>
    </div>
    <footer class="footer">
      <div class="content has-text-centered">
        © 2019 Qtorial
      </div>
    </footer>
  </div>
</template>

<script>

import BaseColumns from '../../atoms/BaseColumns/BaseColumns';
import BaseColumn from '../../atoms/BaseColumn/BaseColumn';
import BaseButton from '../../atoms/BaseButton/BaseButton';
import PrimaryButton from '../../atoms/buttons/PrimaryButton/PrimaryButton';
import BaseCard from '../../molecules/BaseCard/BaseCard';
import BaseLogo from '../../atoms/BaseLogo/BaseLogo';
import BaseNavbarBrand from '../../atoms/BaseNavbarBrand/BaseNavbarBrand';
import BaseNavbarItem from '../../atoms/BaseNavbarItem/BaseNavbarItem';
export default {
  name: 'IndexPage',
  components: {
    BaseNavbarItem,
    BaseNavbarBrand,
    BaseLogo,
    BaseCard,
    PrimaryButton,
    BaseButton,
    BaseColumn,
    BaseColumns
  },
  data() {
    return {};
  },
  computed: {
  },
};
</script>

<style scoped>
  .columns > .column {
    justify-content: center;
    flex-direction: column;
  }
  .segment-container {
    padding-left: 4rem;
    padding-right: 4rem;
  }
  .segment-container:nth-child(1) {
    padding-top: 4rem;
    padding-bottom: 4rem;
  }
  @media only screen and (max-width: 600px) {
    .segment-container {
      padding-left: 2rem;
      padding-right: 2rem;
    }
    .segment-container:nth-child(1) {
      padding-top: 2rem;
      padding-bottom: 2rem;
    }
    .segment-container:nth-child(1) .buttons .button {
      width: 100%;
      margin-right: 0;
    }
  }
</style>
