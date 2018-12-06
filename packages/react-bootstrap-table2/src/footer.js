/* eslint react/require-default-props: 0 */
import React from 'react';
import PropTypes from 'prop-types';

import FooterCell from './footer-cell';
import _ from './utils';

const Footer = (props) => {
  const { data, className, columns } = props;

  return (
    <tfoot>
      <tr className={ className }>
        {columns.map((column, i) => {
          if (column.footer === undefined || column.footer === null || column.hidden) {
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
        })}
      </tr>
    </tfoot>
  );
};

Footer.propTypes = {
  data: PropTypes.array,
  className: PropTypes.string,
  columns: PropTypes.array
};

export default Footer;
