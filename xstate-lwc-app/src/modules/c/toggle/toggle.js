import XStateBase from 'c/xstatebase';

const state = {
    id: 'toggle',
    initial: 'inactive',
    states: {
        inactive: { on: { click: 'active' } },
        active: { on: { click: 'inactive' } }
    }
};

export default class Toggle extends XStateBase {
    get isActive() {
        return this.state.value === 'active';
    }

    get buttonText() {
        return `Click to toggle ${
            this.state.value === 'active' ? 'Off' : 'On'
        }`;
    }

    get buttonClasses() {
        return this.state.value === 'active' ? 'on' : 'off';
    }

    handleClick(e) {
        this.service.send(e);
    }

    connectedCallback() {
        super.connectedCallback(state);
    }
}
