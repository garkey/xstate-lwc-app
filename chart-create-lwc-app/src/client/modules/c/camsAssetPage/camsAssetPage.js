import { LightningElement } from 'lwc';
import { trimProps, loadSelectOptions, derivedCamsFields } from 'c/utils';
import { camsElasticSearchData } from 'lightning/platformResourceLoader';

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

const pkeys = Object.keys(pmodels);

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

export default class CamsAssetPage extends LightningElement {
    queries = {
        inputs: [],
        sources: [],
    };
    isLoading = false;
    assetdata = [];
    assetcolumns = [
        {
            label: 'Serial Number',
            fieldName: 'serialNumber',
        },
        {
            label: 'Product',
            fieldName: '_product',
            type: '_product',
        },
        {
            label: 'Calibration Interval',
            fieldName: 'calibrationIntervalAndUnits',
            queryField: 'date',
        },
        {
            label: 'Calibration Type',
            fieldName: 'calibrationType',
            querySource: 'servicecentersservices',
            queryField: 'select',
            queryFn: (obj) => ({
                value: obj.id,
                label: obj.codeCategoryDescription,
            }),
        },
    ].map((e) => ({ ...e, hideDefaultActions: true }));
    propkeys = this.assetcolumns.map((e) => e.fieldName);
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

    connectedCallback() {
        const urlvars = this.parseUrlSearch();
        const cams_params = this.normalizeUrlParams(urlvars);
        console.log('cams_params', cams_params);

        this.queryES(cams_params);
        this.loadOptions();
    }

    async loadOptions() {
        this.queries = {
            ...this.queries,
            sources: {
                servicecentersservices: await loadSelectOptions(
                    'service-center-services/distinct-code-category?countryCode=GB',
                ),
                debug: await loadSelectOptions('assets/124401'),
            },
        };
    }

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

    reconcileQueries(params) {
        this.queries = {
            ...this.queries,
            inputs: params.query,
        };
    }

    preAjaxRequestFunc(e) {
        console.log('preAjaxRequestFunc >>>');
        console.log('this.queries', this.queries);
        console.log('e.detail', e.detail);
        this.queries = { ...this.queries, ...e.detail };
    }

    ajaxRequestFunc(e) {
        console.log('ajaxRequestFunc >>>');

        console.log('e.detail', e.detail);
    }

    async queryES(params) {
        console.log('>>>>>>>>>>> queryES >>>>>>>>>>>>>>>>');
        console.log('params', params);
        this.reconcileQueries(params);
        console.log('pkeys', pkeys);
        console.log('this.assetcolumns', this.assetcolumns);
        console.log('this.propkeys', this.propkeys);

        console.log('TODO: scrub params here!!!');
        // this.cams_params = trimProps(this.propkeys, params);
        this.cams_params = params;
        console.log('this.cams_params', this.cams_params);

        const esp = convertToESParams(this.cams_params);
        // const es_params = appendES(this.es_params, esp);
        // console.log('es_params', es_params);
        console.log('esp', esp);

        const rawdata = await camsElasticSearchData({
            viewName: 'assets',
            searchString: JSON.stringify(esp, null, 2),
        }).then((d) => {
            return JSON.parse(d);
        });
        const temp = rawdata.response.results
            .map(derivedCamsFields)
            .slice(0, 5);
        console.log('temp', temp);

        this.assetdata = temp;
        // this.assetdata = rawdata.response.results.map(derivedCamsFields);
        this.totalResults = rawdata.response.totalResults;

        console.log('this.assetdata', this.assetdata);
        console.log('this.totalResults', this.totalResults);
        console.log('TODO: return scrubbed params here');

        console.log('>>>>>>>>>>> end queryES >>>>>>>>>>>>>>>>');
    }

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

    onEditRow = (e) => {
        console.log('onEditRow.e', e);
    };
}
