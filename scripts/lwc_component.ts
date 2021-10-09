import { parse, print } from "https://x.nest.land/swc@0.1.4/mod.ts";
import {
  ParseOptions,
  Program,
  ImportDeclaration,
  ModuleItem,
  StringLiteral,
} from "https://x.nest.land/swc@0.1.4/types/options.ts";
import yargs from "https://deno.land/x/yargs/deno.ts";
import { Arguments } from "https://deno.land/x/yargs/deno-types.ts";
import { dirname } from "https://deno.land/std@0.110.0/path/mod.ts";
import { compress } from "https://deno.land/x/zip@v1.2.0/mod.ts";
import { resolve, relative } from "https://deno.land/std@0.110.0/path/mod.ts";

let moduledirname: string;

yargs(Deno.args)
  .command(
    "migrate <component>",
    "move components including dependencies",
    (yargs: any) => {
      return yargs.positional("component", {
        describe: "component to migrate",
      });
    },
    async (argv: Arguments) => migrate(argv)
  )
  .strictCommands()
  .demandCommand(1)
  .parse();

async function migrate(argv: Arguments) {
  console.log("argv", argv);
  const { component: onecomponent } = argv;
  // const [onecomponent] = component;

  console.log("onecomponent", onecomponent);

  const compdir = dirname(onecomponent);
  console.log("compdir", compdir);

  const modDir = dirname(compdir);
  const rootdir = dirname(modDir);
  moduledirname = modDir.split("/").slice(-1)[0];

  const text = await Deno.readTextFile(onecomponent);
  // console.log("text", text);

  const rootcomp = parseCode(text);
  console.log("rootcomp", rootcomp);

  const imports = rootcomp.body
    .filter(filter_ImportDeclarations)
    .filter(filter_localModules);

  console.log("Deno.cwd()", Deno.cwd());

  // alternatives
  // https://deno.land/x/littlezip@0.4.0
  // https://deno.land/x/jszip@0.10.0

  console.log(await compress([compdir], "compressed.zip", { overwrite: true }));
  console.log("imports", imports);
  console.log("compdir", compdir);
  console.log("rootdir", rootdir);
  console.log("relative", relative(rootdir, compdir));
  console.log(resolve(compdir, rootdir));

  // console.log(parseCode(text));
  // console.log(print(parseCode(text)));
}

const swc_config: ParseOptions = {
  target: "es2019",
  syntax: "typescript",
  comments: false,
  decorators: true,
};

const filter_ImportDeclarations = (value: ImportDeclaration | any) =>
  value.type === "ImportDeclaration";

const filter_localModules = (item: ImportDeclaration | any) => {
  const { value } = item.source;
  const [dir] = value.split("/");
  return dir === moduledirname;
};

// const code = `const x: string = "Hello, Deno SWC!"`;

// const ast = parse(code, {
//   target: "es2019",
//   syntax: "ecmascript",
//   comments: false
// });

const parseCode = (code: string): Program => parse(code, swc_config);

/* 

{
  "jsc": {
    "parser": {
      "syntax": "ecmascript",
      "jsx": false,
      "dynamicImport": false,
      "privateMethod": false,
      "functionBind": false,
      "exportDefaultFrom": false,
      "exportNamespaceFrom": false,
      "decorators": false,
      "decoratorsBeforeExport": false,
      "topLevelAwait": false,
      "importMeta": false
    },
    "transform": null,
    "target": "es5",
    "loose": false,
    "externalHelpers": false,
    // Requires v1.2.50 or upper and requires target to be es2016 or upper.
    "keepClassNames": false
  }
}

*/

// console.log('ast', ast);

// {
//   type: "Module",
//   span: { start: 0, end: 36, ctxt: 0 },
//   body: [
//     {
//       type: "VariableDeclaration",
//       span: [Object],
//       kind: "const",
//       declare: false,
//       declarations: [Array]
//     }
//   ],
//   interpreter: null
// }

// const { code: output } = print(ast, {
//   minify: true,
//   module: {
//     type: "commonjs"
//   }
// });

// console.log("output", output);

// const x = "Hello, Deno SWC!"
