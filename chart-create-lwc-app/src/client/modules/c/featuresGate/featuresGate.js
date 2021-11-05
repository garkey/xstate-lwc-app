import { LightningElement, api } from 'lwc';

export default class FeaturesGate extends LightningElement {
    @api cams = false;
    featuresuser = true;

    get camsUser() {
        return this.cams && this.featuresuser;
    }

    // stduser(e) {
    //   console.log('this.featuresuser', this.featuresuser)
    //     this.featuresuser = false;
    // }
    // camsuser(e) {
    //   console.log('this.featuresuser', this.featuresuser)

    //     this.featuresuser = true;
    // }
}
