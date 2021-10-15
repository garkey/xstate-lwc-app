import { LightningElement, api, track } from 'lwc';

export default class Dcx_kscarecard extends LightningElement {
    @api ks_care    
    @api show_kscare_card;

    handleMouseOut(){
        const custEvent = new CustomEvent(
            'mouseoutkscare', {
            detail: true
        });

        setTimeout(() => {
            this.dispatchEvent(custEvent);
        }, 1000);
    }
}