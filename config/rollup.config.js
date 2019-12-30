// Rollup plugins
import { uglify } from 'rollup-plugin-uglify';
import url from 'rollup-plugin-url';
import json from 'rollup-plugin-json';
import typescript from 'rollup-plugin-typescript2';
import path from 'path';
import rimraf from 'rimraf';

// Get current package data from lerna
const { LERNA_PACKAGE_NAME, LERNA_ROOT_PATH } = process.env;

const PACKAGE_ROOT_PATH = process.cwd();
const INPUT_FILE = path.join(PACKAGE_ROOT_PATH, "index.ts");
const OUTPUT_DIR = path.join(PACKAGE_ROOT_PATH, "dist");

// clear output directory
rimraf.sync(OUTPUT_DIR);

const rollupConfig = {
  input: INPUT_FILE,
  output: [{
    file: path.join(OUTPUT_DIR, `index.js`),
    format: 'cjs',
    sourceMap: true
  }],
  plugins: [
    typescript({
      clean: true,
      useTsconfigDeclarationDir: true,
      tsconfigOverride: {
        compilerOptions: {
          rootDirs: [PACKAGE_ROOT_PATH],
          baseUrl: PACKAGE_ROOT_PATH,
          paths: {
            "*": ["../../@types/*"],
          },
          declarationDir: OUTPUT_DIR
        },
        exclude: [
          "./**/__tests__/*.*",
          "./**/__test__/*.*",
          "./**/tests/*.*",
          "./**/test/*.*",
          "./**/*.stories.tsx",
        ]
      }
    }),
    url({
      limit: 10 * 1024, // inline files < 10k, copy files > 10k
      include: ["**/*.svg"], // defaults to .svg, .png, .jpg and .gif files
      emitFiles: true // defaults to true
    }),
    uglify(),
    json()
  ],
}

export default rollupConfig;
