import { build, context, type BuildOptions } from 'esbuild'
import { dtsPlugin } from 'esbuild-plugin-d.ts'
import { clean } from 'esbuild-plugin-clean'

async function buildConfig(config: BuildOptions) {
  if (process.env.ESBUILD_WATCH == 'true') {
    const ctx = await context(config)

    ctx.watch()
    console.log('watching... %s', config.outfile)
  } else {
    await build(config)
  }
}

const configurations: BuildOptions[] = [
  {
    bundle: true,
    target: 'es2018',
    platform: 'browser',
    format: 'esm',
    entryPoints: ['./src/index.ts'],
    outfile: './lib/index.esm.js',
    metafile: true,
    plugins: [
      clean(),
      // @ts-expect-error resolve this later
      dtsPlugin({
        outDir: './lib',
      }),
    ],
  },
  {
    bundle: true,
    target: 'es2018',
    platform: 'browser',
    format: 'iife',
    entryPoints: ['./src/index.ts'],
    outfile: './lib/index.js',
    metafile: true,
    plugins: [clean()],
  },
  {
    bundle: true,
    target: 'es2018',
    platform: 'neutral',
    format: 'cjs',
    entryPoints: ['./src/index.ts'],
    outfile: './lib/index.cjs.js',
    metafile: true,
    plugins: [clean()],
  },
]

configurations.forEach(buildConfig)
