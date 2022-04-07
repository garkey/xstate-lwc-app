import { LightningElement, api } from 'lwc';

export default class DcxTable extends LightningElement {
    @api tabledata;
    @api columns;
    @api hideCheckboxColumn = false;
    @api isLoading;
    @api hideColumnQuery = false;
    @api queries = {};

    doSorting(e) {
        this.dispatchAjaxRequest(e);
    }

    dispatchAjaxRequest({ type, detail }) {
        console.log('this', this);
        console.log('this.state', this.state);

        this.sortDirection = detail.sortDirection === 'asc' ? 'desc' : 'asc';
        this.dispatchEvent(
            new CustomEvent('ajaxrequest', {
                detail: {
                    [type]: [{ ...detail, sortDirection: this.sortDirection }],
                },
                bubbles: true,
                composed: true,
            }),
        );
    }

    renderedCallback() {
        console.log('this.columns', JSON.parse(JSON.stringify(this.columns)));
    }
}
