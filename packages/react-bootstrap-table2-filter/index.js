import TextFilter from './src/components/text';
import SelectFilter from './src/components/select';
import NumberFilter from './src/components/number';
import DateFilter from './src/components/date';
import wrapperFactory from './src/wrapper';
import * as Comparison from './src/comparison';
import { FILTER_TYPE } from './src/const';

export default (options = {}) => ({
  wrapperFactory,
  options
});

export const FILTER_TYPES = FILTER_TYPE;

export const Comparator = Comparison;

export const textFilter = (props = {}) => ({
  Filter: TextFilter,
  props
});

export const selectFilter = (props = {}) => ({
  Filter: SelectFilter,
  props
});

export const numberFilter = (props = {}) => ({
  Filter: NumberFilter,
  props
});

export const dateFilter = (props = {}) => ({
  Filter: DateFilter,
  props
});

export const customFilter = (props = {}) => ({
  props
});
