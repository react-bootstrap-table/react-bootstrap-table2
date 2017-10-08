import Store from '../../src/store/base';

export const extendTo = Base =>
  class MockComponent extends Base {
    constructor(props) {
      super(props);

      const { data } = props;

      this.store = new Store(props);
      this.state = { data };
    }

    render() { return null; }
  };
