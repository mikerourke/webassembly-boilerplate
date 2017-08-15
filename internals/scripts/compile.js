/**
 * Compiles the `c` library file down to a `.wasm` file.
 */
const { exec } = require('child_process');
const fs = require('fs');
const chalk = require('chalk');

const getExecCommand = () => {
  const outputFile = `${process.cwd()}/src/main.wasm`;
  if (fs.existsSync(outputFile)) {
    fs.unlinkSync(outputFile);
  }
  const inputFile = `${process.cwd()}/src/main.c`;
  const compileFlags = [
    '-s WASM=1',
    '-s ASSERTIONS=1',
    '-s SIDE_MODULE=1',
    '-O3',
  ].join(' ');
  return `emcc ${inputFile} -o ${outputFile} ${compileFlags}`;
};

/**
 * Compiles the specified input file (from config) down to a .wasm file.
 */
const compileWasm = () => new Promise((resolve, reject) => {
  const emsdkLocation = process.env.EMSDK || '';
  if (!emsdkLocation) {
    reject(new Error('EMSDK environment variable not set.'))
  }
  if (!fs.existsSync(emsdkLocation)) {
    reject(new Error('EMSDK not found.'));
  }
  const command = getExecCommand();
  exec(command, { shell: '/bin/bash' }, (error, stdout, stderr) => {
    if (error) reject(new Error(error));
    if (stderr) reject(new Error(stderr));
    resolve();
  })
});

module.exports = compileWasm;

if (process.env.NODE_ENV !== 'test') {
  compileWasm()
    .then(() => console.log(chalk.cyan.bold('Compiled!')))
    .catch(error => console.log(chalk.red.bold(`Compile error: ${error}`)));
}
