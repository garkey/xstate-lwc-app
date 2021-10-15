import xstate from "c/libXState";

export const defaultVals = {
  current_page_no: 0,
  total_pages: 10,
  num_per_page: 5,
};

const { createMachine, assign } = xstate;

export const compMachine = createMachine({
  id: "LMHomeMachine",
  initial: "loading",
  context: defaultVals,
  states: {
    loading: {
      on: {
        complete: "ready",
      },
    },
    ready: {},
  },
  on: {
    'PAGE.LEFT': {
      actions: assign({
        current_page_no: (context) => {
          return context.current_page_no > 0 ? context.current_page_no - 1 : context.total_pages / context.num_per_page
        }
      })
    },
    'PAGE.RIGHT': {
      actions: assign({
        current_page_no: (context) => {
          return context.current_page_no < context.total_pages / context.num_per_page ? context.current_page_no + 1 : 0
        }
      })
    },

  }
});
