import { LightningElement } from 'lwc';
import { compMachine } from './LMHomeMachine.js';
import xstate from 'c/libXState';

export default class LoanManagementHome extends LightningElement {
    state;

    connectedCallback() {
        const { interpret } = xstate;

        this.service = interpret(compMachine, { debug: true })
            .onTransition((s) => {
                this.state = s;
            })
            .start();

        document.addEventListener('keydown', (e) => {          
            if (['ArrowRight', 'ArrowLeft'].indexOf(e.key) > -1) {
                e.preventDefault();
                this.pageChange(e.key.substr(5).toUpperCase())
            }
        });
    }

    pageChange(dir) {
      this.service.send({
          type: `PAGE.${dir}`,
          // shiftKey: e.shiftKey,
      });
    }
    pageLeft() {
      this.pageChange('LEFT')
    }
    pageRight() {
      this.pageChange('RIGHT')
    }
}
