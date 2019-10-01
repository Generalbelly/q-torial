<template>
    <div>
      <base-loading is-full-page :active="loading" />
      <base-heading>
        {{ tutorial.name }}
      </base-heading>
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
            {{ numberWithCommas(numberOfCompletePerformances / numberOfPerformances * 100) }}%
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
                  <progress class="progress is-primary" :value="props.row.completionRate * 100" max="100">{{ props.row.completionRate }}</progress>
                </div>
              </b-table-column>
            </template>
          </base-table>
        </base-column>
      </base-columns>
    </div>
</template>

<script>
import BaseLoading from '../../atoms/BaseLoading/BaseLoading';
import BaseColumns from '../../atoms/BaseColumns/BaseColumns';
import BaseColumn from '../../atoms/BaseColumn/BaseColumn';
import BaseTable from '../../molecules/BaseTable/BaseTable';
import BaseSubHeading from '../../atoms/BaseSubHeading/BaseSubHeading';
import BaseHeading from '../../atoms/BaseHeading/BaseHeading';

const columns = [
  {
    field: 'step',
    label: 'Step',
  },
  {
    field: 'shown',
    label: 'Shown',
    numeric: true,
  },
  {
    field: 'completed',
    label: 'Completed',
    numeric: true,
  },
  {
    field: 'completionRate',
    label: 'Completion Rate',
    numeric: true,
  },
];

export default {
  name: 'TutorialPerformanceTemplate',
  components: {
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
  },
  data() {
    return {
      // columns,
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
    }
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
