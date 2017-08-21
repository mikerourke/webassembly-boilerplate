const webassembly = require('webassembly');

describe('Compilation and Runner', function() {
  let instance;

  describe('Setup', function() {
    it('creates a new instance', function(done) {
      webassembly
        .load('src/main.wasm')
        .then((loadedInstance) => {
          instance = loadedInstance;
          expect(instance).to.not.be.undefined;
          done();
        })
        .catch(error => done(error));
    });
  });

  describe('Functionality', function() {
    it('gets the square root', function() {
      expect(instance.exports.getSqrt(25)).to.equal(5);
    });
  });
});
