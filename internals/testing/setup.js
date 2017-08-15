const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.should();
chai.use(chaiAsPromised);

global.chai = chai;
global.AssertionError = chai.AssertionError;
global.expect = chai.expect;
global.assert = chai.assert;
