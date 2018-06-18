import SearchBar from './SearchBar';
import createContext from './context';


const searchFactory = ({ searchText, onSearch, ...options }) => ({
  createContext: createContext(options),
  searchText
});

export default { SearchBar, searchFactory };
