import Store from '../../src/store';

export const extendTo = Base =>
  class MockComponent extends Base {
    constructor(props) {
      super(props);

      const { data } = props;

      this.store = new Store(props.keyField);
      this.store.data = data;
      this.state = { data };
    }

    render() { return null; }
  };
