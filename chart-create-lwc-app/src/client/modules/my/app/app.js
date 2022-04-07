import { LightningElement } from 'lwc';
import { color_swatch, derivedCamsFields } from 'c/utils';
import qs from 'qs';
import labelRequired from '@salesforce/label/c.lightning_LightningControl_required';

import DCX_Asset_Service_Date from '@salesforce/label/c.DCX_Asset_Service_Date';
import DCX_Asset_Service_Order_Number from '@salesforce/label/c.DCX_Asset_Service_Order_Number';
import DCX_Cart_Service_Type from '@salesforce/label/c.DCX_Cart_Service_Type';
import DCX_AssetGrid_AssetActions_SH_Received_Condition from '@salesforce/label/c.DCX_AssetGrid_AssetActions_SH_Received_Condition';
import DCX_Asset_Service_Returned_Condition from '@salesforce/label/c.DCX_Asset_Service_Returned_Condition';
import DCX_AuthHome_CalibrationDue from '@salesforce/label/c.DCX_AuthHome_CalibrationDue';
import DCX_Asset_Service_Returned_Documents from '@salesforce/label/c.DCX_Asset_Service_Returned_Documents';
import { getOrgData, postOrgData, templocdata } from './tempdata';

import { camsElasticSearchData } from 'lightning/platformResourceLoader';
import { loadSelectOptions } from 'c/utils';

const x_axis_points = ['fee', 'fi', 'fo', 'fum'];
const barGraph1_data = [
    { name: 'bar2', markLine: { data: [{ yAxis: 30, name: 'test' }] } },
    { name: 'bar1', markLine: { data: [{ yAxis: 20, name: 'test' }] } },
    { name: 'bar3' },
].map((item) => {
    return {
        type: 'bar',
        stack: 'one',
        emphasis: {
            // focus: 'self',
            itemStyle: {
                // shadowBlur: 200,
                // shadowColor: 'rgba(255,0,0,1)',
                borderColor: 'rgba(255,0,0,1)',
            },
        },
        ...item,
    };
});

const urlpToESQuery = {
    q: 'query',
    s: 'sorts',
};
const esQueryToUrlp = Object.fromEntries(
    Object.entries(urlpToESQuery).reverse(),
);

const pmodels = {
    query: (field, value) => ({
        globalSearch: false,
        search: value,
        searchFields: Array.isArray(field) ? field : [field],
    }),
    sorts: (field, value) => ({
        field,
        order: value,
    }),
};

const convertToESParams = (conf) => {
    const p = Object.entries(conf);
    // http://localhost:3001/?q.serialNumber=1234&q.model_name=11&s.model_name=asc&global=true
    return Object.fromEntries(
        p.map(([h, v]) => {
            const r = Object.entries(v).map((g) => {
                const t = pmodels[h];
                return t && t(g[0], g[1]);
            });
            return r ? [h, r] : [];
        }),
    );
};

const appendES = (params, { filters, facets, query, sorts }) => {
    const u = { filters, facets, query, sorts };
    const f = Object.entries(u).map(([k, v]) => {
        return v ? [k, params[k].concat(v)] : [k, params[k]];
    });
    return Object.fromEntries(f);
};

export default class App extends LightningElement {
    isLoading = false;
    dzChecked = false;
    tlChecked = false;
    bChecked = false;
    selectedData = '';
    noshowimplemented = false;

    legend_data = color_swatch.map((s) => ({ label: s[1], value: s[0] }));
    legend_value = 1;

    // barGraph1_data
    barGraph1 = {
        graphData: barGraph1_data.map((e) => ({
            ...e,
            data: x_axis_points.map(() => Math.round(Math.random() * 40)),
        })),
        graphDataSeries: barGraph1_data.map((e) => ({
            ...e,
            series: [
                {
                    data: x_axis_points.map(() =>
                        Math.round(Math.random() * 40),
                    ),
                },
            ],
        })),
        x_axis_data: x_axis_points,
        // uncomment below to see programatic selection of named graphData
        // legend_selected: { bar1: false, bar2: false },
        legend_selected: {},
        clickFunction: (evt) => {
            this.selectedData = `${evt.name} : ${evt.value}`;
        },
        timeline: {
            axisType: 'category',
            data: ['2002-01-01', '2003-01-01', '2004-01-01'],
            label: {
                formatter: function (s) {
                    return new Date(s).getFullYear();
                },
            },
        },
        timelineBar: {
            axisType: 'category',
            data: ['Jan', 'Feb'],
        },
        brushAction: {
            type: 'brush',
            areas: [
                {
                    brushType: 'lineX',
                    coordRange: [2, 3],
                    xAxisIndex: 0,
                },
            ],
        },
        dataZoom: [
            {
                type: 'slider',
                show: true,
                start: 100,
                end: 0,
                handleSize: 8,
            },
            {
                type: 'inside',
                start: 0,
                end: 100,
            },
            {
                type: 'slider',
                show: true,
                yAxisIndex: 0,
                filterMode: 'empty',
                width: 12,
                height: '70%',
                handleSize: 8,
                showDataShadow: false,
                left: '95%',
            },
        ],
        toolbox: {
            feature: {
                dataZoom: {
                    yAxisIndex: false,
                },
                brush: {
                    type: ['lineX', 'clear'],
                },
            },
        },
        brush: {
            xAxisIndex: 'all',
            brushLink: 'all',
            outOfBrush: {
                colorAlpha: 0.1,
            },
        },
    };

    pieGraph1 = {
        graphData: [
            { value: 1048, name: 'test0' },
            { value: 735, name: 'test1' },
            { value: 580, name: 'test2' },
            { value: 484, name: 'test3' },
            { value: 300, name: 'test4' },
        ],
        graphDataSeries: [
            {
                title: { text: '2001' },
                series: [
                    {
                        data: [
                            { value: 1048, name: 'test1' },
                            { value: 735, name: 'test2' },
                            { value: 580, name: 'test3' },
                            { value: 484, name: 'test4' },
                            { value: 300, name: 'test5' },
                        ],
                    },
                ],
            },
            {
                title: { text: '2002' },
                series: [
                    {
                        data: [
                            { value: 10, name: 'test1' },
                            { value: 73, name: 'test2' },
                            { value: 58, name: 'test3' },
                            { value: 48, name: 'test4' },
                            { value: 30, name: 'test5' },
                        ],
                    },
                ],
            },
        ],
        label: {
            rich: {
                title: {
                    color: 'blue',
                    align: 'center',
                },
            },
            formatter: '{b}: {@2012} ({d}%)',
        },
        timeline: {
            axisType: 'category',
            data: ['2002-01-01', '2003-01-01'],
            label: {
                formatter: function (s) {
                    return new Date(s).getFullYear();
                },
            },
        },
        clickChart: (e) => {
            console.log(e);
        },
        clickFunction: (evt) => {
            console.log(evt);
        },
    };

    datatable1 = {
        initialized: false,
        data: [],
        columns: [
            { label: 'Label', fieldName: 'name' },
            { label: 'Website', fieldName: 'website', type: 'url' },
            { label: 'Phone', fieldName: 'phone', type: 'phone' },
            { label: 'Balance', fieldName: 'amount', type: 'currency' },
            { label: 'CloseAt', fieldName: 'closeAt', type: 'date' },
        ],
    };

    byData1 = {
        byCallback: (v) => {
            console.log('v', v);
            console.log('v.target.value', v.target.value);
            console.log('this.barGraph1.graphData', this.barGraph1.graphData);
        },
    };

    byFilter1 = {
        initialized: false,
        iteration: 0,
        graphData: [],
        sortby: undefined,
        filter: 'Model number',
        // filter: 'Location',
        targetData: 'Health',
        // targetData: 'Borrowable',
        series: {
            encode: [],
        },
        filterOptions: [
            {
                text: 'Model Number',
                value: 'Model number',
            },
            {
                text: 'Location',
                value: 'Location',
            },
        ],
        targetDataOptions: [
            {
                text: 'Asset Health',
                value: 'Health',
            },
            {
                text: 'Borrowable Assets',
                value: 'Borrowable',
            },
        ],
        handleSort: (evt) => {
            this.fetchMockBarChart({
                filters: this.byFilter1.filter,
                targetData: this.byFilter1.targetData,
                sort: evt.detail,
            });
        },
        handleFilter: (evt) => {
            this.byFilter1.filter = evt.detail;
            this.fetchMockBarChart({
                filters: this.byFilter1.filter,
                targetData: this.byFilter1.targetData,
            });
        },
        handleTargetData: (evt) => {
            this.byFilter1.targetData = evt.detail;
            this.fetchMockBarChart({
                filters: this.byFilter1.filter,
                targetData: this.byFilter1.targetData,
            });
        },
    };

    guage1 = {
        graphData: [
            {
                value: 20,
                name: 'Perfect',
                title: {
                    offsetCenter: ['0%', '-30%'],
                },
                detail: {
                    offsetCenter: ['0%', '-20%'],
                },
            },
            {
                value: 40,
                name: 'Good',
                title: {
                    offsetCenter: ['0%', '0%'],
                },
                detail: {
                    offsetCenter: ['0%', '10%'],
                },
            },
            {
                value: 60,
                name: 'Commonly',
                title: {
                    offsetCenter: ['0%', '30%'],
                },
                detail: {
                    offsetCenter: ['0%', '40%'],
                },
            },
        ],
        colorSeries: [
            [0.3, 'green'],
            [0.7, 'yellow'],
            [1, 'red'],
        ],
    };

    slidedate1 = {
        data: [
            {
                'Model Number': 'DELL',
                'Project name': 'Cobal enginerring',
                'Last used on': '8/19/2020',
                'Last calibration date': '',
                'Calibration interval (months)': 12,
                'Calibration due date': '6/16/2021',
                'Last reported condition': '',
                'Calibration type': '',
                'Calibration provider': '',
                'Use provider calibration type': 'FALSE',
                'Use provider calibration schedule': 'FALSE',
                'Inventory date': '9/30/2019',
                'Last connected': '9/9/2020 15:44',
            },
            {
                'Model Number': 'A98734',
                'Project name': 'Cobal enginerring',
                'Last used on': '5/2/2019',
                'Last calibration date': '2/21/2018',
                'Calibration interval (months)': 19,
                'Calibration due date': '12/28/2021',
                'Last reported condition': 'New or refurbished',
                'Calibration type': 'Calibration with uncertainties',
                'Calibration provider': 'Keysight technologies Inc.',
                'Use provider calibration type': 'TRUE',
                'Use provider calibration schedule': 'TRUE',
                'Inventory date': '2/26/2018',
                'Last connected': '',
            },
            {
                'Model Number': 'N34567A',
                'Project name': '',
                'Last used on': '7/23/2018',
                'Last calibration date': '',
                'Calibration interval (months)': 0,
                'Calibration due date': '',
                'Last reported condition': '',
                'Calibration type': '',
                'Calibration provider': '',
                'Use provider calibration type': 'FALSE',
                'Use provider calibration schedule': 'FALSE',
                'Inventory date': '',
                'Last connected': '6/8/2020 6:28',
            },
            {
                'Model Number': 'MSO09404A',
                'Project name': 'Cobal enginerring',
                'Last used on': '8/24/2020',
                'Last calibration date': '',
                'Calibration interval (months)': 0,
                'Calibration due date': '10/16/2021',
                'Last reported condition': '',
                'Calibration type': '',
                'Calibration provider': '',
                'Use provider calibration type': 'FALSE',
                'Use provider calibration schedule': 'FALSE',
                'Inventory date': '9/30/2019',
                'Last connected': '8/25/2020 4:35',
            },
            {
                'Model Number': 12342,
                'Project name': 'FourthProject',
                'Last used on': '3/21/2018',
                'Last calibration date': '2/21/2018',
                'Calibration interval (months)': 0,
                'Calibration due date': '12/15/2021',
                'Last reported condition': 'Compliant extended cal',
                'Calibration type': 'Accredited calibration',
                'Calibration provider': 'Keysight Technologies Inc.',
                'Use provider calibration type': 'FALSE',
                'Use provider calibration schedule': 'FALSE',
                'Inventory date': '11/11/2017',
                'Last connected': '7/1/2019 3:00',
            },
            {
                'Model Number': 12342,
                'Project name': 'Cobal enginerring',
                'Last used on': '11/26/2019',
                'Last calibration date': '',
                'Calibration interval (months)': 0,
                'Calibration due date': '10/16/2021',
                'Last reported condition': 'Compliant',
                'Calibration type': '',
                'Calibration provider': 'Keysight Technologies Inc.',
                'Use provider calibration type': 'FALSE',
                'Use provider calibration schedule': 'FALSE',
                'Inventory date': '',
                'Last connected': '11/26/2019 0:21',
            },
            {
                'Model Number': 'PLUM-1',
                'Project name': '',
                'Last used on': '11/14/2019',
                'Last calibration date': '2/23/2018',
                'Calibration interval (months)': 0,
                'Calibration due date': '10/18/2021',
                'Last reported condition': '',
                'Calibration type': 'Accredited calibration',
                'Calibration provider': '',
                'Use provider calibration type': 'FALSE',
                'Use provider calibration schedule': 'FALSE',
                'Inventory date': '',
                'Last connected': '11/14/2019 1:27',
            },
            {
                'Model Number': 'Soumya-PC',
                'Project name': '',
                'Last used on': '3/10/2020',
                'Last calibration date': '',
                'Calibration interval (months)': 0,
                'Calibration due date': '10/31/2021',
                'Last reported condition': 'Compliant',
                'Calibration type': '',
                'Calibration provider': '',
                'Use provider calibration type': 'FALSE',
                'Use provider calibration schedule': 'FALSE',
                'Inventory date': '9/30/2019',
                'Last connected': '3/10/2020 14:58',
            },
            {
                'Model Number': 'Laptop',
                'Project name': '',
                'Last used on': '',
                'Last calibration date': '',
                'Calibration interval (months)': 0,
                'Calibration due date': '12/02/2021',
                'Last reported condition': '',
                'Calibration type': '',
                'Calibration provider': 'Keysight Technologies Inc.',
                'Use provider calibration type': 'FALSE',
                'Use provider calibration schedule': 'FALSE',
                'Inventory date': '9/30/2019',
                'Last connected': '6/12/2020 1:43',
            },
            {
                'Model Number': '3458A',
                'Project name': '',
                'Last used on': '11/12/2020',
                'Last calibration date': '',
                'Calibration interval (months)': 0,
                'Calibration due date': '11/23/2021',
                'Last reported condition': 'Compliant',
                'Calibration type': '17025 Calibration',
                'Calibration provider': 'Keysight Technologies Inc.',
                'Use provider calibration type': 'FALSE',
                'Use provider calibration schedule': 'FALSE',
                'Inventory date': '2/22/2018',
                'Last connected': '11/12/2020 12:43',
            },
            {
                'Model Number': '20S=STEWART',
                'Project name': '',
                'Last used on': '5/26/2020',
                'Last calibration date': '2/26/2018',
                'Calibration interval (months)': 0,
                'Calibration due date': '12/14/2021',
                'Last reported condition': '',
                'Calibration type': '',
                'Calibration provider': '',
                'Use provider calibration type': 'FALSE',
                'Use provider calibration schedule': 'FALSE',
                'Inventory date': '',
                'Last connected': '6/8/2020 6:28',
            },
            {
                'Model Number': '34401A',
                'Project name':
                    '~!@#$%^&*()_+{}|:"<>?`1234567890-=[]\\;\',./qwerty uiopa sdfghjkl zxcvbnm QWERTY UIOPA SDFGHJKL ZXCVBNM1',
                'Last used on': '9/24/2020',
                'Last calibration date': '10/29/2019',
                'Calibration interval (months)': 75,
                'Calibration due date': '9/28/2021',
                'Last reported condition': '',
                'Calibration type': '',
                'Calibration provider': '',
                'Use provider calibration type': 'FALSE',
                'Use provider calibration schedule': 'FALSE',
                'Inventory date': '2/23/2018',
                'Last connected': '',
            },
            {
                'Model Number': 435,
                'Project name': '',
                'Last used on': '',
                'Last calibration date': '2/26/2018',
                'Calibration interval (months)': 0,
                'Calibration due date': '10/29/2021',
                'Last reported condition': '',
                'Calibration type': 'Standard',
                'Calibration provider': 'Keysight Technologies Inc.',
                'Use provider calibration type': 'FALSE',
                'Use provider calibration schedule': 'FALSE',
                'Inventory date': '9/30/2019',
                'Last connected': '',
            },
            {
                'Model Number': 4543353635,
                'Project name': '',
                'Last used on': '1/5/2021',
                'Last calibration date': '2/26/2018',
                'Calibration interval (months)': 0,
                'Calibration due date': '',
                'Last reported condition': '',
                'Calibration type': '',
                'Calibration provider': '',
                'Use provider calibration type': 'TRUE',
                'Use provider calibration schedule': 'FALSE',
                'Inventory date': '9/30/2019',
                'Last connected': '11/15/2019 15:08',
            },
            {
                'Model Number': 219193983,
                'Project name': 'ryan laptop',
                'Last used on': '',
                'Last calibration date': '1/1/2018',
                'Calibration interval (months)': 0,
                'Calibration due date': '9/31/2021',
                'Last reported condition': 'Compliant',
                'Calibration type': '',
                'Calibration provider': '',
                'Use provider calibration type': 'FALSE',
                'Use provider calibration schedule': 'FALSE',
                'Inventory date': '',
                'Last connected': '',
            },
            {
                'Model Number': 'R1605-80001',
                'Project name': '',
                'Last used on': '3/6/2018',
                'Last calibration date': '2/28/2018',
                'Calibration interval (months)': 0,
                'Calibration due date': '11/02/2021',
                'Last reported condition': '',
                'Calibration type': '17025 Calibration',
                'Calibration provider': '',
                'Use provider calibration type': 'FALSE',
                'Use provider calibration schedule': 'FALSE',
                'Inventory date': '9/30/2019',
                'Last connected': '4/20/2020 7:04',
            },
            {
                'Model Number': 44,
                'Project name': 'testing project3',
                'Last used on': '',
                'Last calibration date': '3/2/2018',
                'Calibration interval (months)': 0,
                'Calibration due date': '11/19/2021',
                'Last reported condition': '',
                'Calibration type': '',
                'Calibration provider': '',
                'Use provider calibration type': 'FALSE',
                'Use provider calibration schedule': 'FALSE',
                'Inventory date': '10/29/2019',
                'Last connected': '',
            },
            {
                'Model Number': 23,
                'Project name': 'testing project3',
                'Last used on': '11/15/2019',
                'Last calibration date': '10/29/2019',
                'Calibration interval (months)': 0,
                'Calibration due date': '10/09/2021',
                'Last reported condition': 'Compliant',
                'Calibration type': '',
                'Calibration provider': '',
                'Use provider calibration type': 'FALSE',
                'Use provider calibration schedule': 'FALSE',
                'Inventory date': '2/26/2018',
                'Last connected': '11/13/2019 23:56',
            },
            {
                'Model Number': 'MN 556666',
                'Project name': 'PN 00567',
                'Last used on': '2/22/2018',
                'Last calibration date': '1/9/2019',
                'Calibration interval (months)': 88,
                'Calibration due date': '12/27/2021',
                'Last reported condition': '',
                'Calibration type': '17025 Calibration',
                'Calibration provider': 'Keysight Technologies Inc.',
                'Use provider calibration type': 'FALSE',
                'Use provider calibration schedule': 'FALSE',
                'Inventory date': '2/26/2018',
                'Last connected': '2/25/2020 7:15',
            },
            {
                'Model Number': 'MN 4556',
                'Project name': '',
                'Last used on': '',
                'Last calibration date': '',
                'Calibration interval (months)': 0,
                'Calibration due date': '',
                'Last reported condition': '',
                'Calibration type': '17025 Calibration',
                'Calibration provider': 'Keysight Technologies Inc.',
                'Use provider calibration type': 'FALSE',
                'Use provider calibration schedule': 'FALSE',
                'Inventory date': '2/27/2018',
                'Last connected': '',
            },
            {
                'Model Number': 9999999,
                'Project name': '',
                'Last used on': '2/23/2018',
                'Last calibration date': '10/29/2019',
                'Calibration interval (months)': 3,
                'Calibration due date': '12/23/2021',
                'Last reported condition': 'Compliant',
                'Calibration type': '',
                'Calibration provider': 'Keysight Technologies Inc.',
                'Use provider calibration type': 'TRUE',
                'Use provider calibration schedule': 'TRUE',
                'Inventory date': '2/28/2018',
                'Last connected': '',
            },
            {
                'Model Number': 'MSOS804A',
                'Project name': '5G',
                'Last used on': '5/11/2018',
                'Last calibration date': '10/29/2019',
                'Calibration interval (months)': 0,
                'Calibration due date': '7/31/2021',
                'Last reported condition': 'New or refurbished',
                'Calibration type': '17025 Calibration',
                'Calibration provider': 'Keysight Technologies Inc.',
                'Use provider calibration type': 'FALSE',
                'Use provider calibration schedule': 'FALSE',
                'Inventory date': '3/2/2018',
                'Last connected': '7/1/2019 2:52',
            },
            {
                'Model Number': 'MSOS804A',
                'Project name': 'testing project3',
                'Last used on': '4/20/2020',
                'Last calibration date': '',
                'Calibration interval (months)': 0,
                'Calibration due date': '10/31/2021',
                'Last reported condition': '',
                'Calibration type': '',
                'Calibration provider': 'Keysight Technologies Inc.',
                'Use provider calibration type': 'FALSE',
                'Use provider calibration schedule': 'FALSE',
                'Inventory date': '10/29/2019',
                'Last connected': '',
            },
            {
                'Model Number': 4545454,
                'Project name': '',
                'Last used on': '',
                'Last calibration date': '',
                'Calibration interval (months)': 0,
                'Calibration due date': '',
                'Last reported condition': 'Compliant',
                'Calibration type': 'Standard',
                'Calibration provider': '',
                'Use provider calibration type': 'FALSE',
                'Use provider calibration schedule': 'FALSE',
                'Inventory date': '1/9/2019',
                'Last connected': '12/5/2019 23:30',
            },
            {
                'Model Number': 99999,
                'Project name': 'ryan laptop',
                'Last used on': '11/13/2019',
                'Last calibration date': '',
                'Calibration interval (months)': 0,
                'Calibration due date': '11/17/2021',
                'Last reported condition': 'Compliant',
                'Calibration type': '17025 Calibration',
                'Calibration provider': '',
                'Use provider calibration type': 'FALSE',
                'Use provider calibration schedule': 'FALSE',
                'Inventory date': '',
                'Last connected': '',
            },
            {
                'Model Number': 'test12345',
                'Project name': 'Health Group',
                'Last used on': '2/25/2020',
                'Last calibration date': '11/29/2019',
                'Calibration interval (months)': 34,
                'Calibration due date': '11/29/2021',
                'Last reported condition': '',
                'Calibration type': '17025 Calibration',
                'Calibration provider': '',
                'Use provider calibration type': 'FALSE',
                'Use provider calibration schedule': 'FALSE',
                'Inventory date': '10/29/2019',
                'Last connected': '',
            },
            {
                'Model Number': 'N96789',
                'Project name': '',
                'Last used on': '2/26/2018',
                'Last calibration date': '2/26/2018',
                'Calibration interval (months)': 0,
                'Calibration due date': '11/26/2021',
                'Last reported condition': '',
                'Calibration type': '',
                'Calibration provider': '',
                'Use provider calibration type': 'TRUE',
                'Use provider calibration schedule': 'FALSE',
                'Inventory date': '10/29/2019',
                'Last connected': '',
            },
            {
                'Model Number': 'B56897A',
                'Project name': '5G',
                'Last used on': '2/26/2018',
                'Last calibration date': '2/26/2018',
                'Calibration interval (months)': 0,
                'Calibration due date': '12/26/2021',
                'Last reported condition': '',
                'Calibration type': '17025 Calibration',
                'Calibration provider': 'Keysight Technologies Inc.',
                'Use provider calibration type': 'FALSE',
                'Use provider calibration schedule': 'TRUE',
                'Inventory date': '',
                'Last connected': '7/8/2019 23:15',
            },
            {
                'Model Number': '54852B',
                'Project name': '5G',
                'Last used on': '2/27/2018',
                'Last calibration date': '12/31/2018',
                'Calibration interval (months)': 12,
                'Calibration due date': '12/31/2021',
                'Last reported condition': '',
                'Calibration type': '',
                'Calibration provider': 'Keysight Technologies Inc.',
                'Use provider calibration type': 'FALSE',
                'Use provider calibration schedule': 'FALSE',
                'Inventory date': '',
                'Last connected': '1/16/2020 3:14',
            },
            {
                'Model Number': 99999,
                'Project name': '5G',
                'Last used on': '2/28/2018',
                'Last calibration date': '7/30/2018',
                'Calibration interval (months)': 0,
                'Calibration due date': '10/30/2021',
                'Last reported condition': 'Compliant',
                'Calibration type': '',
                'Calibration provider': '',
                'Use provider calibration type': 'TRUE',
                'Use provider calibration schedule': 'FALSE',
                'Inventory date': '6/14/2019',
                'Last connected': '',
            },
            {
                'Model Number': '34401A',
                'Project name': '',
                'Last used on': '3/2/2018',
                'Last calibration date': '3/2/2018',
                'Calibration interval (months)': 0,
                'Calibration due date': '9/2/2021',
                'Last reported condition': '',
                'Calibration type': 'Custom calibration',
                'Calibration provider': '',
                'Use provider calibration type': 'TRUE',
                'Use provider calibration schedule': 'FALSE',
                'Inventory date': '',
                'Last connected': '5/20/2019 4:32',
            },
            {
                'Model Number': 454546644,
                'Project name': 'Health Group',
                'Last used on': '10/29/2019',
                'Last calibration date': '11/29/2019',
                'Calibration interval (months)': 34,
                'Calibration due date': '11/29/2021',
                'Last reported condition': 'Unknown',
                'Calibration type': '',
                'Calibration provider': 'Keysight Technologies Inc.',
                'Use provider calibration type': 'FALSE',
                'Use provider calibration schedule': 'TRUE',
                'Inventory date': '10/29/2019',
                'Last connected': '',
            },
            {
                'Model Number': 'MN 67676',
                'Project name': 'Health Group',
                'Last used on': '1/9/2019',
                'Last calibration date': '1/8/2019',
                'Calibration interval (months)': 0,
                'Calibration due date': '12/8/2021',
                'Last reported condition': 'Compliant',
                'Calibration type': 'Accredited calibration',
                'Calibration provider': '',
                'Use provider calibration type': 'FALSE',
                'Use provider calibration schedule': 'FALSE',
                'Inventory date': '',
                'Last connected': '',
            },
            {
                'Model Number': 'Test Rack',
                'Project name': 'Health Group',
                'Last used on': '10/29/2019',
                'Last calibration date': '',
                'Calibration interval (months)': 0,
                'Calibration due date': '11/29/2021',
                'Last reported condition': 'Compliant',
                'Calibration type': '',
                'Calibration provider': '',
                'Use provider calibration type': 'FALSE',
                'Use provider calibration schedule': 'FALSE',
                'Inventory date': '',
                'Last connected': '',
            },
        ],
    };

    servicehistorydata = {
        data: [
            {
                factory_cal: 'N',
                serial_no: '3124A00112',
                _id: '11101668',
                factory_cal_interval: 12,
                srv_order_no_lower: '1-7440549555-1',
                srv_due_date: '11/18/2016',
                condition: 'In Tolerance (17025) - In Tolerance (17025)',
                site_name: 'USO-8213;ABERDEEN PROVING;US',
                shipped_condition: 'IN_TOLERANCE_17025',
                product_no: '8720C',
                srv_order_no: '1-7440549555-1',
                partition_key: 68,
                comments: '',
                as_received_condition: 'IN_TOLERANCE_17025',
                id: 11101668,
                cust_asset_no: 'C004163',
                manuf_model_no: '8720C',
                siteid: 300253,
                assetId: 18114459,
                manufacturer: 'Hewlett Packard',
                serial_no_lower: '3124a00112',
                description: 'Network analyzer, 50 MHz to 20 GHz',
                new_shipment: 'N',
                manuf_model_no_lower: '8720c',
                cal_type: 'Keysight Cal + Uncertainties + Guardbanding',
                srv_date: '11/18/2015',
                sfdc_id: '02i2L000005uFQHQA2',
                mod_srv_order_no: '1-7440549555',
                download: [
                    {
                        title: 'Calibration Report',
                        download_url:
                            'https://service.keysight.com/archivews/streamer.aspx?fileId=11C964FC49A6031AD8CDC0EBC4719FDCOTg2MjIzMQ==',
                    },
                ],
            },
            {
                factory_cal: 'N',
                serial_no: '3124A00112',
                _id: '12801919',
                factory_cal_interval: 12,
                srv_order_no_lower: '1-9360516144-1',
                srv_due_date: '11/2/2018',
                condition: 'In Tolerance (17025) - In Tolerance (17025)',
                site_name: 'USO-8213;ABERDEEN PROVING;US',
                shipped_condition: 'IN_TOLERANCE_17025',
                product_no: '8720C',
                srv_order_no: '1-9360516144-1',
                partition_key: 119,
                comments: '',
                as_received_condition: 'IN_TOLERANCE_17025',
                id: 12801919,
                cust_asset_no: 'C004163',
                manuf_model_no: '8720C',
                siteid: 300253,
                assetId: 18114459,
                manufacturer: 'Hewlett Packard',
                serial_no_lower: '3124a00112',
                description: 'Network analyzer, 50 MHz to 20 GHz',
                new_shipment: 'N',
                manuf_model_no_lower: '8720c',
                cal_type: 'Keysight Cal + Uncertainties + Guardbanding',
                srv_date: '11/2/2017',
                sfdc_id: '02i2L000005uFQHQA2',
                mod_srv_order_no: '1-9360516144',
                download: [
                    {
                        title: 'Calibration Report',
                        download_url:
                            'https://service.keysight.com/archivews/streamer.aspx?fileId=E6ABB183F7F40670B2805D7F9B4A8311MTI3MzEzMDY=',
                    },
                ],
            },
        ],
        columns: [
            {
                type: 'editinform',
                label: 'editable?',
                fieldName: 'editable',
                sortedBy: 'editable',
                sortable: true,
                typeAttributes: {
                    rowid: { fieldName: 'id' },
                },
            },
            {
                label: DCX_Asset_Service_Date,
                fieldName: 'srv_date',
                sortedBy: 'srv_date',
                sortable: true,
                // columnKey: 'srv_date'
            },
            {
                label: DCX_Asset_Service_Order_Number,
                fieldName: 'srv_order_no',
                sortedBy: 'srv_order_no',
                sortable: true,
            },
            {
                label: DCX_Cart_Service_Type,
                fieldName: 'cal_type',
                sortedBy: 'cal_type',
                sortable: true,
            },
            {
                label: DCX_AssetGrid_AssetActions_SH_Received_Condition,
                fieldName: 'as_received_condition',
                sortedBy: 'as_received_condition',
                sortable: true,
            },
            {
                label: DCX_Asset_Service_Returned_Condition,
                fieldName: 'shipped_condition',
                sortedBy: 'shipped_condition',
                sortable: true,
            },
            {
                label: DCX_AuthHome_CalibrationDue,
                fieldName: 'srv_due_date',
                sortable: true,
            },
            {
                label: DCX_Asset_Service_Returned_Documents,
                fieldName: 'download',
                sortable: true,
                type: 'download',
            },
        ].map((e, i) => ({ ...e, editable: i % 2, hideDefaultActions: true })),
        onEditRow: (e) => {
            console.log('onEditRow.e', e);
        },
    };

    tree_items = {
        data: getOrgData(),
        handleSave: (e) => {
            if (e.detail.nodeRef.path) {
                const newtree = postOrgData({
                    path: e.detail.nodeRef.path,
                    type: e.detail.type,
                    value: e.detail.value,
                });
                this.tree_items = {
                    ...this.tree_items,
                    data: newtree,
                    timestamp: Date.now(),
                };
                this.template.querySelector('c-tree').items =
                    this.tree_items.data;
            }
        },
    };

    /* 
      for test cases:

      http://localhost:3001/?f.serialNumber=1234&f.model_name=11&s.model_name=dsc&global=true

      {
        "q": {
          "serialNumber": "1234",
          "model_name": "11"
        },
        "s": {
          "model_name": "dsc"
        },
        "global": "true"
      }
      
    */

    parseUrlSearch() {
        const search = window.location.search.substring(1);
        const params = Array.from(new URLSearchParams(search).entries());
        return params.reduce((acc, val) => {
            const [key, v] = val;
            const [c, k] = key.split('.');
            if (k) {
                return { ...acc, [c]: { ...acc[c], [k]: v } };
            }
            return { ...acc, [c]: v };
        }, {});
    }
    /* 
    
    {
      "pageNumber": 1,
      "pageSize": 100,
      "filters": [],
      "facets": [],
      "query": [
        {
          "globalSearch": false,
          "search": "163",
          "searchFields": [
            "serialNumber"
          ]
        },
        {
          "globalSearch": false,
          "search": "basi",
          "searchFields": [
            "assignedLocation_path"
          ]
        }
      ],
      "sorts": [
        {
          "field": "model_number.keyword",
          "order": "ASC"
        },
        {
          "field": "description.keyword",
          "order": "ASC"
        },
        {
          "field": "model_manufacturer_name.keyword",
          "order": "ASC"
        }
      ]
    }
    
    */

    replaceParam(currparams, { filters, facets, query, sorts }) {
        const u = { filters, facets, query, sorts };

        console.log('u', u);
    }

    // this.updateUrlParams({ query: { serialNumber: 'fee' } });
    //
    updateUrlParams({ filters, facets, query, sorts }, push = true) {
        console.log('esQueryToUrlp', esQueryToUrlp);

        const u = { filters, facets, query, sorts };
        console.log('u', u);

        if (push) {
            if (window.history.pushState) {
                const url = new URL(window.location);
                // url.searchParams.set('foo', 'bar');
                //   //prevents browser from storing history with each change:
                //   console.log('window.history.replaceState', window.history.replaceState)
            }
            console.log('push', push);
        } else {
            if (window.history.replaceState) {
                const url = new URL(window.location);

                // const s = [...Object.entries(query), ...Object.entries(sorts)];
                // console.log('s', s)
                console.log('url', url);

                //prevents browser from storing history with each change:
            }
        }
    }

    clearAllParam() {
        return {
            pageNumber: 1,
            pageSize: 100,
            filters: [],
            facets: [],
            query: [],
            sorts: [],
        };
    }

    /* 
      destructured arguments for limited key parameter names
    */

    assetdata = [];
    assetcolumns = [
        {
            label: 'Serial Number',
            fieldName: 'serialNumber',
            sortedBy: 'serialNumber',
            sortable: true,
            // columnKey: 'srv_date'
        },
        {
            label: 'Product',
            fieldName: '_product',
            sortedBy: '_product',
            sortable: true,
            type: '_product',
            // columnKey: 'srv_date'
        },
        {
            label: 'Calibration Interval',
            fieldName: 'calibrationIntervalAndUnits',
            sortedBy: 'calibrationIntervalAndUnits',
            sortable: true,
            queryField: 'calendar',
            // columnKey: 'srv_date'
        },
    ].map((e) => ({ ...e, hideDefaultActions: true }));

    dt = {
        isLoading: false,
    };

    cams_params = {
        pageNumber: 1,
        pageSize: 100,
        filters: [],
        facets: [],
        query: [],
        sorts: [],
    };
    es_params = { ...this.cams_params };
    totalResults = 0;

    normalizeUrlParams(params) {
        return Object.fromEntries(
            Object.entries(params)
                .filter(([k]) => urlpToESQuery[k])
                .map(([k, v]) => {
                    const h = urlpToESQuery[k];
                    return [h, v];
                }),
        );
    }
    /* 
      this is the main side effect function
    */
    async queryES(params) {
        console.log('TODO: scrub params here!!!');

        const rawdata = await camsElasticSearchData({
            viewName: 'assets',
            searchString: JSON.stringify(params, null, 2),
        }).then((d) => {
            return JSON.parse(d);
        });

        this.assetdata = rawdata.response.results.map(derivedCamsFields);
        this.totalResults = rawdata.response.totalResults;

        console.log('this.assetdata', this.assetdata);
        console.log('this.totalResults', this.totalResults);
        console.log('TODO: return scrubbed params here');
    }

    async connectedCallback() {
        this.cams_params = this.normalizeUrlParams(this.parseUrlSearch());
        console.log('this.cams_params', this.cams_params);
        const esp = convertToESParams(this.cams_params);
        this.es_params = appendES(this.es_params, esp);
        console.log('this.es_params', this.es_params);

        this.queryES(this.es_params);

        console.log(
            'loadSelectOptions()',
            await loadSelectOptions(
                'service-center-services/distinct-code-category?countryCode=GB',
            ),
        );

        console.log('assets/124401', await loadSelectOptions('assets/124401'))
        

        // this.updateUrlParams( , false);

        // end dev

        // if (!this.datatable1.initialized) {
        //     this.fetchMockDatatable();
        // }

        // // Do we really need this guard?
        // // https://stackoverflow.com/questions/54874212/can-a-custom-elements-connectedcallback-be-called-more-than-once-before-disc
        // if (!this.byFilter1.initialized) {
        //     this.fetchMockBarChart({
        //         filters: this.byFilter1.filter,
        //         targetData: this.byFilter1.targetData,
        //     });
        // }
    }

    renderedCallback() {
        if (!this.noshowimplemented) {
            this.implementNoShow();
        }
    }

    implementNoShow() {
        this.noshowimplemented = true;
        const search =
            window.location.search && qs.parse(window.location.search.slice(1));

        if (search.onlyshow) {
            const showindex = Number.parseInt(search.onlyshow, 10);
            const childelems = Array.from(this.template.childNodes);
            console.log(
                'root level elements for `onlyshow` query: ',
                childelems,
            );

            childelems.forEach((elem, i) => {
                if (showindex !== i) {
                    elem.style.display = 'none';
                }
            });
        }
    }

    async fetchMockDatatable() {
        const data = await fetch(
            'https://data-faker.herokuapp.com/collection',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                },
                body: JSON.stringify({
                    amountOfRecords: 10,
                    recordMetadata: {
                        name: 'name',
                        email: 'email',
                        website: 'url',
                        amount: 'currency',
                        phone: 'phoneNumber',
                        closeAt: 'dateInFuture',
                    },
                }),
            },
        )
            .then((response) => response.json())
            .catch((err) => {
                throw new Error(err);
            });

        this.datatable1 = { ...this.datatable1, initialized: true, data };
    }

    fetchMockBarChart = async (params) => {
        const q = Object.entries(params)
            .map((p) => `${p[0]}=${p[1]}`)
            .join('&');
        const query = `http://localhost:8081/dcx_mock?${q}`;
        console.log('query', query);

        const data = await fetch(query)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }

                throw new Error('Something went wrong');
            })
            .catch((err) => {
                console.error('Do you need to run the server at mock/server?');
                throw err;
            });

        const keyrow = data[0];

        const colkeys = keyrow.slice(1, keyrow.length);

        let series;
        if (params.sort) {
            const indx = colkeys.indexOf(params.sort);
            const first = colkeys[indx];
            const replaceorder = colkeys.map((e) => ({ x: e }));
            replaceorder.splice(indx, 1);
            series = {
                y: this.byFilter1.filter,
                encode: [{ x: first }].concat(replaceorder),
            };
        } else {
            series = {
                y: this.byFilter1.filter,
                encode: colkeys.map((e) => ({ x: e })),
            };
        }

        if (data) {
            this.byFilter1 = {
                ...this.byFilter1,
                initialized: true,
                iteration: this.byFilter1.iteration + 1,
                graphData: data,
                series,
            };
        }
    };
}
