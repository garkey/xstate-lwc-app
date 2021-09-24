import { LightningElement, api } from 'lwc';

export default class ByData extends LightningElement {
    @api byCallback;
    slotchildren;

    invokeCallback = (e) => {
        this.byCallback(e);
    };

    handleSlotChange(evt) {
        this.slotchildren = evt.target.assignedElements();
        if (this.slotchildren.length > 1) {
            console.error(
                `found ${this.slotchildren.length} slotted elements`,
                this.slotchildren.join(', ')
            );
            throw new Error('Expected only one element.');
        }

        const [first] = this.slotchildren;

        if (first.tagName !== 'INPUT' && first.tagName !== 'SELECT') {
            throw new Error(
                'so far, we expect only one of specific input elements'
            );
        }

        if (first.tagName === 'INPUT') {
            first.addEventListener('keyup', this.invokeCallback);
        } else if (first.tagName === 'SELECT') {
            first.addEventListener('change', this.invokeCallback);
        }
    }

    disconnectedCallback() {
        console.log('disconnectedCallback');

        const [first] = this.slotchildren;
        if (first.tagName === 'INPUT') {
            first.removeEventListener('keyup', this.invokeCallback);
        } else if (first.tagName === 'SELECT') {
            first.removeEventListener('change', this.invokeCallback);
        }
    }
}
