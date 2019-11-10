<template>
  <div class="hello" ref="heatmap" />
</template>

<script>
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
/* Chart code */
// Themes begin
am4core.useTheme(am4themes_animated);
// Themes end

export default {
  name: 'Heatmap',
  mounted() {
    const chart = am4core.create(this.$refs.heatmap, am4charts.XYChart);
    chart.maskBullets = false;

    const xAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    const yAxis = chart.yAxes.push(new am4charts.CategoryAxis());

    xAxis.dataFields.category = 'weekday';
    yAxis.dataFields.category = 'date';

    xAxis.renderer.grid.template.disabled = true;
    xAxis.renderer.minGridDistance = 40;

    yAxis.renderer.grid.template.disabled = true;
    yAxis.renderer.inversed = true;
    yAxis.renderer.minGridDistance = 30;

    const series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.categoryX = 'weekday';
    series.dataFields.categoryY = 'date';
    series.dataFields.value = 'value';
    series.sequencedInterpolation = true;
    series.defaultState.transitionDuration = 3000;

    const bgColor = new am4core.InterfaceColorSet().getFor('background');

    const columnTemplate = series.columns.template;
    columnTemplate.strokeWidth = 1;
    columnTemplate.strokeOpacity = 0.2;
    columnTemplate.stroke = bgColor;
    columnTemplate.tooltipText = "{weekday}, {date}: {value.workingValue.formatNumber('#.')}";
    columnTemplate.width = am4core.percent(100);
    columnTemplate.height = am4core.percent(100);

    series.heatRules.push({
      target: columnTemplate,
      property: 'fill',
      min: am4core.color(bgColor),
      max: chart.colors.getIndex(0),
    });

    // heat legend
    const heatLegend = chart.bottomAxesContainer.createChild(am4charts.HeatLegend);
    heatLegend.width = am4core.percent(100);
    heatLegend.series = series;
    heatLegend.valueAxis.renderer.labels.template.fontSize = 9;
    heatLegend.valueAxis.renderer.minGridDistance = 30;

    // heat legend behavior
    series.columns.template.events.on('over', (event) => {
      handleHover(event.target);
    });

    series.columns.template.events.on('hit', (event) => {
      handleHover(event.target);
    });

    function handleHover(column) {
      if (!isNaN(column.dataItem.value)) {
        heatLegend.valueAxis.showTooltipAt(column.dataItem.value);
      } else {
        heatLegend.valueAxis.hideTooltip();
      }
    }

    series.columns.template.events.on('out', (event) => {
      heatLegend.valueAxis.hideTooltip();
    });

    chart.data = [
      {
        date: '12pm',
        weekday: 'Sun',
        value: 2990,
      },
      {
        date: '1am',
        weekday: 'Sun',
        value: 2520,
      },
      {
        date: '2am',
        weekday: 'Sun',
        value: 2334,
      },
      {
        date: '3am',
        weekday: 'Sun',
        value: 2230,
      },
      {
        date: '4am',
        weekday: 'Sun',
        value: 2325,
      },
      {
        date: '5am',
        weekday: 'Sun',
        value: 2019,
      },
      {
        date: '6am',
        weekday: 'Sun',
        value: 2128,
      },
      {
        date: '7am',
        weekday: 'Sun',
        value: 2246,
      },
      {
        date: '8am',
        weekday: 'Sun',
        value: 2421,
      },
      {
        date: '9am',
        weekday: 'Sun',
        value: 2788,
      },
      {
        date: '10am',
        weekday: 'Sun',
        value: 2959,
      },
      {
        date: '11am',
        weekday: 'Sun',
        value: 3018,
      },
      {
        date: '12am',
        weekday: 'Sun',
        value: 3154,
      },
      {
        date: '1pm',
        weekday: 'Sun',
        value: 3172,
      },
      {
        date: '2pm',
        weekday: 'Sun',
        value: 3368,
      },
      {
        date: '3pm',
        weekday: 'Sun',
        value: 3464,
      },
      {
        date: '4pm',
        weekday: 'Sun',
        value: 3746,
      },
      {
        date: '5pm',
        weekday: 'Sun',
        value: 3656,
      },
      {
        date: '6pm',
        weekday: 'Sun',
        value: 3336,
      },
      {
        date: '7pm',
        weekday: 'Sun',
        value: 3292,
      },
      {
        date: '8pm',
        weekday: 'Sun',
        value: 3269,
      },
      {
        date: '9pm',
        weekday: 'Sun',
        value: 3300,
      },
      {
        date: '10pm',
        weekday: 'Sun',
        value: 3403,
      },
      {
        date: '11pm',
        weekday: 'Sun',
        value: 3323,
      },
      {
        date: '12pm',
        weekday: 'Mon',
        value: 3346,
      },
      {
        date: '1am',
        weekday: 'Mon',
        value: 2725,
      },
      {
        date: '2am',
        weekday: 'Mon',
        value: 3052,
      },
      {
        date: '3am',
        weekday: 'Mon',
        value: 3876,
      },
      {
        date: '4am',
        weekday: 'Mon',
        value: 4453,
      },
      {
        date: '5am',
        weekday: 'Mon',
        value: 3972,
      },
      {
        date: '6am',
        weekday: 'Mon',
        value: 4644,
      },
      {
        date: '7am',
        weekday: 'Mon',
        value: 5715,
      },
      {
        date: '8am',
        weekday: 'Mon',
        value: 7080,
      },
      {
        date: '9am',
        weekday: 'Mon',
        value: 8022,
      },
      {
        date: '10am',
        weekday: 'Mon',
        value: 8446,
      },
      {
        date: '11am',
        weekday: 'Mon',
        value: 9313,
      },
      {
        date: '12am',
        weekday: 'Mon',
        value: 9011,
      },
      {
        date: '1pm',
        weekday: 'Mon',
        value: 8508,
      },
      {
        date: '2pm',
        weekday: 'Mon',
        value: 8515,
      },
      {
        date: '3pm',
        weekday: 'Mon',
        value: 8399,
      },
      {
        date: '4pm',
        weekday: 'Mon',
        value: 8649,
      },
      {
        date: '5pm',
        weekday: 'Mon',
        value: 7869,
      },
      {
        date: '6pm',
        weekday: 'Mon',
        value: 6933,
      },
      {
        date: '7pm',
        weekday: 'Mon',
        value: 5969,
      },
      {
        date: '8pm',
        weekday: 'Mon',
        value: 5552,
      },
      {
        date: '9pm',
        weekday: 'Mon',
        value: 5434,
      },
      {
        date: '10pm',
        weekday: 'Mon',
        value: 5070,
      },
      {
        date: '11pm',
        weekday: 'Mon',
        value: 4851,
      },
      {
        date: '12pm',
        weekday: 'Tue',
        value: 4468,
      },
      {
        date: '1am',
        weekday: 'Tue',
        value: 3306,
      },
      {
        date: '2am',
        weekday: 'Tue',
        value: 3906,
      },
      {
        date: '3am',
        weekday: 'Tue',
        value: 4413,
      },
      {
        date: '4am',
        weekday: 'Tue',
        value: 4726,
      },
      {
        date: '5am',
        weekday: 'Tue',
        value: 4584,
      },
      {
        date: '6am',
        weekday: 'Tue',
        value: 5717,
      },
      {
        date: '7am',
        weekday: 'Tue',
        value: 6504,
      },
      {
        date: '8am',
        weekday: 'Tue',
        value: 8104,
      },
      {
        date: '9am',
        weekday: 'Tue',
        value: 8813,
      },
      {
        date: '10am',
        weekday: 'Tue',
        value: 9278,
      },
      {
        date: '11am',
        weekday: 'Tue',
        value: 10425,
      },
      {
        date: '12am',
        weekday: 'Tue',
        value: 10137,
      },
      {
        date: '1pm',
        weekday: 'Tue',
        value: 9290,
      },
      {
        date: '2pm',
        weekday: 'Tue',
        value: 9255,
      },
      {
        date: '3pm',
        weekday: 'Tue',
        value: 9614,
      },
      {
        date: '4pm',
        weekday: 'Tue',
        value: 9713,
      },
      {
        date: '5pm',
        weekday: 'Tue',
        value: 9667,
      },
      {
        date: '6pm',
        weekday: 'Tue',
        value: 8774,
      },
      {
        date: '7pm',
        weekday: 'Tue',
        value: 8649,
      },
      {
        date: '8pm',
        weekday: 'Tue',
        value: 9937,
      },
      {
        date: '9pm',
        weekday: 'Tue',
        value: 10286,
      },
      {
        date: '10pm',
        weekday: 'Tue',
        value: 9175,
      },
      {
        date: '11pm',
        weekday: 'Tue',
        value: 8581,
      },
      {
        date: '12pm',
        weekday: 'Wed',
        value: 8145,
      },
      {
        date: '1am',
        weekday: 'Wed',
        value: 7177,
      },
      {
        date: '2am',
        weekday: 'Wed',
        value: 5657,
      },
      {
        date: '3am',
        weekday: 'Wed',
        value: 6802,
      },
      {
        date: '4am',
        weekday: 'Wed',
        value: 8159,
      },
      {
        date: '5am',
        weekday: 'Wed',
        value: 8449,
      },
      {
        date: '6am',
        weekday: 'Wed',
        value: 9453,
      },
      {
        date: '7am',
        weekday: 'Wed',
        value: 9947,
      },
      {
        date: '8am',
        weekday: 'Wed',
        value: 11471,
      },
      {
        date: '9am',
        weekday: 'Wed',
        value: 12492,
      },
      {
        date: '10am',
        weekday: 'Wed',
        value: 9388,
      },
      {
        date: '11am',
        weekday: 'Wed',
        value: 9928,
      },
      {
        date: '12am',
        weekday: 'Wed',
        value: 9644,
      },
      {
        date: '1pm',
        weekday: 'Wed',
        value: 9034,
      },
      {
        date: '2pm',
        weekday: 'Wed',
        value: 8964,
      },
      {
        date: '3pm',
        weekday: 'Wed',
        value: 9069,
      },
      {
        date: '4pm',
        weekday: 'Wed',
        value: 8898,
      },
      {
        date: '5pm',
        weekday: 'Wed',
        value: 8322,
      },
      {
        date: '6pm',
        weekday: 'Wed',
        value: 6909,
      },
      {
        date: '7pm',
        weekday: 'Wed',
        value: 5810,
      },
      {
        date: '8pm',
        weekday: 'Wed',
        value: 5151,
      },
      {
        date: '9pm',
        weekday: 'Wed',
        value: 4911,
      },
      {
        date: '10pm',
        weekday: 'Wed',
        value: 4487,
      },
      {
        date: '11pm',
        weekday: 'Wed',
        value: 4118,
      },
      {
        date: '12pm',
        weekday: 'Thu',
        value: 3689,
      },
      {
        date: '1am',
        weekday: 'Thu',
        value: 3081,
      },
      {
        date: '2am',
        weekday: 'Thu',
        value: 6525,
      },
      {
        date: '3am',
        weekday: 'Thu',
        value: 6228,
      },
      {
        date: '4am',
        weekday: 'Thu',
        value: 6917,
      },
      {
        date: '5am',
        weekday: 'Thu',
        value: 6568,
      },
      {
        date: '6am',
        weekday: 'Thu',
        value: 6405,
      },
      {
        date: '7am',
        weekday: 'Thu',
        value: 8106,
      },
      {
        date: '8am',
        weekday: 'Thu',
        value: 8542,
      },
      {
        date: '9am',
        weekday: 'Thu',
        value: 8501,
      },
      {
        date: '10am',
        weekday: 'Thu',
        value: 8802,
      },
      {
        date: '11am',
        weekday: 'Thu',
        value: 9420,
      },
      {
        date: '12am',
        weekday: 'Thu',
        value: 8966,
      },
      {
        date: '1pm',
        weekday: 'Thu',
        value: 8135,
      },
      {
        date: '2pm',
        weekday: 'Thu',
        value: 8224,
      },
      {
        date: '3pm',
        weekday: 'Thu',
        value: 8387,
      },
      {
        date: '4pm',
        weekday: 'Thu',
        value: 8218,
      },
      {
        date: '5pm',
        weekday: 'Thu',
        value: 7641,
      },
      {
        date: '6pm',
        weekday: 'Thu',
        value: 6469,
      },
      {
        date: '7pm',
        weekday: 'Thu',
        value: 5441,
      },
      {
        date: '8pm',
        weekday: 'Thu',
        value: 4952,
      },
      {
        date: '9pm',
        weekday: 'Thu',
        value: 4643,
      },
      {
        date: '10pm',
        weekday: 'Thu',
        value: 4393,
      },
      {
        date: '11pm',
        weekday: 'Thu',
        value: 4017,
      },
      {
        date: '12pm',
        weekday: 'Fri',
        value: 4022,
      },
      {
        date: '1am',
        weekday: 'Fri',
        value: 3063,
      },
      {
        date: '2am',
        weekday: 'Fri',
        value: 3638,
      },
      {
        date: '3am',
        weekday: 'Fri',
        value: 3968,
      },
      {
        date: '4am',
        weekday: 'Fri',
        value: 4070,
      },
      {
        date: '5am',
        weekday: 'Fri',
        value: 4019,
      },
      {
        date: '6am',
        weekday: 'Fri',
        value: 4548,
      },
      {
        date: '7am',
        weekday: 'Fri',
        value: 5465,
      },
      {
        date: '8am',
        weekday: 'Fri',
        value: 6909,
      },
      {
        date: '9am',
        weekday: 'Fri',
        value: 7706,
      },
      {
        date: '10am',
        weekday: 'Fri',
        value: 7867,
      },
      {
        date: '11am',
        weekday: 'Fri',
        value: 8615,
      },
      {
        date: '12am',
        weekday: 'Fri',
        value: 8218,
      },
      {
        date: '1pm',
        weekday: 'Fri',
        value: 7604,
      },
      {
        date: '2pm',
        weekday: 'Fri',
        value: 7429,
      },
      {
        date: '3pm',
        weekday: 'Fri',
        value: 7488,
      },
      {
        date: '4pm',
        weekday: 'Fri',
        value: 7493,
      },
      {
        date: '5pm',
        weekday: 'Fri',
        value: 6998,
      },
      {
        date: '6pm',
        weekday: 'Fri',
        value: 5941,
      },
      {
        date: '7pm',
        weekday: 'Fri',
        value: 5068,
      },
      {
        date: '8pm',
        weekday: 'Fri',
        value: 4636,
      },
      {
        date: '9pm',
        weekday: 'Fri',
        value: 4241,
      },
      {
        date: '10pm',
        weekday: 'Fri',
        value: 3858,
      },
      {
        date: '11pm',
        weekday: 'Fri',
        value: 3833,
      },
      {
        date: '12pm',
        weekday: 'Sat',
        value: 3503,
      },
      {
        date: '1am',
        weekday: 'Sat',
        value: 2842,
      },
      {
        date: '2am',
        weekday: 'Sat',
        value: 2808,
      },
      {
        date: '3am',
        weekday: 'Sat',
        value: 2399,
      },
      {
        date: '4am',
        weekday: 'Sat',
        value: 2280,
      },
      {
        date: '5am',
        weekday: 'Sat',
        value: 2139,
      },
      {
        date: '6am',
        weekday: 'Sat',
        value: 2527,
      },
      {
        date: '7am',
        weekday: 'Sat',
        value: 2940,
      },
      {
        date: '8am',
        weekday: 'Sat',
        value: 3066,
      },
      {
        date: '9am',
        weekday: 'Sat',
        value: 3494,
      },
      {
        date: '10am',
        weekday: 'Sat',
        value: 3287,
      },
      {
        date: '11am',
        weekday: 'Sat',
        value: 3416,
      },
      {
        date: '12am',
        weekday: 'Sat',
        value: 3432,
      },
      {
        date: '1pm',
        weekday: 'Sat',
        value: 3523,
      },
      {
        date: '2pm',
        weekday: 'Sat',
        value: 3542,
      },
      {
        date: '3pm',
        weekday: 'Sat',
        value: 3347,
      },
      {
        date: '4pm',
        weekday: 'Sat',
        value: 3292,
      },
      {
        date: '5pm',
        weekday: 'Sat',
        value: 3416,
      },
      {
        date: '6pm',
        weekday: 'Sat',
        value: 3131,
      },
      {
        date: '7pm',
        weekday: 'Sat',
        value: 3057,
      },
      {
        date: '8pm',
        weekday: 'Sat',
        value: 3227,
      },
      {
        date: '9pm',
        weekday: 'Sat',
        value: 3060,
      },
      {
        date: '10pm',
        weekday: 'Sat',
        value: 2855,
      },
      {
        date: '11pm',
        weekday: 'Sat',
        value: 2625,
      },
    ];
  },
  beforeDestroy() {
    if (this.chart) {
      this.chart.dispose();
    }
  },
};
</script>

<style scoped>

</style>
