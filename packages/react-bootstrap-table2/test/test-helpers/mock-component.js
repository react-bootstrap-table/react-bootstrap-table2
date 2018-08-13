
export const extendTo = Base =>
  class MockComponent extends Base {
    render() { return null; }
  };
