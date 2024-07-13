import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: './dist/bundle.cjs',
      format: 'cjs',
    },
    {
      file: './dist/bundle.js',
      format: 'esm',
    },
    // {
    //   file: './dist/bundle.min.js',
    //   format: 'iife',
    //   name: 'version',
    //   plugins: [terser()]
    // }
  ],
  plugins: [typescript()]
};
