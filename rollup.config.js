import dotenv from 'dotenv';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import replace from '@rollup/plugin-replace';

const envConfig = dotenv.config().parsed;

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'index.js',
        format: 'cjs',
      },
      {
        file: 'index.mjs',
        format: 'esm',
      },
      {
        file: 'index.min.js',
        name: 'perfninja',
        format: 'iife',
        plugins: [terser()],
      },
    ],
    plugins: [
      typescript(),
      replace({
        preventAssignment: true,
        values: {
          'process.env.LOG_ENDPOINT_URL': JSON.stringify(
            envConfig.LOG_ENDPOINT_URL,
          ),
        },
      }),
    ],
  },
  {
    input: 'loader.js',
    output: [
      {
        file: 'loader.min.js',
        format: 'iife',
        plugins: [terser()],
      },
    ],
    plugins: [
      replace({
        preventAssignment: true,
        values: {
          'process.env.LOADER_SCRIPT_URL': JSON.stringify(
            envConfig.LOADER_SCRIPT_URL,
          ),
        },
      }),
    ],
  },
];
