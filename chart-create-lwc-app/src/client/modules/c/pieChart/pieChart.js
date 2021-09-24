import { api } from 'lwc';
import EchartBase from 'c/echartBase';

export default class PieChart extends EchartBase {
    @api graphData = [];
    @api graphDataSeries;
    @api formatter = '';
    @api xAxisLegend = 'Title';
    @api title = 'Title';
    @api clickChart;
    @api name = '';
    @api label = '';
    @api timeline;

    renderedCallback() {
        super.renderedCallback();

        let option;

        if (this.graphDataSeries !== undefined) {
            option = {
                baseOption: {
                    title: {
                        text: this.title
                    },
                    timeline: this.timeline,
                    series: [
                        {
                            name: this.name,
                            type: 'pie',
                            label: this.label
                        }
                    ]
                },
                options: this.graphDataSeries
            };
        } else {
            option = {
                title: {
                    text: this.title
                    // subtext: '纯属虚构',
                },
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    orient: 'vertical',
                    left: 'left'
                },
                series: [
                    {
                        name: 'Pie Chart Name',
                        type: 'pie',
                        radius: '50%',
                        data: this.graphData,
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            };
        }

        this.option = option;
    }
    loadCallback() {
        this.echart.setOption(this.option);
        if (this.clickChart) this.echart.on('click', this.clickChart);
    }
}
