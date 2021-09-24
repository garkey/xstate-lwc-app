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
export function loadScript(path, lib) {
    if (window) {
        window.echarts = lib;
    }
    return Promise.resolve();
}
