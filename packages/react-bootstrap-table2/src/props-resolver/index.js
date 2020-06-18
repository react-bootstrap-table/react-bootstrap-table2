import _ from '../utils';
import ColumnResolver from './column-resolver';

export default ExtendBase =>
  class TableResolver extends ColumnResolver(ExtendBase) {
    validateProps() {
      const { keyField } = this.props;
      if (!keyField) {
        throw new Error('Please specify a field as key via keyField');
      }
      if (this.visibleColumnSize(false) <= 0) {
        throw new Error('No visible columns detected');
      }
    }

    isEmpty() {
      return this.props.data.length === 0;
    }

    visibleRows() {
      const { data, hiddenRows, keyField, columns } = this.props;
      const isPivotTable = this.props.columns.some(column => Object.prototype.hasOwnProperty.call(column, 'reduce'));

      const filtered = (
        !hiddenRows || hiddenRows.length === 0
          ? data
          : data.filter((row) => {
            const key = _.get(row, keyField);
            return !_.contains(hiddenRows, key);
          }));

      if (isPivotTable) {
        const groupByCols = columns.filter(
          c => (this.props.columnToggle ? this.props.columnToggle.toggles[c.dataField] : true)
        ).filter(
          c => !Object.prototype.hasOwnProperty.call(c, 'reduce')
        ).map(c => c.dataField);

        const reduceCols = columns.filter(
          c => Object.prototype.hasOwnProperty.call(c, 'reduce')
        );

        const aggregated = filtered.reduce((grouped, row) => {
          const equals = grouped.map(g => groupByCols.every(k => g[0][k] === row[k]));
          if (equals.some(b => b)) {
            return grouped.map((g, i) => (equals[i] ? g.concat([row]) : g));
          }
          return grouped.concat([[row]]);
        }, []).map(
          group => Object.fromEntries(groupByCols.map(
            name => [name, group[0][name]]
          ).concat(
            reduceCols.map(
              r => [r.dataField, group.map(g => g[r.dataField]).reduce(r.reduce)]
            )
          ))
        );

        return aggregated;
      }
      return filtered;
    }
  };
