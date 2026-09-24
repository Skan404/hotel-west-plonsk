import { defineConfig } from 'astro/config';
export default defineConfig({site:'https://hotelwestplonsk.pl',output:'static',trailingSlash:'always',build:{inlineStylesheets:'never'},vite:{build:{assetsInlineLimit:0}},devToolbar:{enabled:false}});
