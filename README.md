# ❒ Tofu

Tofu is a web app that compares the same character (in Unicode code point) across different regional typographic conventions.

The same character might display differently in different locales due to the [han unification](https://www.unicode.org/versions/Unicode1.0.0/V2ch02.pdf) process when CJK characters were incorporated into the Unicode standard.

This is enabled by [Source Han Sans / Noto Sans CJK](https://github.com/adobe-fonts/source-han-sans), which is a CJK typeface that has different versions for each region.

## Stack

- Astro
- Tailwind
- TypeScript
- SolidJS

## Running Locally

```bash
npm install
```

<sub>This project uses [PP Mori](https://pangrampangram.com/products/mori), a commercial typeface that is **not included** in this repository. You must supply your own `PREP_URL` environment variable to this command to place the necessary private files before dev/build.</sub>

```bash
PREP_URL=https://example.com npm run prep
```

```bash
npm run dev
```

## License

This project is licensed under the [PolyForm Noncommercial License 1.0.0](LICENSE).
