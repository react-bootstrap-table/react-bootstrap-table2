import Operation from './src/op';

export default Base =>
  class StatelessOperation extends Operation.csvOperation(Base) {
    registerExposedAPI = (...exposedFuncs) => {
      exposedFuncs.forEach((func) => {
        this[func.name] = func;
      });
    }
  };
