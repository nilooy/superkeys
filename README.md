<div align="center">
    <img src="extension/assets/img/logo128.png" alt="Meteor Devtool Evolved Gif" />
    <h2>SuperKeys</h2>
    <h4 color="yellow">Superkeys allow users to add short keys for websites and make search query in those sites.</h4>
    <p>_THIS EXTENSION IS IN ALPHA_</p>
</div>

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
