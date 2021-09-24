import { LightningElement, api } from 'lwc';

export default class dateSegment extends LightningElement {
  @api segment;

  get dateEnd() {
    return new Date(this.segment.timeend).toDateString();
  }

  get assetCount() {
    return this.segment.num_assets;
  }
}