import { LightningElement, api } from 'lwc';

export default class ColumnQueryField extends LightningElement {
    @api queryField;

    connectedCallback() {
        console.log('this.queryField', this.queryField);
    }
}
