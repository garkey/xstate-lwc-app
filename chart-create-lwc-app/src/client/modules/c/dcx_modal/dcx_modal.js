import { LightningElement, api } from 'lwc';

export default class Dcx_modal extends LightningElement {
    @api closeFn;
    @api buttonlabel = 'Continue';
    @api headtext = 'Message';

    closeModal = (event) => {
        if (event.code === 'Escape') {
            if (this.closeFn) {
                this.closeFn();
            } else {
                const closeEvent = new CustomEvent('closemodal', {
                    detail: true,
                    bubbles: true,
                    composed: true
                });

                // Dispatches the event.
                this.dispatchEvent(closeEvent);
            }
            this.cleanListener();
        }
    };

    cleanListener() {
        document.body.removeEventListener('keydown', this.closeModal);
    }

    disconnecteCallback() {
        this.cleanListener();
    }

    renderedCallback() {
        document.body.addEventListener('keydown', this.closeModal);
    }


    @api addstyle = '';
    get dcxModalClass() {
        let start = 'slds-modal__header ';
        if (this.addstyle !== '') {
            start = `${start} ${this.addstyle}`;
        }
        return start
    }
}