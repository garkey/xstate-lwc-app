/*
 * Copyright (c) 2019, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */

import { LightningElement, api, track } from 'lwc';
import { TreeData } from './treeData';
import { keyCodes, deepCopy } from 'c/utilsPrivate';

export default class cTree extends LightningElement {
    @api header;

    @track _currentFocusedItem = null;
    @track _childNodes;
    @track _key;
    @track _focusedChild = null;
    @track _items = [];

    @track isTreeModalOpen = false;
    @track isNewModalOpen = false;
    @track isEditModalOpen = false;
    @track isDeleteModalOpen = false;
    @track btnLab = 'Save';
    @track treeHeadMod = '';

    @track cancel = 'Cancel';
    @track portal_Save = 'Save';
    @track LocationName = 'Location Name';
    closeLast;
    resetHover;

    label = {
        cancel: this.cancel,
        portal_Save: this.portal_Save,
        LocationName: this.LocationName,
    };

    _defaultFocused = { key: '1', parent: '0' };
    _selected = null;
    @track _selectedItem = null;
    hasDetachedListeners = true;

    constructor() {
        super();
        this.callbackMap = {};
        this.treedata = null;
        this.template.addEventListener(
            'privateitemkeydown',
            this.handleKeydown.bind(this),
        );

        this.template.addEventListener(
            'privateitemclick',
            this.handleClick.bind(this),
        );

        this.template.addEventListener(
            'privateregisteritem',
            this.handleRegistration.bind(this),
        );

        this.template.addEventListener(
            'toolboxeventclick',
            this.handleClick.bind(this),
        );
    }

    @api get items() {
        return this._items || [];
    }

    set items(value) {
        this.normalizeData(value);
    }

    @api get selectedItem() {
        return this._selected;
    }

    set selectedItem(value) {
        this._selected = value;
        this.syncSelected();
    }

    get children() {
        return this._childNodes;
    }

    get rootElement() {
        return this._key;
    }

    get focusedChild() {
        return this._focusedChild;
    }

    syncSelected() {
        if (this.treedata && this._childNodes.length > 0) {
            this._selectedItem = this.treedata.syncSelectedToData(
                this.selectedItem,
            );

            this.syncCurrentFocused();

            if (this._selectedItem === null) {
                this.setFocusToItem(this._currentFocusedItem, false, false);
            }
        }
    }

    normalizeData(items) {
        if (items) {
            this.treedata = new TreeData();

            this._items = items.map((item) => {
                return this.treedata.cloneItems(item);
            });

            const treeRoot = this.treedata.parse(this.items, this.selectedItem);
            this._childNodes = treeRoot ? treeRoot.children : [];
            this._selectedItem = treeRoot.selectedItem;
            this._key = this._childNodes.length > 0 ? treeRoot.key : null;
            if (this._key) {
                this.syncCurrentFocused();
            }
        }
    }

    syncCurrentFocused() {
        if (this._selectedItem) {
            this._currentFocusedItem = this._selectedItem;
        } else {
            this._currentFocusedItem = this._defaultFocused;
        }

        this.updateCurrentFocusedChild();
    }

    updateCurrentFocusedChild() {
        if (this._key === this._currentFocusedItem.parent) {
            this._focusedChild = this.treedata.getChildNum(
                this._currentFocusedItem.key,
            );
        } else {
            this._focusedChild = this._currentFocusedItem.key;
            this.treedata.updateCurrentFocusedChild(
                this._currentFocusedItem.key,
            );
        }
    }

    handleTreeFocusIn(event) {
        const relatedTarget = event.relatedTarget;
        if (
            this._currentFocusedItem &&
            relatedTarget &&
            relatedTarget.tagName !== 'C-TREE-ITEM'
        ) {
            this.setFocusToItem(this._currentFocusedItem, false);
        }
    }

    renderedCallback() {
        if (this._selectedItem) {
            this.setFocusToItem(this._currentFocusedItem, false);
        }
        if (this.hasDetachedListeners) {
            const container = this.template.querySelector(
                '.slds-tree_container',
            );

            container.addEventListener(
                'focus',
                this.handleTreeFocusIn.bind(this),
            );

            this.hasDetachedListeners = false;
        }
    }

    disconnectedCallback() {
        this.hasDetachedListeners = true;
    }

    handleClick(event) {
        event.preventDefault();
        event.stopPropagation();
        const key = event.detail.key;
        const target = event.detail.target;
        const item = this.treedata.getItem(key);

        if (item) {
            if (target === 'chevron') {
                if (item.treeNode.nodeRef.expanded) {
                    this.collapseBranch(item.treeNode);
                } else {
                    this.expandBranch(item.treeNode);
                }
                this.setFocusToItem(item);
            }
            if (target === 'click') {
                this.setFocusToItem(item);
            } else {
                this._selectedItem = item;
                this.dispatchSelectEvent(item.treeNode);
                this.setFocusToLastItem();
            }
        }
    }

    expandBranch(node) {
        if (!node.isLeaf && !node.isDisabled) {
            node.nodeRef.expanded = true;
            if (
                this._selectedItem &&
                this._selectedItem.key.startsWith(node.key)
            ) {
                // eslint-disable-next-line @lwc/lwc/no-async-operation
                setTimeout(() => {
                    this.setFocusToItem(this._selectedItem);
                }, 0);
            }

            this.dispatchEvent(
                new CustomEvent('change', {
                    detail: {
                        items: deepCopy(this._items),
                    },
                }),
            );
        }
    }

    collapseBranch(node) {
        if (!node.isLeaf && !node.isDisabled) {
            node.nodeRef.expanded = false;
            this.treedata.updateVisibleTreeItemsOnCollapse(node.key);

            this.dispatchEvent(
                new CustomEvent('change', {
                    detail: { items: deepCopy(this._items) },
                }),
            );
        }
    }

    dispatchSelectEvent(node) {
        if (!node.isDisabled) {
            const customEvent = new CustomEvent('select', {
                bubbles: true,
                composed: true,
                cancelable: true,
                detail: { name: node.name },
            });

            this.dispatchEvent(customEvent);
        }
    }

    handleKeydown(event) {
        event.preventDefault();
        event.stopPropagation();
        const item = this.treedata.getItem(event.detail.key);
        switch (event.detail.keyCode) {
            case keyCodes.up:
                this.setFocusToPrevItem();
                if (this.closeLast) this.closeLast.call();
                break;
            case keyCodes.down:
                this.setFocusToNextItem();
                if (this.closeLast) this.closeLast.call();
                break;
            case keyCodes.home:
                this.setFocusToFirstItem();
                if (this.closeLast) this.closeLast.call();
                break;
            case keyCodes.end:
                this.setFocusToLastItem();
                if (this.closeLast) this.closeLast.call();
                break;
            case keyCodes.right:
                this.expandBranch(item.treeNode);
                break;
            case keyCodes.left:
                if (item.treeNode.nodeRef.expanded && !item.treeNode.isLeaf) {
                    this.collapseBranch(item.treeNode);
                } else {
                    this.handleParentCollapse(event.detail.key);
                    if (this.closeLast) this.closeLast.call();
                }
                break;

            default:
                break;
        }
        // if (this.closeLast) this.closeLast.call();
    }

    setFocusToItem(item, shouldFocus = true, shouldSelect = true) {
        const currentFocused = this.treedata.getItemAtIndex(
            this.treedata.currentFocusedItemIndex,
        );

        if (
            currentFocused &&
            currentFocused.key !== item.key &&
            this.callbackMap[currentFocused.parent]
        ) {
            this.callbackMap[currentFocused.key].unfocusCallback();
        }
        if (item) {
            this._currentFocusedItem =
                this.treedata.updateCurrentFocusedItemIndex(item.index);

            if (this.callbackMap[item.parent]) {
                this.callbackMap[item.parent].focusCallback(
                    item.key,
                    shouldFocus,
                    shouldSelect,
                );
            }
        }
    }

    setFocusToNextItem() {
        const nextNode = this.treedata.findNextNodeToFocus();
        if (nextNode && nextNode.index !== -1) {
            this.setFocusToItem(nextNode);
        }
    }

    setFocusToPrevItem() {
        const prevNode = this.treedata.findPrevNodeToFocus();
        if (prevNode && prevNode.index !== -1) {
            this.setFocusToItem(prevNode);
        }
    }

    setFocusToFirstItem() {
        const node = this.treedata.findFirstNodeToFocus();
        if (node && node.index !== -1) {
            this.setFocusToItem(node);
        }
    }

    setFocusToLastItem() {
        const lastNode = this.treedata.findLastNodeToFocus();
        if (lastNode && lastNode.index !== -1) {
            this.setFocusToItem(lastNode);
        }
    }

    handleFocusFirst(event) {
        event.stopPropagation();
        this.setFocusToFirstItem();
    }

    handleFocusLast(event) {
        event.stopPropagation();
        this.setFocusToLastItem();
    }

    handleFocusNext(event) {
        event.stopPropagation();
        this.setFocusToNextItem();
    }

    handleFocusPrev(event) {
        event.stopPropagation();
        this.setFocusToPrevItem();
    }

    handleChildBranchCollapse(event) {
        event.stopPropagation();
        this.treedata.updateVisibleTreeItemsOnCollapse(event.detail.key);
    }

    handleParentCollapse(key) {
        const item = this.treedata.getItem(key);
        if (item && item.level > 1) {
            const parent = this.treedata.getItem(item.parent);
            this.collapseBranch(parent.treeNode);
            this.setFocusToItem(parent);
        }
    }

    handleRegistration(event) {
        const itemKey = event.detail.key;
        this.callbackMap[itemKey] = {
            focusCallback: event.detail.focusCallback,
            unfocusCallback: event.detail.unfocusCallback,
        };

        this.treedata.addVisible(itemKey);
        event.stopPropagation();
    }

    get hasChildren() {
        return this._items && this._items.length > 0;
    }

    newClickMe() {
        this.resetModal();
        this.isTreeModalOpen = true;
        this.isNewModalOpen = true;
        this.treeHeadMod = 'Add Location / North America';
    }

    editClickMe() {
        this.resetModal();
        this.isTreeModalOpen = true;
        this.isEditModalOpen = true;
        this.treeHeadMod = 'Edit Location / North America';
    }

    deleteClickMe() {
        this.resetModal();
        this.isTreeModalOpen = true;
        this.isDeleteModalOpen = true;
        this.treeHeadMod = 'Delete Location / North America';
    }

    resetModal() {
        this.isTreeModalOpen = false;
        this.isNewModalOpen = false;
        this.isEditModalOpen = false;
        this.isDeleteModalOpen = false;
        console.log('reset', this.isTreeModalOpen);
    }

    submitDetails = () => {
        this.resetModal();
    };

    handleClose = () => {
        this.resetModal();
    };

    @api treeevent = {};
    newinputChange = (e) => {
        this.treeevent.newinput = e.target.value;
        console.log('newinput', this.treeevent.newinput);
    };

    editinputChange = (e) => {
        this.treeevent.editinput = e.target.value;
        console.log('editinput', this.treeevent.editinput);
    };

    deleteinputChange = (e) => {
        this.treeevent.deleteinput = e.target.value;
        console.log('deleteinput', this.treeevent.deleteinput);
    };

    saveInfoClick() {
        console.log('saveInfoClick ', this.treeevent);
    }

    toolBoxevent = (event) => {
        if (event) {
            try {
                event.currentTarget.closest('c-tree-item').toggleOpen();
            } catch (e) {}
        }
    };

    manageSelections(event) {
        if (this.closeLast) {
            this.closeLast.call();
        }

        if (this.resetHover) {
            this.resetHover.call();
        }

        if (event.detail.istoolBox) {
            this.closeLast = event.detail.closeDropdown;
            this.resetHover = event.detail.enforceHoverSlot;
        } else {
            this.closeLast = null;
            this.resetHover = null;
        }
    }

    disconnectedCallback() {
        window.removeEventListener('click', function () {});
        window.removeEventListener('keyup', function () {});
        window.removeEventListener('click', this.closeOnPageClick);
    }

    connectedCallback() {
        window.addEventListener('click', this.closeOnPageClick);
    }

    closeOnPageClick(event) {
        if (event.path[0]) {
            if (this.closeLast) {
                this.closeLast.call();
            }
            if (this.resetHover) {
                this.resetHover.call();
            }
            this.closeLast = null;
            this.resetHover = null;
        }
    }

    handleTooltip(event) {
        console.log('handleTooltip', event);
        const itemKey = event.detail.key;
        const item = this.treedata.getItem(event.detail.key);
        console.log('item', item);
        // this.callbackMap[itemKey] = {
        //     focusCallback: event.detail.focusCallback,
        //     unfocusCallback: event.detail.unfocusCallback
        // };

        // event.detail.focusCallback(
        //     itemKey,
        //     true,
        //     true
        // );
    }
}
