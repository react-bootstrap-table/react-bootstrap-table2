/* eslint-disable */
/* eslint-disable spaced-comment */
/* eslint-disable react/jsx-indent */
/* eslint-disable indent */
import cs from "classnames";
import React from "react";
import PropTypes from "prop-types";
import { TableContext } from "../contexts/table-context";
import { CSSTransition } from "react-transition-group";

const ExpandRow = ({ children, expanded, onClosed, className, ...rest }) => (
  <tr>
    <td className={cs("reset-expansion-style", className)} {...rest}>
      <TableContext.Consumer>
        {({ cssTransitions }) => {
          const row = (
            <div>
              <div className="row-expansion-style">{children}</div>
            </div>
          );
          if (cssTransitions) {
            return (
              <CSSTransition
                appear
                in={expanded}
                timeout={400}
                classNames="row-expand-slide"
                onExited={onClosed}
              >
                {row}
              </CSSTransition>
            );
          }
          return row;
        }}
      </TableContext.Consumer>
    </td>
  </tr>
);

ExpandRow.propTypes = {
  children: PropTypes.node,
  expanded: PropTypes.bool,
  onClosed: PropTypes.func,
  className: PropTypes.string,
};

ExpandRow.defaultProps = {
  children: null,
  expanded: false,
  onClosed: null,
  className: "",
};

export default ExpandRow;
