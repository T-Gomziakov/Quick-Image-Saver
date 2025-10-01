// Code snippet from https://github.com/richardtallent/vite-plugin-singlefile/issues/83#issuecomment-2433579057
import path from "node:path";
import { fileURLToPath } from "node:url";
import { build } from "vite";
import * as glob from "glob";
import fs from "node:fs";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const entries = glob.sync([
  `${__dirname}/src/**/index.ts`,
  `${__dirname}/src/**/index.tsx`,
]);
const root = path.resolve(__dirname, "./src");

console.log(entries);

// build all the files in /src into a single file each
for (const entry of entries) {
  const componentName = path.basename(path.dirname(entry));
  await build({
    root: root,
    build: {
      outDir: `../dist/${componentName}`, // build to dist directory at root (omitting the src dir)
      assetsDir: componentName,
      rollupOptions: {
        input: path.resolve(__dirname, `./src/${componentName}/`),
        output: {
          entryFileNames: `${componentName}.js`,
          format: "iife",
        },
      },
    },
  });
}

// bundle our HTML pages
const html_entries = glob.sync(`${__dirname}/src/**/index.html`);
for (const html_entry of html_entries) {
  const componentName = path.basename(path.dirname(html_entry));
  await build({
    root: root,
    build: {
      outDir: "../dist",
      rollupOptions: {
        input: {
          main: `./src/${componentName}/index.html`,
        },
      },
      // assetsDir: componentName,
      // rollupOptions: {
      //   input: path.resolve(__dirname, `./src/${componentName}`),
      //   output: {
      //     entryFileNames: `${componentName}.html`,
      //     format: ""
      //   }
      // },
    },
  });
}

fs.copyFile(
  path.resolve(__dirname, "public", "manifest.json"),
  path.resolve(__dirname, "dist", "manifest.json"),
  (error) => {
    if (error) throw error;
  }
);
