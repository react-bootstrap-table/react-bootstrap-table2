/* eslint react/require-default-props: 0 */
import React from 'react';
import PropTypes from 'prop-types';

import Const from './const';
import FooterCell from './footer-cell';
import _ from './utils';

const Footer = (props) => {
  const { data, className, columns, selectRow, expandRow } = props;
  const SelectionFooterCellComp = () => <th />;
  const ExpansionFooterCellComp = () => <th />;

  const isRenderFunctionColumnInLeft = (
    position = Const.INDICATOR_POSITION_LEFT
  ) => position === Const.INDICATOR_POSITION_LEFT;

  const childrens = columns.map((column, i) => {
    if (column.footer === undefined || column.footer === null) {
      return false;
    }

    const columnData = _.pluck(data, column.dataField);

    return (
      <FooterCell
        index={ i }
        key={ column.dataField }
        column={ column }
        columnData={ columnData }
      />
    );
  });

  if (selectRow && selectRow.hideSelectColumn !== true) {
    if (isRenderFunctionColumnInLeft(selectRow.selectColumnPosition)) {
      childrens.unshift(<SelectionFooterCellComp key="selection" />);
    } else {
      childrens.push(<SelectionFooterCellComp key="selection" />);
    }
  }

  if (expandRow.showExpandColumn) {
    if (isRenderFunctionColumnInLeft(expandRow.expandColumnPosition)) {
      childrens.unshift(<ExpansionFooterCellComp key="expansion" />);
    } else {
      childrens.push(<ExpansionFooterCellComp key="expansion" />);
    }
  }

  return (
    <tfoot>
      <tr className={ className }>
        { childrens }
      </tr>
    </tfoot>
  );
};

Footer.propTypes = {
  data: PropTypes.array,
  className: PropTypes.string,
  columns: PropTypes.array,
  selectRow: PropTypes.object,
  expandRow: PropTypes.object
};

export default Footer;
