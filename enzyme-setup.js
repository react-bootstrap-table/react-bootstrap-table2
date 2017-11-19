import Adapter from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';

const configureEnzyme = () => {
  configure({ adapter: new Adapter() });
};

configureEnzyme();
