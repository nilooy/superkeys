# Superkeys

_THIS EXTENSION IS IN BETA_ Superkeys allow users to add short keys for websites and make search query in those sites.

## Usage

### Folders

- `views` - frontend for the extension (popup, options and new-tab).
- `src` - background scripts and content scripts.
  - `manifest.ts` - manifest for the extension.
- `extension` - extension package root, also holds assets.
- `scripts` - development helper scripts.

### Development

```bash
pnpm dev
```

Then **load extension in browser with the `extension/` folder**,

### Build

To build the extension, run

```bash
pnpm build
```

And then pack files under `extension`.

sub>Support this project by ⭐️ starring and sharing it. [Follow me](https://github.com/privatenumber) to see what other cool projects I'm working on! ❤️</sub>