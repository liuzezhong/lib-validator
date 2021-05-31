import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import nodeResolve from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import builtins from 'rollup-plugin-node-builtins';
import sourceMaps from 'rollup-plugin-sourcemaps';
import globals from 'rollup-plugin-node-globals';
import commonjs from 'rollup-plugin-commonjs'
import cleanup from 'rollup-plugin-cleanup';
import camelCase from 'lodash.camelcase'
import json from 'rollup-plugin-json'

const pkg = require('./package.json')

const libraryName = pkg.name

export default {
  input: `src/lib/${libraryName}.ts`,
  output: [
    { 
      file: pkg.main,
      name: camelCase(libraryName),
      format: 'umd',
      sourcemap: true,
      globals: {
      }
    },
    {
      file: pkg.module,
      format: 'es',
      sourcemap: true
    }
  ],
  // Indicate here external modules you don't wanna include in your bundle (i.e.: 'lodash')
  external: [
  ],
  watch: {
    include: 'src/lib/**',
  },
  plugins: [
    peerDepsExternal({}),
    cleanup(),
    // Allow node_modules resolution, so you can use 'external' to control
    // which external modules to include in the bundle
    // https://github.com/rollup/rollup-plugin-node-resolve#usage
    nodeResolve({
      jsnext: true,
      modulesOnly: true,
      // browser: true,
      main: true,
      preferBuiltins: false
    }),
    globals(),
    builtins(),
    // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
    commonjs({
      // include: 'node_modules/**'
    }),
    // Allow json resolution
    json(),
    // Compile TypeScript files
    typescript({ useTsconfigDeclarationDir: true }),
    // Resolve source maps to the original source
    sourceMaps(),
  ]
}
