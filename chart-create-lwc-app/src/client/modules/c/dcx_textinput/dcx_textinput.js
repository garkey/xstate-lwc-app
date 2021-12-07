/*
 * Copyright (c) 2019, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */

import { LightningElement, api, track } from 'lwc';
import { classSet } from 'c/utils';

export default class Input extends LightningElement {
    // @api accept;
    // @api autocomplete;
    // @api checked;
    // @api dateAriaControls;
    // @api dateAriaDescribedBy;
    // @api dateAriaLabel;
    // @api dateAriaLabelledBy;
    // @api dateStyle;

    @api get disabled() {
        return this._disabled;
    }

    set disabled(value) {
        this._disabled = value;
    }

    // @api fieldLevelHelp;
    // @api files;
    // @api formatFractionDigits;
    // @api formatter;
    // @api isLoading;
    @api label;
    // @api max;
    // @api maxLength;
    // @api messageToggleActive;
    // @api messageToggleInactive;
    // @api messageWhenBadInput;
    // @api messageWhenPatternMismatch;
    // @api messageWhenRangeOverflow;
    // @api messageWhenRangeUnderflow;
    // @api messageWhenStepMismatch;
    // @api messageWhenTypeMismatch;
    // @api min;
    // @api multiple;
    // @api name;
    // @api pattern;
    @api messageWhenTooLong;
    @api messageWhenTooShort;
    @api messageWhenValueMissing;
    @api placeholder;
    @api type = 'text';
    @api changeFun;
    @api blurFun;
    @api inputFun;
    // @api keyupFunction;

    @api labelstyle;

    get labelStyling() {
        return this.labelstyle ?
            this.labelstyle + ' margin-left:.1rem;' :
            'margin-left:.1rem;';
    }

    @api get minLength() {
        return this._minLength;
    }

    changeInput(e) {
        this.changeFun && this.changeFun(e);
        this.value = e.target.value;
        this.dispatchChange();
    }

    dispatchChange() {
        this.dispatchEvent(
            new CustomEvent('change', {
                bubbles: true,
                cancelable: true,
                detail: {
                    value: this.value,
                },
                target: {
                    value: this.value,
                },
                name: this.name,
            }),
        );
    }

    blurInput(e) {
        this.blurFun && this.blurFun(e);
    }

    inputFunction(e) {
        this.inputFun && this.inputFun(e);
    }

    set minLength(value) {
        this._minLength = Number.parseInt(value);
    }

    @api get maxLength() {
        return this._maxLength;
    }

    set maxLength(value) {
        this._maxLength = Number.parseInt(value);
    }

    @api get min() {
        return this._min;
    }

    set min(value) {
        this._min = Number.parseInt(value);
    }

    @api get max() {
        return this._max;
    }

    set max(value) {
        this._max = Number.parseInt(value);
    }

    @api get readOnly() {
        return this._readOnly;
    }

    set readOnly(value) {
        this._readOnly = value;
    }

    @api get required() {
        return this._required;
    }

    set required(value) {
        this._required = value;
        if (!value) {
            this._warnrequired = false;
            this._message = '';
        }
    }

    @api get warnrequired() {
        return this._warnrequired;
    }

    set warnrequired(value) {
        this._warnrequired = value;
    }

    get computedInputClass() {
        return classSet('dcx_std_height_2').add({
            shaded: this.shaded,
            warnrequired: this._warnrequired,
        });
    }

    // @api step;
    // @api timeAriaControls;
    // @api timeAriaDescribedBy;
    // @api timeAriaLabelledBy;
    // @api timeStyle;
    // @api timezone;
    // @api type;
    // @api validity;

    @api get shaded() {
        return this._shaded;
    }

    set shaded(value) {
        this._shaded = value;
    }

    @api get value() {
        return this._value || '';
    }

    set value(value) {
        this._value = value;
    }

    @api get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    @api get pattern() {
        return this._pattern;
    }

    set pattern(value) {
        this._pattern = value;
    }

    @api get messageWhenPatternMismatch() {
        return this._mismatchPatternMsg;
    }

    set messageWhenPatternMismatch(value) {
        this._mismatchPatternMsg = value;
    }

    set message(value) {
        this._message = value;
    }

    @api get message() {
        return this._message;
    }

    @api variant;

    @api
    focus() {
        this.template.querySelector('input').focus();
    }

    @api
    blur() {
        this.template.querySelector('input').blur();
    }

    @api
    validate(_input) {
        const input = _input || this.template.querySelector('input');

        // console.log('input.reportValidity()', input.reportValidity())

        if (this.required && input.value === '') {
            this.message = 'Complete this field.';
            this.warnrequired = true;
            return false;
        } else if (
            this.pattern &&
            new RegExp(this.pattern).test(input.value) === false
        ) {
            this.message = this.messageWhenPatternMismatch;
            return false;
        } else if (this.minLength && this.minLength > input.value.length) {
            this.message = `Mininum length is ${this.minLength}`;
            return false;
        } else if (this.maxLength && this.maxLength < input.value.length) {
            this.message = `Maximum length is ${this.maxLength}`;
            return false;
        } else if (this.min && this.min > input.value.length) {
            this.message = `Mininum value is ${this.min}`;
            return false;
        } else if (this.max && this.max > input.value.length) {
            this.message = `Maximum value is ${this.max}`;
            return false;
        } else {
            this.message = '';
            this.warnrequired = false;
            return true;
        }
    }

    renderedCallback() {
        this.template
            .querySelector('input')
            .addEventListener('blur', (event) => {
                const input = event.currentTarget;

                this.validate(input);
                this.value = input.value;
                this.dispatchChange();
            });
    }

    @track _disabled = false;
    @track _readOnly = false;
    @track _required = false;
    @track _warnrequired = false;
    @track _shaded = false;
    @track _value = '';
    @track _name = '';
    @track _pattern = '';
    @track _mismatchPatternMsg = '';
    @track _message = '';
    @track _minLength;
    @track _maxLength;
    @track _min;
    @track _max;
}