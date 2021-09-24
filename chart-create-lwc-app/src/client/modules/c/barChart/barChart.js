import { api } from 'lwc';
import EchartBase from 'c/echartBase';

export default class BarChart extends EchartBase {
    @api graphData = [];
    @api graphDataSeries;
    @api legendDataBars = [];
    @api xAxisLegend = 'x Title';
    @api title = 'Title';
    @api legendSelected = {};
    @api timeline;
    @api xAxisData = [];
    @api brushAction = {};
    @api brush = {};
    @api configZoom = [];
    @api toolbox = {
        show: false
    };
    @api clickChart;

    handleClick(event) {
        console.log('event.target', event.target);
    }

    renderedCallback() {
        super.renderedCallback();

        let option;

        let common = {
            legend: {
                data: this.legendData,
                // type: 'scroll',
                // show: false,
                ...(this.legendSelected && {
                    selected: this.legendSelected
                })
            },
            selector: false,
            tooltip: {},
            xAxis: {
                data: this.xAxisData,
                name: this.xAxisLegend,
                axisLine: { onZero: true },
                splitLine: { show: false },
                splitArea: { show: false },
                axisLabel: {
                    rotate: 90
                }
            },
            yAxis: {},
            grid: {
                bottom: 100
            },
            title: {
                text: this.title
            }
        };

        if (this.graphDataSeries === undefined) {
            option = {
                ...common,
                series: this.graphData
            };
        } else {
            option = {
                baseOption: {
                    ...common,
                    timeline: this.timeline ? this.timeline : { show: false },
                    brush: this.brush,
                    toolbox: this.toolbox,
                    dataZoom: this.configZoom,
                    series: this.graphDataSeries.map(() => ({ type: 'bar' }))
                },
                options: this.graphDataSeries
            };
        }
        this.option = option;
    }

    loadCallback() {
        this.echart.setOption(this.option);
        this.echart.dispatchAction({ ...this.brushAction });
        this.echart.on('click', this.clickChart);
    }
}
