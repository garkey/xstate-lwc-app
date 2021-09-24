import { api } from 'lwc';
import EchartBase from 'c/echartBase';
import * as xstate from 'c/xstate';
import { byFilterMachine } from './byFilterMachine';

const { interpret } = xstate;

const staticswatches = {
  Health: {
      GREY: '#666',
      GREEN: '#0f0',
      YELLOW: '#ff0',
      RED: '#f00'
  }
};

const staticswatchkeys = Object.keys(staticswatches);

export default class ByFilter extends EchartBase {
    @api iteration;
    @api graphData = [];
    @api series;
    @api swatch;
    @api filter;
    @api targetDataOptions;
    @api filterOptions;
    @api targetData;
    state;
    service;
    filterIndex;
    targetDataIndex;

    connectedCallback() {
        this.service = interpret(byFilterMachine)
            .onTransition((s) => {
                this.state = s;

                // if (this.state.event.type === 'xstate.init') {
                //     this.postStateInit();
                // }
            })
            .start();
    }

    renderedCallback() {
        super.renderedCallback();
        const series = this.series.encode.map((o) => ({
            encode: { ...o, y: this.series.y },
            type: 'bar',
            stack: 'one',
            name: o.x
        }));

        const option = {
            dataset: {
                source: this.graphData
            },
            legend: { data: series.map((o) => o.name) },
            // grid: { containLabel: true },
            xAxis: {
                name: 'health statuses',
                position: 'top'
            },
            yAxis: {
                type: 'category',
                inverse: true
                // max: 100,
            },
            series,
        };

        let currswatch;
        
        if (staticswatchkeys.indexOf(this.targetData) > -1) {
          currswatch = Object.fromEntries(this.series.encode.map((o) => [o.x, staticswatches[this.targetData][o.x]]));
        } else {
          const plate = this.series.encode.map(e => e.x).sort();
          currswatch = Object.fromEntries(plate.map((o, i) => [o, this.themecolors[i]]));
        }

        if (Object.keys(currswatch).length > 0) {
          option.color = this.series.encode.map((o) => currswatch[o.x]);
        }

        this.option = option;
        this.selectOptions();
    }

    @api get xoptions() {
        return this.series.encode.map((o) => o.x);
    }

    @api get filterSelectVal() {
        return this.filter;
    }

    postStateInit() {}

    selectOptions() {
        const opt = this.filterOptions.find((o) => o.value === this.filter);
        const filterIndex = this.filterOptions.indexOf(opt);
        const opt2 = this.targetDataOptions.find(
            (o) => o.value === this.targetData
        );
        const targetDataIndex = this.targetDataOptions.indexOf(opt2);

        this.template.querySelector('.filter').selectedIndex = filterIndex;
        this.template.querySelector('.targetData').selectedIndex =
            targetDataIndex;
    }

    filterChanged(e) {
        this.dispatchEvent(
            new CustomEvent('filter', { detail: e.target.value })
        );
    }

    targetDataChanged(e) {
        this.dispatchEvent(
            new CustomEvent('targetdata', { detail: e.target.value })
        );
    }

    handleChange(e) {
        this.dispatchEvent(new CustomEvent('sort', { detail: e.target.value }));
    }

    setOption() {
        this.echart.setOption(this.option, true);
    }

    loadCallback() {
        this.echart.on('click', (param) => {
            console.log('param', param);
        });
    }
}
