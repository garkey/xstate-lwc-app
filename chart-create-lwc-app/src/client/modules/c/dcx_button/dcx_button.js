/*
 * Copyright (c) 2019, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */

import { api, track } from 'lwc';
import { classSet } from 'c/utils';
import { normalizeString as normalize } from 'c/utilsPrivate';
import cPrimitiveButton from 'c/primitiveButton';
import template from './dcx_button.html';

const buttonstates = {
    go: 'green',
    pause: 'red',
    cancel: 'gray',
    transparent: 'transparent',
    default: '',
};

export default class cButton extends cPrimitiveButton {
    static delegatesFocus = true;

    @api name;

    @api value;

    @api label;

    @api variant = 'neutral';

    @api iconName;

    @api iconPosition = 'left';

    @api type = 'button';

    @api dcxstate = 'default';

    @api roundy = false;

    @api large = false;

    @api fontSize;

    @api color;

    @api height;

    @api background;

    @api border;

    @api clickRestate;

    @track title = null;
    @track _order = null;

    render() {
        return template;
    }

    clickCallback(event) {
        if (this.clickRestate) {
            const reqnextstate = this.clickRestate(event).dcxstate;
            const postnextstate =
                Object.keys(buttonstates).indexOf(reqnextstate) > -1 &&
                reqnextstate;
            if (postnextstate) {
                this.dcxstate = postnextstate;
            }
        }
    }

    get dcxButtonStyle() {
        let style = '';

        if (this.fontSize) {
            style = style + ` font-size:${this.fontSize};`;
        }

        if (this.color) {
            style = style + ` color:${this.color};`;
        }

        if (this.height) {
            style = style + ` height:${this.height};`;
        }

        if (this.background) {
            style = style + ` background:${this.background};`;
        }

        if (this.border) {
            style = style + ` border:${this.border};`;
        }

        return style;
    }

    get dcxButtonClass() {
        let btnstate = buttonstates[this.dcxstate] || '';
        if (this.roundy) {
            btnstate = btnstate + ' roundy';
        }
        if (!this.height && this.large) {
            btnstate = btnstate + ' dcx_std_height_2';
        }
        return btnstate;
    }

    get computedTitle() {
        return this.title;
    }

    get normalizedVariant() {
        return normalize(this.variant, {
            fallbackValue: 'neutral',
            validValues: [
                'base',
                'neutral',
                'brand',
                'brand-outline',
                'destructive',
                'destructive-text',
                'inverse',
                'success',
            ],
        });
    }

    get normalizedType() {
        return normalize(this.type, {
            fallbackValue: 'button',
            validValues: ['button', 'reset', 'submit'],
        });
    }

    get normalizedIconPosition() {
        return normalize(this.iconPosition, {
            fallbackValue: 'left',
            validValues: ['left', 'right'],
        });
    }

    get showIconLeft() {
        return this.iconName && this.normalizedIconPosition === 'left';
    }

    get showIconRight() {
        return this.iconName && this.normalizedIconPosition === 'right';
    }

    get computedIconClass() {
        return classSet('slds-button__icon')
            .add({
                'slds-button__icon_left':
                    this.normalizedIconPosition === 'left',
                'slds-button__icon_right':
                    this.normalizedIconPosition === 'right',
            })
            .toString();
    }

    handleButtonFocus() {
        this.dispatchEvent(new CustomEvent('focus'));
    }

    handleButtonBlur() {
        this.dispatchEvent(new CustomEvent('blur'));
    }

    @api
    focus() {
        if (this._connected) {
            this.template.querySelector('button').focus();
        }
    }

    @api
    click() {
        if (this._connected) {
            this.template.querySelector('button').click();
        }
    }

    setOrder(order) {
        this._order = order;
    }

    connectedCallback() {
        this._connected = true;
        const privatebuttonregister = new CustomEvent('privatebuttonregister', {
            bubbles: true,
            detail: {
                callbacks: {
                    setOrder: this.setOrder.bind(this),
                    setDeRegistrationCallback: (deRegistrationCallback) => {
                        this._deRegistrationCallback = deRegistrationCallback;
                    },
                },
            },
        });

        this.dispatchEvent(privatebuttonregister);
    }

    renderedCallback() {
        super.renderedCallback();

        this.template.host.style.pointerEvents = this.disabled ? 'none' : '';
    }

    disconnectedCallback() {
        this._connected = false;
        if (this._deRegistrationCallback) {
            this._deRegistrationCallback();
        }
    }
}

cButton.interopMap = {
    exposeNativeEvent: {
        click: true,
        focus: true,
        blur: true,
    },
};
