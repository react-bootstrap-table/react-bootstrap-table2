export const extendTo = Base =>
  class MockComponent extends Base {
    constructor(props) {
      super(props);

      const { data, selectedRowKeys } = props;

      this.state = {
        data,
        selectedRowKeys,
        currEditCell: {
          ridx: null,
          cidx: null
        }
      };
    }

    render() { return null; }
  };
