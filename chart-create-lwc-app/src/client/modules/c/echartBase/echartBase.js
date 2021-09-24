import { LightningElement } from 'lwc';
import { themesUtils, once } from 'c/utils';
import echart from '@salesforce/resourceUrl/echart';
import { loadScript } from 'lightning/platformResourceLoader';

export default class EchartBase extends LightningElement {
    echart;
    option;
    themecolors;

    handleBySlotChange(evt) {
        if (
            !evt.target
                .assignedElements()
                .every((ea) => ea.tagName === 'C-BY-DATA')
        ) {
            throw new Error('unexpected tagname type');
        }
    }

    loadCallback() {
        this.echart.setOption(this.option, true);
    }

    onceLoaded = once(() => {
        this.loadCallback();
    });

    async handleEchart() {
        const chartparent = this.template.querySelector('.chart');
        window.echarts.registerTheme(...themesUtils.default_theme);
        window.echarts.registerTheme(...themesUtils.second_theme);

        this.echart = await window.echarts.init(
            chartparent,
            themesUtils.selected_theme
        );

        return new Promise((resolve) => {
            this.onceLoaded();
            resolve();
        });
    }

    async renderedCallback() {
        if (window.echarts === undefined) {
            await loadScript(this, echart).catch((error) => console.log(error));
        }
        if (this.echarts === undefined) {
            await this.handleEchart();
        }

        if (this.setOption) {
            this.setOption();
        }
        this.themecolors = themesUtils.color_swatch.map(e => e[0]);
    }
}
