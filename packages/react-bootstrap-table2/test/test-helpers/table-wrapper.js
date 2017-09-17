/* eslint react/prop-types: 0 */
import React from 'react';

export const TableRowWrapper = props => (
  <table>
    <tbody>
      <tr>{ props.children }</tr>
    </tbody>
  </table>
);

