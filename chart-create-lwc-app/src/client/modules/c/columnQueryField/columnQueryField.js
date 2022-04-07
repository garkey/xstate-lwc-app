import { LightningElement, api, track } from 'lwc';
import input_date from './input_date.html';
import select from './select.html';
import defaulthtml from './columnQueryField.html';

export default class ColumnQueryField extends LightningElement {
    @api queryField;
    @api querySource;
    @api queryFn;
    @track _queries = {};

    templates = {
        date: input_date,
        select,
    };

    @api set queries(v) {
        this._queries = v;
    }

    get queries() {
        return this._queries;
    }

    get options() {
        if (this.queries.sources && this.querySource) {
            return this.queryFn
                ? this.queries.sources[this.querySource].map(this.queryFn)
                : this.queries.sources[this.querySource];
        }
        console.error('expected a source for a select dropdown');
        return [];
    }

    handleChange() {
        this.dispatchEvent(
            new CustomEvent('ajaxrequest', {
                detail: true,
                bubbles: true,
                composed: true,
            }),
        );
    }

    handleInput() {}

    render() {
        return this.queryField ? this.templates[this.queryField] : defaulthtml;
    }
}
