class SFPlatformModuleReplacement {
    /**
     * Apply the plugin
     * @param {Compiler} compiler the compiler instance
     * @returns {void}
     */
    apply(compiler) {
        const resourceRegExp1 = /@salesforce\/label/;
        const resourceRegExp2 = /@salesforce\/i18n/;

        compiler.hooks.normalModuleFactory.tap(
            'SFPlatformModuleReplacement',
            (nmf) => {
                nmf.hooks.beforeResolve.tap(
                    'SFPlatformModuleReplacement',
                    (result) => {
                        if (
                            (resourceRegExp1.test(result.request) ||
                                resourceRegExp2.test(result.request)) &&
                            !/node_modules/.test(result.context)
                        ) {
                            result.request = '/salesforce/polyfill.js';
                        }
                    }
                );

                // nmf.hooks.afterResolve.tap("SFPlatformModuleReplacement", result => {
                //   if (/salesforce\/label/.test(result.createData.resource)) {

                //     console.log('>>>>');
                //     console.log('result.createData', result.createData.resource);
                //     console.log('result.request', result.request);
                //   }
                // })
            }
        );
    }
}

module.exports = {
    plugins: [new SFPlatformModuleReplacement()]
};
