import { defineConfig } from 'tsup';

export default defineConfig({
  entryPoints: ['src/node/cli.ts'],
  bundle: true,
  splitting: true,
  minify: process.env.NODE_ENV === 'production',
  outDir: 'dist',
  format: ['cjs', 'esm'],
  dts: true,
  //对esm 和 cjs 的 polyfill的导入
  shims: true
});
