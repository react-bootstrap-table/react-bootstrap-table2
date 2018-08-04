import Operation from './src/op';

export default Base =>
  class StatelessOperation extends Operation.csvOperation(Base) {};
