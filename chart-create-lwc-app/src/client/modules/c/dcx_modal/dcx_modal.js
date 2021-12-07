import { LightningElement, api, track } from 'lwc';

export default class Dcx_modal extends LightningElement {
    @api closeFn;
    @api buttonlabel = 'Continue';
    @api headtext = 'Message';
    @api addstyle = '';
    get dcxModalClass() {
        let start = 'slds-modal__header ';
        if (this.addstyle !== '') {
            start = `${start} ${this.addstyle}`;
        }
        return start
    }
}