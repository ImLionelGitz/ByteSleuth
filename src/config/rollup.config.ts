import { RollupOptions } from 'rollup'

import typescript from '@rollup/plugin-typescript'
import commonjs from '@rollup/plugin-commonjs'
import terser from '@rollup/plugin-terser'
import scss from 'rollup-plugin-scss'
import resolve from '@rollup/plugin-node-resolve'
import copy from 'rollup-plugin-copy'
import del from 'rollup-plugin-delete'


const contentCFG: RollupOptions = {
    input: './src/content.ts',

    output: {
        file: './dist/content.js',
        format: 'iife'
    },

    plugins: [
        del({
            targets: ["dist/*"]
        }),
        copy({
            targets: [
                { src: './src/public/manifest.json', dest: './dist' },
                { src: './src/public/ui/*', dest: './dist' },
                { src: ['./src/public/assets/*.png', './src/public/assets/*.svg'], dest: './dist/assets' },
                { src: ['./src/public/assets/*.ttf', './src/public/assets/*.woff', './src/public/assets/*.woff2', './src/public/assets/*.eot'], dest: './dist/assets/fonts' },
            ]
        }),
        typescript(),
        commonjs(),
        resolve({
            browser: true
        }),
        terser(),

        scss({
            output: './dist/index.css',
            // @ts-ignore
            outputStyle: 'compressed'
        })
    ]
},

workerCFG: RollupOptions = {
    input: './src/worker.ts',

    output: {
        file: './dist/worker.js',
        format: 'iife'
    },

    plugins: [
        typescript(),
        commonjs(),
        resolve({
            browser: true
        }),
        terser(),
    ]
},

basicCFG: RollupOptions = {
    input: './src/index.ts',

    output: {
        file: './dist/index.js',
        format: 'iife'
    },

    plugins: [
        typescript(),
        commonjs(),
        resolve({
            browser: true
        }),
        terser(),
    ]
}

export default [contentCFG, workerCFG, basicCFG]