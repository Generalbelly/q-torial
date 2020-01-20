<template>
  <div>
    <section class="section" style="background-color: #fff !important;">
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
    </section>
    <section class="section">
      <base-columns>
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
      <base-columns>
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
      <base-columns>
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
    </section>
    <section class="section has-background-info">
      <p class="has-padding-top-3 has-text-centered is-size-3 has-text-weight-semibold has-text-grey">
        Pricing
      </p>
      <base-columns class="has-padding-y-5">
        <base-column>
          <base-card class="has-text-centered">
            <div class="label is-size-5 has-padding-bottom-4">{{ commaSeparationFormatter(monthlyActiveUsers) }} Monthly Active Users</div>
            <base-slider
              size="is-medium"
              :min="0"
              :max="20000"
              v-model="monthlyActiveUsers"
              :items="[1000, 2500, 5000, 10000, 20000]"
            />
            <div class="has-margin-top-5 is-size-2">
              ${{ calculateBasicPrice(monthlyActiveUsers) }}
              <span class="is-size-6">
                /Mo
              </span>
            </div>
            <ul class="has-margin-top-4">
              <li>
                Code-free tutorials builder
              </li>
              <li>
                Unlimited number of tutorials
              </li>
              <li>
                Tutorials performance reporting
              </li>
              <li>
                Google Analytics Integration
              </li>
              <li>
                Email support
              </li>
            </ul>
            <p class="has-margin-top-4 help">
              Do you have more than 20,000 users?
              Contact us for a customized Enterprise plan
            </p>
          </base-card>
        </base-column>
      </base-columns>
    </section>
    <section class="has-text-centered section">
      <p class="has-padding-top-3 has-text-centered is-size-3 has-text-weight-semibold has-margin-bottom-5">30 Days Money-Back Guarantee</p>
      <p>Try Qtorial for free up to 14 Days. After the free trial period, we give you an extra 30 days to decide. Completely risk-free!</p>
      <div class="has-margin-5">
        <primary-button size="is-large">
          Start free
        </primary-button>
      </div>
    </section>
    <footer class="footer">
      <div class="content has-text-centered">
        © 2019 Qtorial
      </div>
    </footer>
  </div>
</template>

<script>

import BaseColumns from '../../atoms/BaseColumns';
import BaseColumn from '../../atoms/BaseColumn';
import BaseButton from '../../atoms/BaseButton';
import PrimaryButton from '../../atoms/buttons/PrimaryButton';
import BaseCard from '../../molecules/BaseCard';
import BaseSlider from '../../molecules/BaseSlider';

export default {
  name: 'IndexPage',
  components: {
    BaseSlider,
    BaseCard,
    PrimaryButton,
    BaseButton,
    BaseColumn,
    BaseColumns,
  },
  data() {
    return {
      monthlyActiveUsers: 0,
    };
  },
  methods: {
    calculateBasicPrice(value) {
      if (value === 0) {
        return 25;
      }
      if (value <= 1000) {
        return 55;
      }
      if (value <= 5000) {
        return 99;
      }
      if (value <= 10000) {
        return 149;
      }
      if (value <= 20000) {
        return 199;
      }
      return 199;
    },
    commaSeparationFormatter(value) {
      return String(value).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
    },
  },
};
</script>

<style scoped>
  .columns > .column {
    justify-content: center;
    flex-direction: column;
  }
  .section {
    padding-left: 4rem;
    padding-right: 4rem;
  }
  .section:nth-child(1) {
    padding-top: 4rem;
    padding-bottom: 4rem;
  }
  @media only screen and (max-width: 600px) {
    .section {
      padding-left: 2rem;
      padding-right: 2rem;
    }
    .section:nth-child(1) {
      padding-top: 2rem;
      padding-bottom: 2rem;
    }
    .section:nth-child(1) .buttons .button {
      width: 100%;
      margin-right: 0;
    }
  }
</style>
