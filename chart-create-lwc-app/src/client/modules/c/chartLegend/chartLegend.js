import { LightningElement, api } from 'lwc';

export default class ChartLegend extends LightningElement {
    @api legend;
    @api lvalue = 2;
}
