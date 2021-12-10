import { parse, print } from 'https://x.nest.land/swc@0.1.4/mod.ts';
import {
    ParseOptions,
    Program,
    ImportDeclaration,
} from 'https://x.nest.land/swc@0.1.4/types/options.ts';
import yargs from 'https://deno.land/x/yargs/deno.ts';
import { Arguments } from 'https://deno.land/x/yargs/deno-types.ts';
import { dirname, basename } from 'https://deno.land/std@0.110.0/path/mod.ts';
import { compress } from 'https://deno.land/x/zip@v1.2.0/mod.ts';
import { tar } from 'https://deno.land/x/compress@v0.4.1/mod.ts';
import {
    copySync,
    ensureDir,
    moveSync,
    exists,
} from 'https://deno.land/std@0.98.0/fs/mod.ts';
import { parse as xmlparse } from 'https://deno.land/x/xml/mod.ts';

let moduledirname: string;

yargs(Deno.args)
    .command(
        'migrate <component>',
        'move components including dependencies',
        (yargs: any) => {
            return yargs.positional('component', {
                describe: 'component to migrate',
            });
        },
        async (argv: Arguments) => migrate(argv),
    )
    .example(
        'deno run --unstable --allow-read --allow-run --allow-write scripts/lwc_component.ts migrate ./chart-create-lwc-app/src/client/modules/c/barChart',
    )
    .example('Bundle (to migrate) LWC component and dependencies.')
    .command(
        'tar <path>',
        'compress generated temp dir path',
        (yargs: any) => {
            return yargs.positional('path', {
                describe: 'path to compress',
            });
        },
        async (argv: Arguments) => compressTar(argv),
    )
    .strictCommands()
    .demandCommand(1)
    .parse();

async function migrate(argv: Arguments) {
    const { component: rootcomp } = argv;
    const modDir = dirname(rootcomp);
    const rootdir = dirname(modDir);
    moduledirname = modDir.split('/').slice(-1)[0];

    const imports = await recurseNeededImports([rootcomp], { rootdir });

    const tempdir = await cloneToTempDir(imports);
    moveSync(tempdir, './dcx_component', { overwrite: true });
    console.log('file written to ./dcx_component');
    console.log(imports);
}

function compressTar(argv: Arguments) {
    const { path } = argv;
    compressComponents(path);
}

async function recurseNeededImports(
    components: string[],
    { rootdir }: { rootdir: string },
): Promise<any> {
    let resources: string[] = [];
    let coll: string[] = [];
    const retval = await Promise.all(
        components.map(async (p: string) => {
            const [compname] = p.split('/').reverse();
            const comptext = await Deno.readTextFile(`${p}/${compname}.js`);
            if (await exists(`${p}/${compname}.html`)) {
                const htmltext = await Deno.readTextFile(
                    `${p}/${compname}.html`,
                );
                /* 
                
                <template>
                    <c-features-gate >
                      <slot name="std"></slot>
                    </c-features-gate>
                    <c-features-gate cams >
                      <slot name="cams"></slot>
                    </c-features-gate>

                    <slot name="selfintel" ></slot>

                  </template>
                */

                const xml = xmlparse(
                    `<root>${htmltext}</root>`.replace(/[{,}]/g, '"'),
                );
                coll = recurseHtmlDependencies(xml).map((e) => {
                    const f = e
                        .replace(/^c-/, '')
                        .replace(/-(.)/g, (v) =>
                            v.replace('-', '').toUpperCase(),
                        );

                    return `./src/client/modules/c/${f}`;
                });
            }
            const imports = deriveNeededImports(comptext);
            resources = deriveNeededResources(comptext, rootdir);

            const deps = imports
                .map((e: any) => e.source.value)
                .map((e: string) => `${rootdir}/${e}`);
            if (imports.length) {
                return await recurseNeededImports([...deps], { rootdir });
            } else {
                return p;
            }
        }),
    );
    return Array.from(
        new Set(
            components.concat(retval.flat()).concat(coll),
        ),
    );
}

function recurseHtmlDependencies(xmlobj: object, coll: string[] = []) {
    const entries = Object.entries(xmlobj);
    entries.forEach((e) => {
        if (e[0].match(/^c-/)) {
            coll.push(e[0]);
        }
        if (typeof e[1] === 'object' && e[1] !== null) {
            recurseHtmlDependencies(e[1], coll);
        }
    });
    return coll;
}

function deriveNeededResources(text: string, rootdir: string) {
    return parseCode(text)
        .body.filter(filter_ImportDeclarations)
        .filter((b: any) => b.source.value.includes('@salesforce/resourceUrl'))
        .map((e: any) => {
            const [resourcename] = e.source.value.split('/').reverse();
            return `${rootdir}/resources/${resourcename}`;
        });
}

function deriveNeededImports(text: string) {
    return parseCode(text)
        .body.filter(filter_ImportDeclarations)
        .filter(filter_localModules);
}

async function cloneToTempDir(component: string[]) {
    const tempDir = await Deno.makeTempDir({
        prefix: 'dcx_migrate_lwc_',
    });

    for (const comp of component) {
        const [dirname] = comp.split('/').reverse();
        copySync(comp, `${tempDir}/${dirname}`, { overwrite: true });
    }
    return tempDir;
}

async function compressComponents(
    path: string,
    filename: string = 'compressed',
) {
    console.log('..........compressComponents');

    // console.log('path', path);
    // await tar.compress(path, `./${filename}.tar`);

    // await compress([path], `./${filename}.zip`, { overwrite: true });
}

const swc_config: ParseOptions = {
    target: 'es2019',
    syntax: 'typescript',
    comments: false,
    decorators: true,
};

const filter_ImportDeclarations = (value: ImportDeclaration | any) => {
    return value.type === 'ImportDeclaration';
};

const filter_localModules = (item: ImportDeclaration | any) => {
    const { value } = item.source;
    const [dir] = value.split('/');
    return dir === moduledirname;
};

const parseCode = (code: string): Program => parse(code, swc_config);
