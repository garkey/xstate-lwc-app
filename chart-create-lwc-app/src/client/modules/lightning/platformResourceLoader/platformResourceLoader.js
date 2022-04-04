/* 

  NOT FOR PRODUCTION!!!!!!!!!!

  This is a mock module for production loadScript functionality.

*/

/* 
NOTE:

this solution will not scale to the next loadScript mock. since it’s only for local dev, we could hack the next solution like this..

if (lib.<identity> === ‘echart’) {

window.echarts = lib;

}

*/
import camsassets from './cams_asset_grid.json';

export function loadScript(path, lib) {
    if (window) {
        if (
            Object.getPrototypeOf(Object.getPrototypeOf(path)).constructor
                .name === 'EchartBase'
        ) {
            window.echarts = lib;
        } else {
            window.XState = lib;
        }
    }
    return Promise.resolve();
}

export function camsElasticSearchData(args) {
    // console.log('camsassets', camsassets);
    console.log('args.searchString', args.searchString);

    return Promise.resolve(JSON.stringify(camsassets));
}
