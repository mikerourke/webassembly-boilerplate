const compileWasm = require('../internals/scripts/compile');
const loadModule = require('../src/index');

describe('Compilation and Runner', function() {
  let instance;

  before(function (done) {
    compileWasm()
      .then(() => done())
      .catch(error => done(error));
  });

  describe('Setup', function() {
    it('creates a new instance', function(done) {
      loadModule()
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
      expect(instance.getSqrt(25)).to.equal(5);
    });
  });
});
