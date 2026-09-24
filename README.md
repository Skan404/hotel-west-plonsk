# West Hotel Płońsk

Strona hotelwestplonsk.pl zbudowana w Astro. Zawiera stronę główną, galerię, cennik, kontakt i informacje o prywatności. Zdjęcia, film i fonty są serwowane lokalnie.

## Uruchomienie i kontrola

Node.js 24.13.1 (wersja zapisana w `.node-version`).

```sh
npm ci
npm run dev
```

Podgląd: http://127.0.0.1:4325/.

Przed publikacją:

```sh
npm run lint
npm run build
npm run check:static
```

## Publikacja

Repozytorium: https://github.com/Skan404/hotel-west-plonsk

Projekt Cloudflare Pages: `hotel-west-plonsk`. Gałąź produkcyjna: `main`. Komenda budowania: `npm run build`. Katalog wynikowy: `dist`. Konfiguracja Pages znajduje się w `wrangler.jsonc`.

Wysłanie zmian do `main` uruchamia skonfigurowaną integrację GitHub–Cloudflare Pages. Aktualizacja domeny następuje po udanym wdrożeniu. Status jest widoczny przy commicie jako „Cloudflare Pages”. Przy cofnięciu można przywrócić poprzednie wdrożenie w panelu Cloudflare Pages.

`.env.production` zawiera wyłącznie publiczne ustawienie `PUBLIC_INDEXABLE=true`. Produkcyjny build udostępnia indeksowanie i sitemapę. Podgląd developerski pozostaje zablokowany dla robotów. Zmienna środowiskowa `PUBLIC_INDEXABLE=false` pozwala zbudować wersję bez indeksowania.

Nie dodawać do repozytorium tokenów Cloudflare, danych logowania, plików `.env.local`, logów ani oryginalnych materiałów roboczych. Sekrety nie są wymagane do budowania strony.

## Edycja

- `src/data/site.ts` — dane kontaktowe i lista zdjęć.
- `src/pages/` — treść podstron.
- `src/layouts/Layout.astro` — wspólny układ i animacje.
- `src/styles/global.css` — wygląd i responsywność.
- `public/images/` i `public/video/` — materiały publikowane na stronie.
- `public/reveal-init.js` — uruchamiany przed wyrenderowaniem treści, zapobiega miganiu elementów przed animacją; osobny plik jest zgodny z CSP.
- `public/_headers` — nagłówki bezpieczeństwa i pamięci podręcznej.
