# WebAssembly Boilerplate

Simple boilerplate to compile and run `.wasm` files.

## Development

You'll need to have the EMSDK installed somewhere on your computer.  I would recommend downloading
the [Portable Emscripten SDK](https://kripken.github.io/emscripten-site/docs/getting_started/downloads.html).

I created a folder named `emsdk` in a `~/Tooling` directory.  Follow the installation instructions
on the download page to get up and running.  Once that's installed you need to either export an
environment variable named `EMSDK` with the path to your `emsdk` directory, or prepend 
`EMSDK={path to emsdk directory}` to the `yarn run` or `npm run` script.

### Note to Windows Developers

The C code is compiled to `wasm` using bash.  I'm looking into getting it working for powershell
or cmd, but in the interim, you'll need git bash or another bash emulator installed.
