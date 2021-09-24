import { LightningElement, api } from 'lwc';

export default class TodoItem extends LightningElement {
    @api id;
    @api completed;
    @api title;
    @api todoRef;
    refresh = Date.now();

    /* connectedCallback() {
        this.todoRef.onTransition((s) => {
            // possible to detect
            // 1) change to editable field
            // 2) cancel editing item
        });
    } */

    @api get rowClass() {
        let retval = '';
        if (this.todoRef.state.matches('editing')) {
            retval = retval + 'editing';
        }

        if (this.completed) {
            retval = retval + 'completed';
        }
        // can @track solve this hack?
        return this.refresh && retval;
    }

    makeEditable() {
        this.todoRef.send('EDIT');
        // can @track solve this hack?
        this.refresh = Date.now();
    }

    completedToggle() {
        this.todoRef.send('TOGGLE_COMPLETE');
    }

    deleteItem() {
        this.todoRef.send('DELETE');
    }

    editItem(e) {
        if (e.key === 'Escape') {
            this.todoRef.send('CANCEL');
            // can @track solve this hack?
            this.refresh = Date.now();
        } else if (e.key === 'Enter') {
            this.todoRef.send('COMMIT');
        } else {
            this.todoRef.send({
                type: 'CHANGE',
                value: e.target.value
            });
        }
    }

    itemBlur() {
        this.todoRef.send('BLUR');
    }
}
