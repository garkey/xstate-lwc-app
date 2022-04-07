import { LightningElement, api, track } from 'lwc';
import input_date from './input_date.html';
import select from './select.html';
import defaulthtml from './columnQueryField.html';

export default class ColumnQueryField extends LightningElement {
    @api fieldName;
    @api queryField;
    @api querySource;
    @api queryFn;
    @track _queries = {};

    templates = {
        date: input_date,
        select,
    };

    @api set queries(v) {
        // console.log('v', JSON.parse(JSON.stringify(v)));
        // console.log('fieldName', this.fieldName);

        this._queries = v;
    }

    get queries() {
        return this._queries;
    }

    get options() {
        if (this.queries.sources && this.queries.sources[this.querySource]) {
            return this.queryFn
                ? this.queries.sources[this.querySource].map(this.queryFn)
                : this.queries.sources[this.querySource];
        }

        return [];
    }

    get value() {
        return this.queries.inputs[this.fieldName] || '';
    }

    dispatchAjaxRequest(detail) {
        this.dispatchEvent(
            new CustomEvent('ajaxrequest', {
                detail,
                bubbles: true,
                composed: true,
            }),
        );
    }

    handleChange(e) {
        console.log('handleChange: ', e);
    }

    handleInput(e) {
        console.log('handleInput: ', e.target.value);
        const detail = { inputs: { [this.fieldName]: e.target.value } };
        this.dispatchAjaxRequest(detail);
    }

    handleKeydown(e) {
        console.log('handleKeydown: ', e);
    }

    render() {
        return this.queryField ? this.templates[this.queryField] : defaulthtml;
    }
}
