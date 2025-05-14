import { build, context } from 'esbuild'
import { clean } from 'esbuild-plugin-clean'
import npmDts from 'npm-dts'

/**
 * @param {import('esbuild').BuildOptions} config
 */
async function buildConfig(config) {
  // eslint-disable-next-line no-undef
  if (process.env.ESBUILD_WATCH == 'true') {
    const ctx = await context(config)

    ctx.watch()
    console.log('watching... %s', config.outfile)
  } else {
    await build(config)
  }
}

/** @type {import('esbuild').BuildOptions[]} */
const configurations = [
  {
    bundle: true,
    entryPoints: ['./src/index.ts'],
    format: 'esm',
    metafile: true,
    outfile: './lib/index.esm.js',
    platform: 'browser',
    target: 'es2020',
    plugins: [clean()],
  },
  {
    bundle: true,
    entryPoints: ['./src/index.ts'],
    format: 'iife',
    metafile: true,
    outfile: './lib/index.js',
    platform: 'browser',
    target: 'es2020',
    plugins: [clean()],
  },
  {
    bundle: true,
    entryPoints: ['./src/index.ts'],
    format: 'cjs',
    metafile: true,
    outfile: './lib/index.cjs.js',
    platform: 'neutral',
    target: 'es2020',
    plugins: [clean()],
  },
]

await Promise.all(configurations.map(buildConfig))

await new npmDts.Generator({
  entry: 'src/index.ts',
  force: true,
  output: 'lib/index.d.ts',
}).generate()
