import TextFilter from './components/text';
import FilterWrapper from './wrapper';
import * as Comparison from './comparison';

export default (options = {}) => ({
  FilterWrapper,
  options
});

export const Comparator = Comparison;

export const textFilter = (props = {}) => ({
  Filter: TextFilter,
  props
});
