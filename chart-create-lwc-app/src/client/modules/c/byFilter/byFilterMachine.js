import * as xstate from 'c/xstate';
const { createMachine } = xstate;

export const byFilterMachine = createMachine({
    id: 'byFilterMachine',
    initial: 'loading',
    context: {
        previousFilter: undefined,
        currentFilter: undefined,
        previousTarget: undefined,
        currentTarget: undefined
    },
    states: {
        loading: {
            on: {
                complete: 'ready'
            }
            // entry: (context, event) => {
            //   console.log('context', context);
            //   console.log('event', event);
            //   console.log('we should create a selectMachine for each select elements availablefilters?');
            //   console.log('we should create a selectMachine for each select elements availabletargets?');

            // }
        },
        ready: {},
    }
});
