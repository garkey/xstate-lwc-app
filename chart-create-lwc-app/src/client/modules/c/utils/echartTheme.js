const themes = {
    chalk: {
        color: [
            '#fc97af',
            '#87f7cf',
            '#f7f494',
            '#72ccff',
            '#f7c5a0',
            '#d4a4eb',
            '#d2f5a6',
            '#76f2f2',
            '#293441',
        ],
        backgroundColor: 'rgba(41,52,65,1)',
        textStyle: {},
        title: {
            textStyle: {
                color: '#ffffff',
            },
            subtextStyle: {
                color: '#dddddd',
            },
        },
        line: {
            itemStyle: {
                borderWidth: '4',
            },
            lineStyle: {
                width: '3',
            },
            symbolSize: '0',
            symbol: 'emptyCircle',
            smooth: false,
        },
        radar: {
            itemStyle: {
                borderWidth: '4',
            },
            lineStyle: {
                width: '3',
            },
            symbolSize: '0',
            symbol: 'emptyCircle',
            smooth: false,
        },
        bar: {
            itemStyle: {
                barBorderWidth: 0,
                barBorderColor: '#ccc',
            },
        },
        pie: {
            itemStyle: {
                borderWidth: 0,
                borderColor: '#ccc',
            },
        },
        scatter: {
            itemStyle: {
                borderWidth: 0,
                borderColor: '#ccc',
            },
        },
        boxplot: {
            itemStyle: {
                borderWidth: 0,
                borderColor: '#ccc',
            },
        },
        parallel: {
            itemStyle: {
                borderWidth: 0,
                borderColor: '#ccc',
            },
        },
        sankey: {
            itemStyle: {
                borderWidth: 0,
                borderColor: '#ccc',
            },
        },
        funnel: {
            itemStyle: {
                borderWidth: 0,
                borderColor: '#ccc',
            },
        },
        gauge: {
            itemStyle: {
                borderWidth: 0,
                borderColor: '#ccc',
            },
        },
        candlestick: {
            itemStyle: {
                color: '#fc97af',
                color0: 'transparent',
                borderColor: '#fc97af',
                borderColor0: '#87f7cf',
                borderWidth: '2',
            },
        },
        graph: {
            itemStyle: {
                borderWidth: 0,
                borderColor: '#ccc',
            },
            lineStyle: {
                width: 1,
                color: '#ffffff',
            },
            symbolSize: '0',
            symbol: 'emptyCircle',
            smooth: false,
            color: [
                '#fc97af',
                '#87f7cf',
                '#f7f494',
                '#72ccff',
                '#f7c5a0',
                '#d4a4eb',
                '#d2f5a6',
                '#76f2f2',
                '#293441',
            ],
            label: {
                color: '#cccccc',
            },
        },
        map: {
            itemStyle: {
                areaColor: '#eee',
                borderColor: '#444',
                borderWidth: 0.5,
            },
            label: {
                color: '#000',
            },
            emphasis: {
                itemStyle: {
                    areaColor: 'rgba(255,215,0,0.8)',
                    borderColor: '#444',
                    borderWidth: 1,
                },
                label: {
                    color: 'rgb(100,0,0)',
                },
            },
        },
        geo: {
            itemStyle: {
                areaColor: '#eee',
                borderColor: '#444',
                borderWidth: 0.5,
            },
            label: {
                color: '#000',
            },
            emphasis: {
                itemStyle: {
                    areaColor: 'rgba(255,215,0,0.8)',
                    borderColor: '#444',
                    borderWidth: 1,
                },
                label: {
                    color: 'rgb(100,0,0)',
                },
            },
        },
        categoryAxis: {
            axisLine: {
                show: true,
                lineStyle: {
                    color: '#666666',
                },
            },
            axisTick: {
                show: true,
                lineStyle: {
                    color: '#333333',
                },
            },
            axisLabel: {
                show: true,
                color: '#aaaaaa',
            },
            splitLine: {
                show: false,
                lineStyle: {
                    color: ['#e6e6e6'],
                },
            },
            splitArea: {
                show: false,
                areaStyle: {
                    color: ['rgba(250,250,250,0.05)', 'rgba(200,200,200,0.02)'],
                },
            },
        },
        valueAxis: {
            axisLine: {
                show: false,
                lineStyle: {
                    color: '#6E7079',
                },
            },
            axisTick: {
                show: false,
                lineStyle: {
                    color: '#6E7079',
                },
            },
            axisLabel: {
                show: true,
                color: '#6E7079',
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: ['#E0E6F1'],
                },
            },
            splitArea: {
                show: false,
                areaStyle: {
                    color: ['rgba(250,250,250,0.2)', 'rgba(210,219,238,0.2)'],
                },
            },
        },
        logAxis: {
            axisLine: {
                show: false,
                lineStyle: {
                    color: '#6E7079',
                },
            },
            axisTick: {
                show: false,
                lineStyle: {
                    color: '#6E7079',
                },
            },
            axisLabel: {
                show: true,
                color: '#6E7079',
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: ['#E0E6F1'],
                },
            },
            splitArea: {
                show: false,
                areaStyle: {
                    color: ['rgba(250,250,250,0.2)', 'rgba(210,219,238,0.2)'],
                },
            },
        },
        timeAxis: {
            axisLine: {
                show: true,
                lineStyle: {
                    color: '#6E7079',
                },
            },
            axisTick: {
                show: true,
                lineStyle: {
                    color: '#6E7079',
                },
            },
            axisLabel: {
                show: true,
                color: '#6E7079',
            },
            splitLine: {
                show: false,
                lineStyle: {
                    color: ['#E0E6F1'],
                },
            },
            splitArea: {
                show: false,
                areaStyle: {
                    color: ['rgba(250,250,250,0.2)', 'rgba(210,219,238,0.2)'],
                },
            },
        },
        toolbox: {
            iconStyle: {
                borderColor: '#999',
            },
            emphasis: {
                iconStyle: {
                    borderColor: '#666',
                },
            },
        },
        legend: {
            textStyle: {
                color: '#999999',
            },
        },
        tooltip: {
            axisPointer: {
                lineStyle: {
                    color: '#ccc',
                    width: 1,
                },
                crossStyle: {
                    color: '#ccc',
                    width: 1,
                },
            },
        },
        timeline: {
            lineStyle: {
                color: '#87f7cf',
                width: '1',
            },
            itemStyle: {
                color: '#87f7cf',
                borderWidth: 1,
            },
            controlStyle: {
                color: '#87f7cf',
                borderColor: '#87f7cf',
                borderWidth: '0.5',
            },
            checkpointStyle: {
                color: '#fc97af',
                borderColor: '#fc97af',
            },
            label: {
                color: '#87f7cf',
            },
            emphasis: {
                itemStyle: {
                    color: '#f7f494',
                },
                controlStyle: {
                    color: '#87f7cf',
                    borderColor: '#87f7cf',
                    borderWidth: '0.5',
                },
                label: {
                    color: '#87f7cf',
                },
            },
        },
        visualMap: {
            color: ['#fc97af', '#87f7cf', '#f6efa6'],
        },
        dataZoom: {
            handleSize: 'undefined%',
            textStyle: {},
        },
        markPoint: {
            label: {
                color: '#cccccc',
            },
            emphasis: {
                label: {
                    color: '#cccccc',
                },
            },
        },
    },
    westeros: {
        color: [
            '#516b91',
            '#59c4e6',
            '#edafda',
            '#93b7e3',
            '#a5e7f0',
            '#cbb0e3',
        ],
        backgroundColor: 'rgba(0,0,0,0)',
        textStyle: {},
        title: {
            textStyle: {
                color: '#516b91',
            },
            subtextStyle: {
                color: '#93b7e3',
            },
        },
        line: {
            itemStyle: {
                borderWidth: '2',
            },
            lineStyle: {
                width: '2',
            },
            symbolSize: '6',
            symbol: 'emptyCircle',
            smooth: true,
        },
        radar: {
            itemStyle: {
                borderWidth: '2',
            },
            lineStyle: {
                width: '2',
            },
            symbolSize: '6',
            symbol: 'emptyCircle',
            smooth: true,
        },
        bar: {
            itemStyle: {
                barBorderWidth: 0,
                barBorderColor: '#ccc',
            },
        },
        pie: {
            itemStyle: {
                borderWidth: 0,
                borderColor: '#ccc',
            },
        },
        scatter: {
            itemStyle: {
                borderWidth: 0,
                borderColor: '#ccc',
            },
        },
        boxplot: {
            itemStyle: {
                borderWidth: 0,
                borderColor: '#ccc',
            },
        },
        parallel: {
            itemStyle: {
                borderWidth: 0,
                borderColor: '#ccc',
            },
        },
        sankey: {
            itemStyle: {
                borderWidth: 0,
                borderColor: '#ccc',
            },
        },
        funnel: {
            itemStyle: {
                borderWidth: 0,
                borderColor: '#ccc',
            },
        },
        gauge: {
            itemStyle: {
                borderWidth: 0,
                borderColor: '#ccc',
            },
        },
        candlestick: {
            itemStyle: {
                color: '#edafda',
                color0: 'transparent',
                borderColor: '#d680bc',
                borderColor0: '#8fd3e8',
                borderWidth: '2',
            },
        },
        graph: {
            itemStyle: {
                borderWidth: 0,
                borderColor: '#ccc',
            },
            lineStyle: {
                width: 1,
                color: '#aaaaaa',
            },
            symbolSize: '6',
            symbol: 'emptyCircle',
            smooth: true,
            color: [
                '#516b91',
                '#59c4e6',
                '#edafda',
                '#93b7e3',
                '#a5e7f0',
                '#cbb0e3',
            ],
            label: {
                color: '#eeeeee',
            },
        },
        map: {
            itemStyle: {
                areaColor: '#f3f3f3',
                borderColor: '#516b91',
                borderWidth: 0.5,
            },
            label: {
                color: '#000',
            },
            emphasis: {
                itemStyle: {
                    areaColor: '#a5e7f0',
                    borderColor: '#516b91',
                    borderWidth: 1,
                },
                label: {
                    color: '#516b91',
                },
            },
        },
        geo: {
            itemStyle: {
                areaColor: '#f3f3f3',
                borderColor: '#516b91',
                borderWidth: 0.5,
            },
            label: {
                color: '#000',
            },
            emphasis: {
                itemStyle: {
                    areaColor: '#a5e7f0',
                    borderColor: '#516b91',
                    borderWidth: 1,
                },
                label: {
                    color: '#516b91',
                },
            },
        },
        categoryAxis: {
            axisLine: {
                show: true,
                lineStyle: {
                    color: '#cccccc',
                },
            },
            axisTick: {
                show: false,
                lineStyle: {
                    color: '#333',
                },
            },
            axisLabel: {
                show: true,
                color: '#999999',
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: ['#eeeeee'],
                },
            },
            splitArea: {
                show: false,
                areaStyle: {
                    color: ['rgba(250,250,250,0.05)', 'rgba(200,200,200,0.02)'],
                },
            },
        },
        valueAxis: {
            axisLine: {
                show: true,
                lineStyle: {
                    color: '#cccccc',
                },
            },
            axisTick: {
                show: false,
                lineStyle: {
                    color: '#333',
                },
            },
            axisLabel: {
                show: true,
                color: '#999999',
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: ['#eeeeee'],
                },
            },
            splitArea: {
                show: false,
                areaStyle: {
                    color: ['rgba(250,250,250,0.05)', 'rgba(200,200,200,0.02)'],
                },
            },
        },
        logAxis: {
            axisLine: {
                show: true,
                lineStyle: {
                    color: '#cccccc',
                },
            },
            axisTick: {
                show: false,
                lineStyle: {
                    color: '#333',
                },
            },
            axisLabel: {
                show: true,
                color: '#999999',
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: ['#eeeeee'],
                },
            },
            splitArea: {
                show: false,
                areaStyle: {
                    color: ['rgba(250,250,250,0.05)', 'rgba(200,200,200,0.02)'],
                },
            },
        },
        timeAxis: {
            axisLine: {
                show: true,
                lineStyle: {
                    color: '#cccccc',
                },
            },
            axisTick: {
                show: false,
                lineStyle: {
                    color: '#333',
                },
            },
            axisLabel: {
                show: true,
                color: '#999999',
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: ['#eeeeee'],
                },
            },
            splitArea: {
                show: false,
                areaStyle: {
                    color: ['rgba(250,250,250,0.05)', 'rgba(200,200,200,0.02)'],
                },
            },
        },
        toolbox: {
            iconStyle: {
                borderColor: '#999999',
            },
            emphasis: {
                iconStyle: {
                    borderColor: '#666666',
                },
            },
        },
        legend: {
            textStyle: {
                color: '#999999',
            },
        },
        tooltip: {
            axisPointer: {
                lineStyle: {
                    color: '#cccccc',
                    width: 1,
                },
                crossStyle: {
                    color: '#cccccc',
                    width: 1,
                },
            },
        },
        timeline: {
            lineStyle: {
                color: '#8fd3e8',
                width: 1,
            },
            itemStyle: {
                color: '#8fd3e8',
                borderWidth: 1,
            },
            controlStyle: {
                color: '#8fd3e8',
                borderColor: '#8fd3e8',
                borderWidth: 0.5,
            },
            checkpointStyle: {
                color: '#8fd3e8',
                borderColor: '#8a7ca8',
            },
            label: {
                color: '#8fd3e8',
            },
            emphasis: {
                itemStyle: {
                    color: '#8fd3e8',
                },
                controlStyle: {
                    color: '#8fd3e8',
                    borderColor: '#8fd3e8',
                    borderWidth: 0.5,
                },
                label: {
                    color: '#8fd3e8',
                },
            },
        },
        visualMap: {
            color: ['#516b91', '#59c4e6', '#a5e7f0'],
        },
        dataZoom: {
            backgroundColor: 'rgba(0,0,0,0)',
            dataBackgroundColor: 'rgba(255,255,255,0.3)',
            fillerColor: 'rgba(167,183,204,0.4)',
            handleColor: '#a7b7cc',
            handleSize: '100%',
            textStyle: {
                color: '#333',
            },
        },
        markPoint: {
            label: {
                color: '#eeeeee',
            },
            emphasis: {
                label: {
                    color: '#eeeeee',
                },
            },
        },
    },
};

const [default_theme, second_theme] = Object.entries(themes);
const selected_theme = 'westeros';

// tuple:
export const color_swatch = themes[selected_theme].color.map((c, i) => [
    c,
    `colorname_${i}`,
]);

export const themesUtils = {
    color_swatch,

    selected_theme,

    default_theme,

    second_theme,
};
