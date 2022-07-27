import resolve from '@rollup/plugin-node-resolve'; // 辅助识别node_module下的包
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser'; // 压缩
import ts from 'rollup-plugin-typescript2';

const extensions = [
  '.js',
  '.ts'
];

export default {
  input: 'src/index.ts',
  output: [
    // {
    //   file: 'src/index.ts',
    //   format: 'umd',
    //   name: 'mijiu',
    // }
  ],
  plugins: [
    ts({
      tsconfig: getPath('./tsconfig.json'),
      extensions,
    }),
    resolve(),
    commonjs(),
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**', // 只编译我们的源代码
    }),
    terser(),
  ],
  external: [], // 指出哪些模块不会打包，视为外部模块
  global: {
    // 'jquery': '$', 全局变量$是jquery
  },
}