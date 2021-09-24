import { LightningElement, track } from 'lwc';
import * as xstate from './xstate';

export * as xstate from './xstate';

export default class XStateBase extends LightningElement {
    state = {};
    service;

    async connectedCallback(initialstate) {
        const { createMachine, interpret } = xstate;
        const machine = createMachine(initialstate);
        const service = interpret(machine).onTransition((s) => {
            this.state = s;
        });
        this.service = service;
        service.start();
    }
}
