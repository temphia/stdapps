import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import typescript from "@rollup/plugin-typescript";
import css from "rollup-plugin-css-only";

export default {
    input: "src/entries/tldraw/main.tsx",
    output: [
        {
            file: "public/build/tldraw.js",
            name: "app",
            sourcemap: "inline",
            format: "iife",
        },
    ],

    plugins: [
        peerDepsExternal(),
        resolve({
            browser: true,
            dedupe: ["react", "react-dom"],
        }),
        replace({
            "process.env.NODE_ENV": JSON.stringify("production"),
        }),
        commonjs(),
        typescript({
            tsconfig: "tsconfig.json",
            sourceMap: true,
            inlineSources: true,
            jsx: "react",
        }),
        css({ output: "tldraw.css" }),
    ],
};
