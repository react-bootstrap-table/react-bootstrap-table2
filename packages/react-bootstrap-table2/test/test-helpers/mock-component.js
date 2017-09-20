export const extendTo = Base =>
  class MockComponent extends Base {
    constructor(props) {
      super(props);
      this.state = {
        data: this.props.data,
        currEditCell: {
          ridx: null,
          cidx: null
        }
      };
    }

    render() { return null; }
  };
