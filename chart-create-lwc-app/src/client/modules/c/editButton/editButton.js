import { LightningElement, api } from 'lwc';
import DCX_Cart_ConfigureButton from '@salesforce/label/c.DCX_Cart_ConfigureButton';

export default class EditButton extends LightningElement {
    @api rowid;

    label = {
        DCX_Cart_ConfigureButton
    };

    fireEditRowElement(e) {
        const event = new CustomEvent('editrow', {
            composed: true,
            bubbles: true,
            cancelable: true,
            detail: {
                rowid: this.rowid
            }
        });
        this.dispatchEvent(event);
    }
}
