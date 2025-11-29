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
bun install
```

> [!IMPORTANT]
> Some files such as the commercial typeface files are not included in this repository, and it will not build or run as-is.

```bash
bun run dev
```

## License

This project is licensed under the [PolyForm Noncommercial License 1.0.0](LICENSE).
