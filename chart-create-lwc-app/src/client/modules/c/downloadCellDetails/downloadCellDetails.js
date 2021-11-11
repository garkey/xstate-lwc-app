import { LightningElement, api } from "lwc";

export default class DownloadCRellTemplate extends LightningElement {
  @api value;

  get valueEntries() {
    return this.value;
  }
}
