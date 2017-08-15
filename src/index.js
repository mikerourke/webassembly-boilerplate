const fs = require('fs');
const path = require('path');

/**
 * Reads the data from the specified file and returns a buffer.
 * @param {string} filePath Path to the file to read.
 */
const getArrayBuffer = (filePath) => new Promise((resolve, reject) => {
  fs.readFile(filePath, (error, data) => {
    if (error) reject(error);
    const intArray = new Uint8Array(data.length);
    for (let i = 0; i < data.length; ++i) {
      intArray[i] = data[i]
    }
    resolve(intArray);
  })
});

/**
 * Removes the `_` from the beginning of the function name (performed when compiling down to a
 *    `.wasm` file).  Returns an updated instance with the function names cleaned up.
 * @param {Object} exports WebAssembly module instance.
 * @returns {Object}
 */
const cleanupFunctionNames = (exports) => {
  const updatedExports = {};
  Object.keys(exports).forEach((functionName) => {
    let updatedFunctionName = functionName;
    // Only strip the `_` from functions that have a single preceding `_`.  If there's more than
    // one, just ignore it.
    if (functionName.charAt(0) === '_' && functionName.charAt(1) !== '_') {
      updatedFunctionName = functionName.substr(1);
    }
    updatedExports[updatedFunctionName] = exports[functionName];
  });
  return updatedExports;
};

const wasmImports = {
  env: {
    memoryBase: 0,
    tableBase: 0,
    memory: new WebAssembly.Memory({ initial: 256 }),
    table: new WebAssembly.Table({ initial: 0, element: 'anyfunc' }),
  }
};

/**
 * Creates a new instance of topfuel.
 */
module.exports = () => {
  const wasmPath = path.resolve(__dirname, 'main.wasm');
  return getArrayBuffer(wasmPath)
    .then(bytes => WebAssembly.compile(bytes))
    .then(module => WebAssembly.instantiate(module, wasmImports))
    .then(instance => cleanupFunctionNames(instance.exports));
};
