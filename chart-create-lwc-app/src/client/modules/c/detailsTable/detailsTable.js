import { LightningElement, api } from 'lwc';

export default class DetailsTable extends LightningElement {
    @api tabledata;
    @api columns;
    hidechecks = true;
}
