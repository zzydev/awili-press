import { defineConfig } from 'tsup';

export default defineConfig({
  entryPoints: [
    './src/node/cli.ts',
    './src/node/index.ts',
    './src/node/dev.ts'
  ],
  clean: true, //清空之前的构建产物
  bundle: true,
  splitting: true,
  minify: process.env.NODE_ENV === 'production',
  outDir: 'dist',
  format: ['cjs', 'esm'],
  dts: true,
  //对esm 和 cjs 的 polyfill的导入
  shims: true
});
