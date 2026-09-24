import eslint from '@eslint/js';
import astro from 'eslint-plugin-astro';
import tseslint from 'typescript-eslint';
export default [{ignores:['dist/**','node_modules/**','.astro/**','.tools/**','.wrangler/**','.worker-check/**','qa/**']},eslint.configs.recommended,...tseslint.configs.recommended,...astro.configs['flat/recommended'],{files:['public/reveal-init.js'],languageOptions:{globals:{document:'readonly',window:'readonly'}}},{files:['worker/**/*.mjs','tests/**/*.mjs','scripts/**/*.mjs'],languageOptions:{globals:Object.fromEntries(['process','console','Buffer','URL','URLSearchParams','Response','Request','TextEncoder','TextDecoder','crypto','fetch','AbortSignal','ReadableStream'].map(k=>[k,'readonly']))}}];
