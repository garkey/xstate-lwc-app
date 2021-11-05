import { LightningElement } from 'lwc';

export default class DemoSomeSelfIntelComp extends LightningElement {
    smileyshown = false;

    showsmiley() {
        this.smileyshown = true;
    }
}
