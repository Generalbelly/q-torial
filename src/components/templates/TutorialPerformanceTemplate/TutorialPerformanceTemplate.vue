<template>
    <div>
      <base-loading is-full-page :active="loading" />
      <base-heading v-if="tutorial">
        {{ tutorial.name }}
      </base-heading>
      <base-columns>
        <base-column>
          <base-level>
            <base-level-left>
              <base-level-item>
                <select-field
                  :items="dateRanges"
                  v-model="dateRange"
                  class="is-marginless"
                />
                <base-field
                  v-show="dateRange === 'CUSTOM'"
                  grouped
                >
                  <b-datepicker
                    placeholder="From"
                    v-model="customFrom"
                  />
                  <b-datepicker
                    placeholder="To"
                    v-model="customTo"
                  />
                </base-field>
              </base-level-item>
              <base-level-item>
                {{ selectedDates }}
              </base-level-item>
            </base-level-left>
          </base-level>
        </base-column>
      </base-columns>
      <base-columns>
        <base-column class="card">
          <div class="has-text-weight-semibold has-margin-bottom-4">TOTAL COMPLETED</div>
          <p class="">How many times the tutorial is completed?</p>
          <div class="has-text-weight-bold result-number">
            {{ numberWithCommas(numberOfCompletePerformances) }}
          </div>
        </base-column>
        <base-column class="card">
          <div class="has-text-weight-semibold has-margin-bottom-4">TOTAL NUMBER SHOWN</div>
          <p>How many times the tutorial is shown?</p>
          <div class="has-text-weight-bold result-number">
            {{ numberWithCommas(numberOfPerformances) }}
          </div>
        </base-column>
        <base-column class="card">
          <div class="has-text-weight-semibold has-margin-bottom-4">COMPLETION RATE</div>
          <p>What percentage of users completed the tutorial?</p>
          <div class="has-text-weight-bold result-number">
            {{ numberWithCommas(completionRate) }}%
          </div>
        </base-column>
      </base-columns>
      <base-columns>
        <base-column>
          <base-sub-heading>
            Step by Step Performance
          </base-sub-heading>
          <base-table
            :data="stepsData"
            :loadable="false"
          >
            <template v-slot:empty>
              No data available
            </template>
            <template slot-scope="props">
              <b-table-column field="step" label="Step">
                {{ props.row.step }}
              </b-table-column>
              <b-table-column field="shown" label="Shown">
                {{ props.row.shown }}
              </b-table-column>
              <b-table-column field="completed" label="Completed">
                {{ props.row.completed }}
              </b-table-column>
              <b-table-column field="completionRate" label="Completion Rate">
                <div style="display: flex; align-items: center;">
                  <div style="min-width: 80px;">{{ props.row.completionRate * 100 }} %</div>
                  <progress
                    class="progress is-primary"
                    :value="props.row.completionRate * 100"
                    max="100"
                  >
                    {{ props.row.completionRate }}
                  </progress>
                </div>
              </b-table-column>
            </template>
          </base-table>
        </base-column>
      </base-columns>
    </div>
</template>

<script>
import format from 'date-fns/format';
import startOfDay from 'date-fns/startOfDay';
import endOfDay from 'date-fns/endOfDay';
import subDays from 'date-fns/subDays';
import startOfMonth from 'date-fns/startOfMonth';
import subMonths from 'date-fns/subMonths';
import endOfMonth from 'date-fns/endOfMonth';
import BaseLoading from '../../atoms/BaseLoading/BaseLoading';
import BaseColumns from '../../atoms/BaseColumns/BaseColumns';
import BaseColumn from '../../atoms/BaseColumn/BaseColumn';
import BaseTable from '../../molecules/BaseTable/BaseTable';
import BaseSubHeading from '../../atoms/BaseSubHeading/BaseSubHeading';
import BaseHeading from '../../atoms/BaseHeading/BaseHeading';
import SelectField from '../../molecules/fields/SelectField/SelectField';
import BaseField from '../../atoms/BaseField/BaseField';
import BaseFadeTransitionGroup
  from '../../atoms/transitions/BaseFadeTransitionGroup/BaseFadeTransitionGroup';
import BaseLevel from '../../atoms/BaseLevel/BaseLevel';
import BaseLevelLeft from '../../atoms/BaseLevelLeft/BaseLevelLeft';
import BaseLevelItem from '../../atoms/BaseLevelItem/BaseLevelItem';

const ALL_TIME = 'ALL_TIME';
const LAST_7_DAYS = 'LAST_7_DAYS';
const LAST_14_DAYS = 'LAST_14_DAYS';
const LAST_30_DAYS = 'LAST_30_DAYS';
const CUSTOM = 'CUSTOM';
const THIS_MONTH = 'THIS_MONTH';
const LAST_MONTH = 'LAST_MONTH';
const SELECTED_DATES = 'SELECTED_DATES';
const dateRanges = [
  {
    text: 'This Month',
    value: THIS_MONTH,
  },
  {
    text: 'Last Month',
    value: LAST_MONTH,
  },
  {
    text: 'Last 7 days',
    value: LAST_7_DAYS,
  },
  {
    text: 'Last 14 days',
    value: LAST_14_DAYS,
  },
  {
    text: 'Last 30 days',
    value: LAST_30_DAYS,
  },
  {
    text: 'All time',
    value: ALL_TIME,
  },
  {
    text: 'Custom',
    value: CUSTOM,
  },
];

export default {
  name: 'TutorialPerformanceTemplate',
  components: {
    BaseLevelItem,
    BaseLevelLeft,
    BaseLevel,
    BaseFadeTransitionGroup,
    BaseField,
    SelectField,
    BaseHeading,
    BaseSubHeading,
    BaseTable,
    BaseColumn,
    BaseColumns,
    BaseLoading,
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
    dates: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      dateRanges,
      dateRange: THIS_MONTH,
      customFrom: null,
      customTo: null,
      onDateRangeSelection: false,
      selectedDates: null,
    };
  },
  computed: {
    // sumOfAllSteps() {
    //   if (this.listOfAllSteps.length > 0) {
    //     return this.listOfAllSteps.reduce((total, current) => total + current, 0);
    //   }
    //   return 0;
    // },
    // sumOfCompleteSteps() {
    //   if (this.listOfCompleteSteps.length > 0) {
    //     return this.listOfCompleteSteps.reduce((total, current) => total + current, 0);
    //   }
    //   return 0;
    // },
    // sumOfElapsedTimeInSec() {
    //   if (this.listOfElapsedTime.length > 0) {
    //     return this.listOfElapsedTime.reduce((total, current) => total + current, 0) / 1000;
    //   }
    //   return 0;
    // },
    // listOfAllSteps() {
    //   if (this.tutorial && this.tutorial.id) {
    //     return this.tutorial.performances.map(p => p.allSteps);
    //   }
    //   return [];
    // },
    // listOfCompleteSteps() {
    //   if (this.tutorial && this.tutorial.id) {
    //     return this.tutorial.performances.map(p => p.completeSteps);
    //   }
    //   return [];
    // },
    // listOfElapsedTime() {
    //   if (this.tutorial && this.tutorial.id) {
    //     return this.tutorial.performances.map(p => p.elapsedTime);
    //   }
    //   return [];
    // },
    numberOfPerformances() {
      if (this.tutorial && this.tutorial.id) {
        return this.tutorial.performances.length;
      }
      return 0;
    },
    numberOfCompletePerformances() {
      if (this.tutorial && this.tutorial.id) {
        return this.tutorial.performances.filter(p => p.complete).length;
      }
      return 0;
    },
    completionRate() {
      if (this.numberOfCompletePerformances > 0 && this.numberOfPerformances > 0) {
        return this.numberOfCompletePerformances / this.numberOfPerformances * 100;
      }
      return 0;
    },
    stepsData() {
      if (this.tutorial && this.tutorial.id) {
        const data = {}
        this.tutorial.performances.forEach((performance) => {
          for (let i = 1; i <= performance.allSteps; i++) {
            if (!data[i]) {
              data[i] = [];
            }
            data[i].push({
              shown: true,
              completed: i <= performance.completeSteps,
            });
          }
        })
        return Object.keys(data).map((step) => {
          const shown = data[step].filter(s => s.shown).length;
          const completed = data[step].filter(s => s.completed).length;
          return {
            step,
            shown: this.numberWithCommas(shown),
            completed: this.numberWithCommas(completed),
            completionRate: completed / shown,
          };
        });
      }
      return [];
    },
  },
  watch: {
    dates(value) {
      let from = null;
      let to = null;
      if (value.length === 2) {
        from = format(value[0], 'yyyy/MM/dd');
        to = format(value[1], 'yyyy/MM/dd');
      }
      if (from && to) {
        this.selectedDates = `${from} - ${to}`;
      } else {
        this.selectedDates = '';
      }
    },
    customFrom(value) {
      if (
        this.dateRange === CUSTOM
        && value
        && this.customTo
        && value.getTime() <= this.customTo.getTime()
      ) {
        this.$emit('update:dates', [value, this.customTo]);
      }
    },
    customTo(value) {
      if (
        this.dateRange === CUSTOM
        && value
        && this.customFrom
        && this.customFrom.getTime() <= value.getTime()
      ) {
        this.$emit('update:dates', [this.customFrom, value]);
      }
    },
    dateRange(value) {
      if (value === SELECTED_DATES || value === CUSTOM) return;
      let from = null;
      let to = null;
      const yesterday = endOfDay(subDays(new Date(), 1));
      switch (value) {
        case LAST_7_DAYS:
        case LAST_14_DAYS:
        case LAST_30_DAYS:
          to = yesterday;
          from = startOfDay(subDays(to, parseInt(value.replace(/\D/g, ''), 10)));
          break;
        case THIS_MONTH:
          to = yesterday
          from = startOfDay(startOfMonth(to));
          break;
        case LAST_MONTH:
          from = startOfDay(startOfMonth(subMonths(yesterday, 1)));
          to = endOfDay(endOfMonth(subMonths(yesterday, 1)));
          break;
        default:
          break;
      }
      this.$emit('update:dates', [from, to]);
    },
  },
  methods: {
    numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
  }
};
</script>

<style scoped>
.columns {
  margin-top: 2em;
}
.column.card {
  margin: .5em;
  padding: 2em 1.5em;
}
/*.column.card > p {*/
/*  white-space: nowrap;*/
/*}*/
.result-number {
  font-size: 3em;
  margin-top: .5em;
  margin-left: .5em;
  margin-right: .5em;
  margin-bottom: 0;
}
</style>
