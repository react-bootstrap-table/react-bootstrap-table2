/* eslint react/require-default-props: 0 */
import React from 'react';
import PropTypes from 'prop-types';

import RowTemplate from './row/row-template';
import FooterCell from './footer-cell';
import _ from './utils';

const Footer = (props) => {
  const { data, className, columns, selectRow, expandRow } = props;

  function renderContent() {
    return columns.map((column, i) => {
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
  }

  return (
    <tfoot>
      <RowTemplate
        renderContent={ renderContent }
        selectRow={ selectRow }
        expandRow={ expandRow }
        className={ className }
        cellEl="th"
      />
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
