import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from "rollup-plugin-terser";

export default {
  input: 'src/bundling/xstate.js',
  output: {
    file: 'src/client/modules/c/xstateComp/xstateComp.js',
    format: 'es'
  },
  plugins: [
    nodeResolve(),
    terser()
  ]
};