import { LightningElement } from 'lwc';
import { loadScript } from 'lightning/platformResourceLoader';
import xstate from '@salesforce/resourceUrl/xstate';

export default class XStateComp extends LightningElement {

  async connectedCallback() {
    if (window.XState === undefined) {
        return loadScript(this, xstate).catch((error) => console.log(error));
    }
    return Promise.resolve();
  }
}

